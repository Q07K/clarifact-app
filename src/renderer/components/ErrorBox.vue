<template>
  <div
    class="mt-4 glass-card border-red-400/50 text-red-800 px-4 py-3"
    role="alert"
    aria-live="assertive"
  >
    <strong class="font-bold">오류 발생:</strong>
    <span class="block sm:inline">{{ error }}</span>
  </div>
</template>
<script setup>
  // props: error
</script>
