<template>
  <ul class="space-y-2">
    <li
      v-for="session in props.sessions"
      :key="session.id"
      :class="[
        'session-item group relative flex justify-between items-center p-2 rounded-lg cursor-pointer transition-colors',
        session.id === props.activeSessionId
          ? 'bg-white/50 font-bold text-gray-800'
          : 'text-gray-600 hover:bg-white/30',
      ]"
      @click="onSelect(session.id)"
    >
      <span class="truncate">{{ session.title }}</span>
    </li>
  </ul>
</template>
<script setup>
  import { defineProps, defineEmits } from 'vue';
  const props = defineProps({
    sessions: Array,
    activeSessionId: Number,
  });
  const emit = defineEmits(['select']);
  function onSelect(id) {
    emit('select', id);
  }
</script>
