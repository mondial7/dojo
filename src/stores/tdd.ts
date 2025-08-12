import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { PseudocodeTestFramework } from '@/core/test-framework'
import type { TestSuite, TestStatus } from '@/core/test-framework'

export const useTDDStore = defineStore('tdd', () => {
  const testFramework = new PseudocodeTestFramework()
  
  // State
  const implementation = ref('')
  const testCode = ref('')
  const currentSuite = ref<TestSuite | null>(null)
  const currentStatus = ref<TestStatus>('idle')
  const history = ref<Array<{ status: TestStatus; timestamp: Date; suite?: TestSuite }>>([])
  
  // Computed
  const canRunTests = computed(() => {
    return implementation.value.trim().length > 0 && testCode.value.trim().length > 0
  })
  
  const statusColor = computed(() => {
    switch (currentStatus.value) {
      case 'red': return '#ef4444'
      case 'green': return '#22c55e'
      case 'refactor': return '#f59e0b'
      default: return '#6b7280'
    }
  })
  
  const statusMessage = computed(() => {
    switch (currentStatus.value) {
      case 'red': return 'Tests failing - implement the feature!'
      case 'green': return 'Tests passing - time to refactor!'
      case 'refactor': return 'Ready to refactor - improve the code!'
      case 'idle': return 'Write tests first, then implement'
      default: return 'Write tests first, then implement'
    }
  })
  
  // Actions
  function runTests() {
    if (!canRunTests.value) return
    
    try {
      const suite = testFramework.runTests(implementation.value, testCode.value, 'Current Exercise')
      currentSuite.value = suite
      currentStatus.value = testFramework.determineStatus(suite)
      
      // Add to history
      history.value.push({
        status: currentStatus.value,
        timestamp: new Date(),
        suite: JSON.parse(JSON.stringify(suite))
      })
      
      return suite
    } catch (error) {
      console.error('Error running tests:', error)
      currentStatus.value = 'red'
      return null
    }
  }
  
  function setImplementation(code: string) {
    implementation.value = code
  }
  
  function setTestCode(code: string) {
    testCode.value = code
  }
  
  function reset() {
    implementation.value = ''
    testCode.value = ''
    currentSuite.value = null
    currentStatus.value = 'idle'
    history.value = []
  }
  
  function moveToRefactor() {
    if (currentStatus.value === 'green') {
      currentStatus.value = 'refactor'
      history.value.push({
        status: 'refactor',
        timestamp: new Date()
      })
    }
  }
  
  function completeRefactor() {
    if (currentStatus.value === 'refactor') {
      runTests() // Run tests again after refactoring
    }
  }
  
  return {
    // State
    implementation,
    testCode,
    currentSuite,
    currentStatus,
    history,
    
    // Computed
    canRunTests,
    statusColor,
    statusMessage,
    
    // Actions
    runTests,
    setImplementation,
    setTestCode,
    reset,
    moveToRefactor,
    completeRefactor
  }
})