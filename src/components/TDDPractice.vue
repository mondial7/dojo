<template>
  <div class="tdd-practice">
    <header class="practice-header">
      <div class="header-left">
        <h1>TDD Dojo</h1>
        <div class="status-indicator" :style="{ backgroundColor: tddStore.statusColor }">
          <span class="status-dot"></span>
          {{ tddStore.statusMessage }}
        </div>
      </div>
      <div class="header-right">
        <ThemeToggle />
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
import ThemeToggle from './ThemeToggle.vue'
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
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.practice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px 0;
  border-bottom: 2px solid var(--color-border);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 30px;
}

.header-right {
  display: flex;
  align-items: center;
}

.practice-header h1 {
  color: var(--color-heading);
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
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
  gap: 25px;
}

.editor-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  min-height: 400px;
}

.editor-panel {
  background: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.editor-panel:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.editor-panel h3 {
  margin: 0;
  padding: 18px 24px;
  background: var(--color-background-mute);
  color: var(--color-heading);
  border-bottom: 1px solid var(--color-border);
  font-size: 1.1rem;
  font-weight: 600;
}

.controls {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 25px 0;
  flex-wrap: wrap;
}

.controls button {
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.run-button {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.run-button:hover:not(:disabled) {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.run-button:disabled {
  background: var(--color-text-soft);
  border-color: var(--color-text-soft);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.reset-button {
  background: var(--color-text-soft);
  color: white;
  border-color: var(--color-text-soft);
}

.reset-button:hover {
  background: var(--color-text);
  border-color: var(--color-text);
  transform: translateY(-1px);
}

.refactor-button {
  background: var(--color-warning);
  color: white;
  border-color: var(--color-warning);
}

.refactor-button:hover {
  background: var(--color-warning-hover);
  border-color: var(--color-warning-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.complete-refactor-button {
  background: var(--color-success);
  color: white;
  border-color: var(--color-success);
}

.complete-refactor-button:hover {
  background: var(--color-success-hover);
  border-color: var(--color-success-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.results-section {
  margin-top: 20px;
}

.workflow-guide {
  grid-column: 1 / -1;
}

@media (min-width: 1400px) {
  .practice-content {
    grid-template-columns: 1fr 320px;
    grid-template-rows: auto 1fr auto;
    gap: 30px;
  }
  
  .editor-section {
    grid-column: 1;
    grid-row: 1 / -1;
  }
  
  .controls {
    grid-column: 1;
  }
  
  .results-section {
    grid-column: 1;
  }
  
  .workflow-guide {
    grid-column: 2;
    grid-row: 1 / -1;
    position: sticky;
    top: 20px;
    height: fit-content;
  }
}

@media (max-width: 1024px) {
  .tdd-practice {
    padding: 15px;
  }
  
  .practice-header h1 {
    font-size: 2rem;
  }
  
  .header-left {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .tdd-practice {
    padding: 10px;
  }
  
  .editor-section {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .practice-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
    padding: 15px 0;
  }
  
  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    width: 100%;
  }
  
  .practice-header h1 {
    font-size: 1.8rem;
  }
  
  .controls {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .controls button {
    flex: 1;
    min-width: 120px;
  }
}
</style>