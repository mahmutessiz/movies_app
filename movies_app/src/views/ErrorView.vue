<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <!-- This is an example component -->
  <div class="mt-12 flex w-full items-center bg-black py-12">
    <div
      class="container flex flex-col items-center justify-between px-5 text-gray-700 md:flex-row"
    >
      <div class="mx-8 w-full lg:w-1/2">
        <div class="font-dark mb-8 text-7xl font-extrabold text-green-500">404</div>
        <p class="mb-8 text-2xl font-light leading-normal text-white md:text-3xl">
          Sorry we couldn't find the page you're looking for
        </p>

        <RouterLink
          to="/"
          class="duration-400 inline rounded-lg border border-transparent bg-green-600 px-5 py-3 text-sm font-medium leading-5 text-white shadow-2xl transition-all hover:bg-red-700 focus:outline-none active:bg-red-600"
          >back to homepage</RouterLink
        >
      </div>
      <div class="mx-5 my-12 w-full lg:flex lg:w-1/2 lg:justify-end">
        <img
          src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
          class=""
          alt="Page not found"
        />
      </div>
    </div>
  </div>
</template>
