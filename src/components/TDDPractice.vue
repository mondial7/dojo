<template>
  <div class="tdd-practice">
    <header class="practice-header">
      <h1>TDD Dojo</h1>
      <div class="status-indicator" :style="{ backgroundColor: tddStore.statusColor }">
        <span class="status-dot"></span>
        {{ tddStore.statusMessage }}
      </div>
    </header>

    <div class="practice-content">
      <ExerciseSelector @exercise-selected="loadExercise" />
      
      <div class="editor-section">
        <div class="editor-panel">
          <h3>Tests (Write First!)</h3>
          <CodeEditor
            v-model="testCode"
            placeholder="Write your tests here using the pseudocode test syntax..."
            :language="'pseudocode-test'"
          />
        </div>

        <div class="editor-panel">
          <h3>Implementation</h3>
          <CodeEditor
            v-model="implementation"
            placeholder="Implement your solution here using pseudocode..."
            :language="'pseudocode'"
          />
        </div>
      </div>

      <div class="controls">
        <button 
          @click="runTests" 
          :disabled="!tddStore.canRunTests"
          class="run-button"
        >
          Run Tests
        </button>
        
        <button 
          @click="reset" 
          class="reset-button"
        >
          Reset
        </button>
        
        <button 
          v-if="tddStore.currentStatus === 'green'"
          @click="tddStore.moveToRefactor()"
          class="refactor-button"
        >
          Start Refactoring
        </button>
        
        <button 
          v-if="tddStore.currentStatus === 'refactor'"
          @click="tddStore.completeRefactor()"
          class="complete-refactor-button"
        >
          Test After Refactor
        </button>
      </div>

      <div class="results-section" v-if="tddStore.currentSuite">
        <TestResults :suite="tddStore.currentSuite" />
      </div>
    </div>

    <div class="workflow-guide">
      <WorkflowGuide />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTDDStore } from '@/stores/tdd'
import CodeEditor from './CodeEditor.vue'
import TestResults from './TestResults.vue'
import WorkflowGuide from './WorkflowGuide.vue'
import ExerciseSelector from './ExerciseSelector.vue'
import type { Exercise } from '@/data/exercises'

const tddStore = useTDDStore()

const testCode = ref('')
const implementation = ref('')

// Watch for changes and update store
watch(testCode, (newValue) => {
  tddStore.setTestCode(newValue)
})

watch(implementation, (newValue) => {
  tddStore.setImplementation(newValue)
})

function runTests() {
  tddStore.runTests()
}

function reset() {
  testCode.value = ''
  implementation.value = ''
  tddStore.reset()
}

function loadExercise(exercise: Exercise) {
  testCode.value = exercise.initialTests
  implementation.value = ''
  tddStore.reset()
}

// Initialize with example
testCode.value = `TEST "add should return sum of two numbers"
  ASSERT add(2, 3) == 5
END

TEST "add should handle negative numbers"
  ASSERT add(-1, 1) == 0
END`

implementation.value = `FUNCTION add(a, b)
  RETURN a + b
END`
</script>

<style scoped>
.tdd-practice {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.practice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e5e7eb;
}

.practice-header h1 {
  color: #1f2937;
  font-size: 2.5rem;
  margin: 0;
}

.status-indicator {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-dot {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  margin-right: 10px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.practice-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.editor-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.editor-panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.editor-panel h3 {
  margin: 0;
  padding: 15px 20px;
  background: #f9fafb;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  font-size: 1.1rem;
}

.controls {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 20px 0;
}

.controls button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.run-button {
  background: #3b82f6;
  color: white;
}

.run-button:hover:not(:disabled) {
  background: #2563eb;
}

.run-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.reset-button {
  background: #6b7280;
  color: white;
}

.reset-button:hover {
  background: #4b5563;
}

.refactor-button {
  background: #f59e0b;
  color: white;
}

.refactor-button:hover {
  background: #d97706;
}

.complete-refactor-button {
  background: #10b981;
  color: white;
}

.complete-refactor-button:hover {
  background: #059669;
}

.results-section {
  margin-top: 20px;
}

.workflow-guide {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  z-index: 1000;
}

@media (max-width: 1200px) {
  .workflow-guide {
    position: static;
    width: 100%;
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .editor-section {
    grid-template-columns: 1fr;
  }
  
  .practice-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .controls {
    flex-wrap: wrap;
  }
}
</style>