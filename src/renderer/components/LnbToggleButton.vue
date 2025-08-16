<template>
  <button
    class="absolute top-1/2 z-20 -translate-y-1/2 bg-white/50 border border-white/60 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-white/70 transition-all duration-300 ease-in-out"
    title="메뉴 열기/닫기"
  >
    <slot></slot>
  </button>
</template>
<script setup>
  // props: isOpen, onToggle
</script>
