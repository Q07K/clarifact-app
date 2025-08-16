<template>
  <section class="glass-card p-4 sm:p-6 mb-8">
    <div class="relative">
      <input type="text" class="w-full pl-4 pr-48 py-3 text-base sm:text-lg bg-white/50 border-2 border-white/40 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow placeholder-gray-500" placeholder="스태그플레이션 원인, 또는 python TypeError 해결 방법" v-model="prompt" @keyup.enter="onGenerate" />
      <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/40 text-gray-800 font-bold px-4 py-2 rounded-lg hover:bg-white/60 border border-white/50 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-accent flex items-center gap-2 disabled:bg-gray-400/20 disabled:text-gray-500 disabled:cursor-not-allowed" :disabled="loading" @click="onGenerate">
        <span>{{ loading ? '생성 중...' : '✨ AI로 답변 생성' }}</span>
      </button>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue';
const prompt = ref('');
const loading = ref(false);
function onGenerate() {
  // emit('generate', prompt.value)
}
</script>
