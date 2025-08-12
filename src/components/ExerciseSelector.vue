<template>
  <div class="exercise-selector">
    <div class="selector-header">
      <h3>Practice Exercises</h3>
      <button @click="toggleExpanded" class="toggle-button">
        {{ isExpanded ? 'Hide' : 'Show' }} Exercises
      </button>
    </div>
    
    <div v-if="isExpanded" class="selector-content">
      <div class="filters">
        <select v-model="selectedDifficulty" @change="filterExercises">
          <option value="">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        
        <select v-model="selectedCategory" @change="filterExercises">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      
      <div class="exercise-list">
        <div
          v-for="exercise in filteredExercises"
          :key="exercise.id"
          class="exercise-item"
          :class="{ selected: selectedExercise?.id === exercise.id }"
          @click="selectExercise(exercise)"
        >
          <div class="exercise-header">
            <h4>{{ exercise.title }}</h4>
            <div class="exercise-meta">
              <span class="difficulty" :class="exercise.difficulty">
                {{ exercise.difficulty }}
              </span>
              <span class="category">{{ exercise.category }}</span>
            </div>
          </div>
          <p class="exercise-description">{{ exercise.description }}</p>
        </div>
      </div>
      
      <div v-if="selectedExercise" class="exercise-details">
        <h4>{{ selectedExercise.title }}</h4>
        <p>{{ selectedExercise.description }}</p>
        
        <div class="exercise-actions">
          <button @click="loadExercise" class="load-button">
            Load Exercise
          </button>
          <button v-if="showHints" @click="toggleHints" class="hints-button">
            {{ hintsVisible ? 'Hide' : 'Show' }} Hints
          </button>
        </div>
        
        <div v-if="hintsVisible && selectedExercise.hints" class="hints">
          <h5>Hints:</h5>
          <ul>
            <li v-for="hint in selectedExercise.hints" :key="hint">
              {{ hint }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { exercises, getExercisesByDifficulty } from '@/data/exercises'
import type { Exercise } from '@/data/exercises'

interface Props {
  showHints?: boolean
}

withDefaults(defineProps<Props>(), {
  showHints: true
})

const emit = defineEmits<{
  exerciseSelected: [exercise: Exercise]
}>()

const isExpanded = ref(false)
const selectedDifficulty = ref('')
const selectedCategory = ref('')
const selectedExercise = ref<Exercise | null>(null)
const hintsVisible = ref(false)

const categories = computed(() => {
  return [...new Set(exercises.map(ex => ex.category))].sort()
})

const filteredExercises = ref<Exercise[]>(exercises)

function filterExercises() {
  let filtered = exercises
  
  if (selectedDifficulty.value) {
    filtered = getExercisesByDifficulty(selectedDifficulty.value as Exercise['difficulty'])
  }
  
  if (selectedCategory.value) {
    filtered = filtered.filter(ex => ex.category === selectedCategory.value)
  }
  
  filteredExercises.value = filtered
}

function selectExercise(exercise: Exercise) {
  selectedExercise.value = exercise
  hintsVisible.value = false
}

function loadExercise() {
  if (selectedExercise.value) {
    emit('exerciseSelected', selectedExercise.value)
    isExpanded.value = false
  }
}

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}

function toggleHints() {
  hintsVisible.value = !hintsVisible.value
}

onMounted(() => {
  filterExercises()
})
</script>

<style scoped>
.exercise-selector {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
}

.selector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.selector-header h3 {
  margin: 0;
  color: #374151;
  font-size: 1.1rem;
}

.toggle-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.toggle-button:hover {
  background: #2563eb;
}

.selector-content {
  padding: 20px;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.filters select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.exercise-list {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  margin-bottom: 20px;
}

.exercise-item {
  padding: 15px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s;
}

.exercise-item:last-child {
  border-bottom: none;
}

.exercise-item:hover {
  background: #f9fafb;
}

.exercise-item.selected {
  background: #eff6ff;
  border-left: 4px solid #3b82f6;
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.exercise-header h4 {
  margin: 0;
  color: #374151;
  font-size: 1rem;
}

.exercise-meta {
  display: flex;
  gap: 10px;
  align-items: center;
}

.difficulty {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.difficulty.beginner {
  background: #dcfce7;
  color: #166534;
}

.difficulty.intermediate {
  background: #fef3c7;
  color: #92400e;
}

.difficulty.advanced {
  background: #fee2e2;
  color: #991b1b;
}

.category {
  background: #f3f4f6;
  color: #6b7280;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.exercise-description {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.4;
}

.exercise-details {
  background: #f9fafb;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.exercise-details h4 {
  margin: 0 0 10px 0;
  color: #374151;
}

.exercise-details p {
  margin: 0 0 15px 0;
  color: #6b7280;
}

.exercise-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.load-button {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.load-button:hover {
  background: #059669;
}

.hints-button {
  background: #6b7280;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.hints-button:hover {
  background: #4b5563;
}

.hints {
  background: #fffbeb;
  border: 1px solid #fed7aa;
  border-radius: 4px;
  padding: 15px;
}

.hints h5 {
  margin: 0 0 10px 0;
  color: #92400e;
}

.hints ul {
  margin: 0;
  padding-left: 20px;
  color: #78350f;
}

.hints li {
  margin-bottom: 5px;
}
</style>