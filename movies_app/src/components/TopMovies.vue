<template>
  <div class="w-full">
    <div class="w-full p-4"><h2 class="text-center text-2xl text-green-500">Top Movies</h2></div>
    <ul class="flex w-full items-center gap-4 overflow-x-scroll p-4">
      <li v-for="n in 20" :key="n" class="h-80 w-80 shrink-0 bg-white">{{ n }}</li>
    </ul>
  </div>
</template>
