<template>
  <div class="code-editor">
    <textarea
      v-model="localValue"
      :placeholder="placeholder"
      class="editor-textarea"
      spellcheck="false"
    ></textarea>
    <div class="editor-sidebar">
      <div class="line-numbers">
        <div
          v-for="line in lineCount"
          :key="line"
          class="line-number"
        >
          {{ line }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Enter your code here...',
  language: 'pseudocode'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const localValue = ref(props.modelValue)

const lineCount = computed(() => {
  const lines = localValue.value.split('\n').length
  return Math.max(lines, 10) // Minimum 10 lines
})

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => props.modelValue, (newValue) => {
  if (newValue !== localValue.value) {
    localValue.value = newValue
  }
})
</script>

<style scoped>
.code-editor {
  position: relative;
  display: flex;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  min-height: 300px;
}

.editor-sidebar {
  background: #f3f4f6;
  border-right: 1px solid #e5e7eb;
  padding: 15px 10px;
  user-select: none;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.line-number {
  color: #9ca3af;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
  text-align: right;
  min-width: 30px;
}

.editor-textarea {
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  padding: 15px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #1f2937;
  tab-size: 2;
}

.editor-textarea::placeholder {
  color: #9ca3af;
  font-style: italic;
}

.editor-textarea:focus {
  background: white;
}

/* Syntax highlighting for pseudocode */
.editor-textarea {
  /* This would be enhanced with a proper syntax highlighter in a real implementation */
  white-space: pre-wrap;
}
</style>