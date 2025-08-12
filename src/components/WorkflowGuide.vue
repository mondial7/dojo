<template>
  <div class="workflow-guide">
    <div class="guide-header">
      <h4>TDD Workflow</h4>
      <button @click="toggleExpanded" class="toggle-button">
        {{ isExpanded ? '−' : '+' }}
      </button>
    </div>
    
    <div v-if="isExpanded" class="guide-content">
      <div class="workflow-steps">
        <div class="step" :class="{ active: currentStep === 1 }">
          <div class="step-number red">1</div>
          <div class="step-content">
            <h5>Red</h5>
            <p>Write a failing test first</p>
            <ul>
              <li>Think about the desired behavior</li>
              <li>Write the simplest test that fails</li>
              <li>Run tests to see them fail</li>
            </ul>
          </div>
        </div>
        
        <div class="step" :class="{ active: currentStep === 2 }">
          <div class="step-number green">2</div>
          <div class="step-content">
            <h5>Green</h5>
            <p>Write minimal code to pass</p>
            <ul>
              <li>Write the simplest code that works</li>
              <li>Don't worry about perfect code yet</li>
              <li>Run tests to see them pass</li>
            </ul>
          </div>
        </div>
        
        <div class="step" :class="{ active: currentStep === 3 }">
          <div class="step-number refactor">3</div>
          <div class="step-content">
            <h5>Refactor</h5>
            <p>Improve the code quality</p>
            <ul>
              <li>Clean up the implementation</li>
              <li>Remove duplication</li>
              <li>Ensure tests still pass</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="syntax-help">
        <h5>Pseudocode Syntax</h5>
        <div class="syntax-section">
          <h6>Functions</h6>
          <pre>FUNCTION name(param1, param2)
  // your code here
  RETURN value
END</pre>
        </div>
        
        <div class="syntax-section">
          <h6>Variables</h6>
          <pre>SET variable = value
SET count = count + 1</pre>
        </div>
        
        <div class="syntax-section">
          <h6>Tests</h6>
          <pre>TEST "description"
  ASSERT function(args) == expected
  EXPECT function(args) TO_BE value
END</pre>
        </div>
        
        <div class="syntax-section">
          <h6>Conditionals</h6>
          <pre>IF condition THEN
  // do something
ELSE
  // do something else
END</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTDDStore } from '@/stores/tdd'

const tddStore = useTDDStore()
const isExpanded = ref(false)

const currentStep = computed(() => {
  switch (tddStore.currentStatus) {
    case 'idle':
    case 'red':
      return 1
    case 'green':
      return 2
    case 'refactor':
      return 3
    default:
      return 1
  }
})

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.workflow-guide {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.guide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.guide-header h4 {
  margin: 0;
  color: #374151;
  font-size: 1.1rem;
}

.toggle-button {
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #6b7280;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.toggle-button:hover {
  background: #e5e7eb;
}

.guide-content {
  padding: 20px;
}

.workflow-steps {
  margin-bottom: 30px;
}

.step {
  display: flex;
  margin-bottom: 20px;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.step.active {
  opacity: 1;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  margin-right: 15px;
  flex-shrink: 0;
}

.step-number.red {
  background: #ef4444;
}

.step-number.green {
  background: #22c55e;
}

.step-number.refactor {
  background: #f59e0b;
}

.step-content h5 {
  margin: 0 0 5px 0;
  color: #374151;
  font-size: 1rem;
}

.step-content p {
  margin: 0 0 10px 0;
  color: #6b7280;
  font-size: 14px;
}

.step-content ul {
  margin: 0;
  padding-left: 20px;
  color: #6b7280;
  font-size: 13px;
}

.step-content li {
  margin-bottom: 3px;
}

.syntax-help h5 {
  margin: 0 0 15px 0;
  color: #374151;
  font-size: 1rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 10px;
}

.syntax-section {
  margin-bottom: 20px;
}

.syntax-section h6 {
  margin: 0 0 8px 0;
  color: #4b5563;
  font-size: 14px;
  font-weight: 600;
}

.syntax-section pre {
  background: #f9fafb;
  padding: 10px 12px;
  border-radius: 4px;
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  color: #374151;
  border: 1px solid #e5e7eb;
  overflow-x: auto;
}
</style>