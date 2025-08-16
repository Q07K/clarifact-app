<template>
  <div class="glass-card overflow-hidden">
    <div class="p-4 sm:p-6 border-b border-white/30 flex justify-between items-center">
      <h2 class="text-lg sm:text-xl font-bold text-gray-800">{{ title }}</h2>
      <div class="px-3 py-1 text-sm font-medium rounded-full" :class="statusClass">{{ status }}</div>
    </div>
    <div class="p-4 sm:p-6">
      <div class="bg-blue-500/10 p-4 rounded-lg mb-6 border border-white/20">
        <p class="font-bold" style="color: var(--color-primary);">TL;DR (AI 요약)</p>
        <p class="text-gray-700">{{ summary }}</p>
      </div>
      <slot name="main-content-area"></slot>
      <div class="mt-6 flex gap-2">
        <slot name="action-buttons"></slot>
      </div>
    </div>
    <div class="bg-black/5 p-4 sm:p-6 border-t border-white/30">
      <h4 class="text-sm font-bold text-gray-600 mb-3">정보 출처 및 검증 시각</h4>
      <ul class="space-y-2 mb-4">
        <slot name="source-list"></slot>
      </ul>
      <div class="flex items-center text-xs text-gray-500">
        <slot name="verified-time"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
// props: title, summary, status, statusClass
</script>
