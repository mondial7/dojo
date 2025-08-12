<template>
  <div class="test-results">
    <div class="results-header">
      <h3>Test Results</h3>
      <div class="results-summary">
        <span class="passed">{{ suite.passed }} passed</span>
        <span class="failed">{{ suite.failed }} failed</span>
        <span class="total">{{ suite.total }} total</span>
      </div>
    </div>

    <div class="test-list">
      <div
        v-for="test in suite.tests"
        :key="test.name"
        class="test-item"
        :class="{ 
          passed: test.passed === true, 
          failed: test.passed === false,
          pending: test.passed === null
        }"
      >
        <div class="test-status">
          <span v-if="test.passed === true" class="status-icon">✓</span>
          <span v-else-if="test.passed === false" class="status-icon">✗</span>
          <span v-else class="status-icon">●</span>
        </div>
        
        <div class="test-details">
          <div class="test-name">{{ test.name }}</div>
          
          <div v-if="test.error" class="test-error">
            {{ test.error }}
          </div>
          
          <div v-if="test.passed === false && test.actual !== undefined && test.expected !== undefined" class="test-values">
            <div class="expected">Expected: {{ formatValue(test.expected) }}</div>
            <div class="actual">Actual: {{ formatValue(test.actual) }}</div>
          </div>
          
          <details v-if="test.code" class="test-code">
            <summary>Show test code</summary>
            <pre>{{ test.code }}</pre>
          </details>
        </div>
      </div>
    </div>

    <div v-if="suite.total === 0" class="no-tests">
      No tests found. Make sure to use the TEST syntax.
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TestSuite } from '@/core/test-framework'
import type { PseudocodeValue } from '@/core/pseudocode-language'

interface Props {
  suite: TestSuite
}

defineProps<Props>()

function formatValue(value: PseudocodeValue): string {
  if (value === null) return 'null'
  if (typeof value === 'string') return `"${value}"`
  if (Array.isArray(value)) return `[${value.map(formatValue).join(', ')}]`
  return String(value)
}
</script>

<style scoped>
.test-results {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.results-header h3 {
  margin: 0;
  color: #374151;
  font-size: 1.25rem;
}

.results-summary {
  display: flex;
  gap: 15px;
  font-size: 14px;
  font-weight: 600;
}

.passed {
  color: #059669;
}

.failed {
  color: #dc2626;
}

.total {
  color: #6b7280;
}

.test-list {
  padding: 0;
}

.test-item {
  display: flex;
  padding: 15px 20px;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s;
}

.test-item:last-child {
  border-bottom: none;
}

.test-item.passed {
  background: #f0fdf4;
  border-left: 4px solid #22c55e;
}

.test-item.failed {
  background: #fef2f2;
  border-left: 4px solid #ef4444;
}

.test-item.pending {
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
}

.test-status {
  margin-right: 15px;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.status-icon {
  font-weight: bold;
  font-size: 16px;
}

.test-item.passed .status-icon {
  color: #22c55e;
}

.test-item.failed .status-icon {
  color: #ef4444;
}

.test-item.pending .status-icon {
  color: #f59e0b;
}

.test-details {
  flex: 1;
}

.test-name {
  font-weight: 600;
  color: #374151;
  margin-bottom: 5px;
}

.test-error {
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 10px;
  background: #fef2f2;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #fecaca;
}

.test-values {
  font-size: 14px;
  margin-bottom: 10px;
}

.expected, .actual {
  margin: 2px 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.expected {
  color: #059669;
}

.actual {
  color: #dc2626;
}

.test-code {
  margin-top: 10px;
  font-size: 13px;
}

.test-code summary {
  cursor: pointer;
  color: #6b7280;
  font-weight: 500;
  padding: 5px 0;
}

.test-code summary:hover {
  color: #374151;
}

.test-code pre {
  background: #f9fafb;
  padding: 10px;
  border-radius: 4px;
  margin: 5px 0 0 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: #374151;
  overflow-x: auto;
}

.no-tests {
  padding: 40px 20px;
  text-align: center;
  color: #9ca3af;
  font-style: italic;
}
</style>