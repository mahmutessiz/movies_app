<script setup>
// Router import
import { useRoute } from 'vue-router';
const route = useRoute();
const movieId = route.params.id;
console.log(movieId);
</script>

<template>
  <section>
    <div class="flex">
      <div class="h-96 w-2/3 bg-slate-400 text-black">hi!</div>
      <div class="h-96 w-1/3 bg-slate-400/50"></div>
    </div>
  </section>
</template>
