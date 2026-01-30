```vue
<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth" aria-label="Previous month">‹</button>
      <span class="calendar-title">{{ monthYear }}</span>
      <button @click="nextMonth" aria-label="Next month">›</button>
    </div>
    <table class="calendar-table">
      <thead>
        <tr>
          <th v-for="day in weekDays" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, wIdx) in weeks" :key="wIdx">
          <td
            v-for="(date, dIdx) in week"
            :key="dIdx"
            :class="dayClass(date)"
            @click="selectDate(date)"
          >
            {{ date.getDate() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Date,
    default: () => new Date()
  }
})

const emit = defineEmits(['update:modelValue'])

const current = ref(new Date(props.modelValue))
const displayedMonth = ref(new Date(current.value.getFullYear(), current.value.getMonth(), 1))

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const monthYear = computed(() => {
  const options = { month: 'long', year: 'numeric' }
  return displayedMonth.value.toLocaleDateString(undefined, options)
})

function startOfCalendar(date) {
  const start = new Date(date)
  const day = start.getDay()
  const diff = (day === 0 ? -6 : 1 - day)
  start.setDate(start.getDate() + diff)
  return start
}

function generateWeeks() {
  const weeks = []
  let start = startOfCalendar(displayedMonth.value)
  for (let i = 0; i < 6; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      week.push(new Date(start))
      start.setDate(start.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

const weeks = computed(() => generateWeeks())

function prevMonth() {
  displayedMonth.value = new Date(
    displayedMonth.value.getFullYear(),
    displayedMonth.value.getMonth() - 1,
    1
  )
}

function nextMonth() {
  displayedMonth.value = new Date(
    displayedMonth.value.getFullYear(),
    displayedMonth.value.getMonth() + 1,
    1
  )
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function dayClass(date) {
  const classes = ['day']
  if (date.getMonth() !== displayedMonth.value.getMonth()) {
    classes.push('other-month')
  }
  if (isSameDay(date, current.value)) {
    classes.push('today')
  }
  if (isSameDay(date, props.modelValue)) {
    classes.push('selected')
  }
  return classes.join(' ')
}

function selectDate(date) {
  if (date.getMonth() !== displayedMonth.value.getMonth()) {
    displayedMonth.value = new Date(date.getFullYear(), date.getMonth(), 1)
  }
  emit('update:modelValue', new Date(date))
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal instanceof Date && !isNaN(newVal)) {
      current.value = new Date(newVal)
    }
  }
)
</script>

<style scoped>
.calendar {
  max-width: 320px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: #f5f5f5;
}
.calendar-title {
  font-weight: bold;
}
.calendar-table {
  width: 100%;
  border-collapse: collapse;
}
.calendar-table th,
.calendar-table td {
  width: 14.28%;
  text-align: center;
  padding: 8px;
  cursor: pointer;
}
.calendar-table td.other-month {
  color: #bbb;
}
.calendar-table td.today {
  background: #e0f7fa;
}
.calendar-table td.selected {
  background: #80deea;
  color: #fff;
}
.calendar-table td:hover {
  background: #f1f1f1;
}
</style>
```