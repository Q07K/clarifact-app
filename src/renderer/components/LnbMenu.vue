<template>
  <nav class="glass-card rounded-l-none min-h-screen flex flex-col w-full p-0 overflow-hidden">
    <div class="flex items-center justify-between mb-4 p-4 pb-0">
      <h2 class="text-xl font-bold text-gray-700">대화 목록</h2>
      <button
        class="p-2 rounded-lg bg-white/40 hover:bg-white/60 transition-colors"
        title="새로운 대화 시작"
      >
        <slot name="new-chat-btn"></slot>
      </button>
    </div>
    <div class="flex-grow overflow-y-auto p-4 pt-0 pr-2">
      <ul class="space-y-2">
        <slot name="session-list"></slot>
      </ul>
    </div>
  </nav>
</template>
<script setup>
  // props: sessionList, onNewChat
</script>
