<script setup>
import { RouterLink } from 'vue-router';

/**
 * Drawer behavior setting
 */

function drawerStatusToggle() {
  const draver = document.querySelector('#drawer-display-status');
  draver.classList.toggle('hidden');
}
</script>

<template>
  <header
    class="sticky -top-1 z-50 flex w-full items-center justify-between bg-slate-800/70 px-4 py-4 text-white backdrop-blur-md sm:justify-evenly"
  >
    <RouterLink to="/"
      ><img src="../assets/logo2.png" class="w-20 opacity-80 sm:w-36" alt=""
    /></RouterLink>

    <ul class="hidden sm:flex">
      <li class="">
        <input
          type="text"
          name="searchBar"
          class="h-8 w-60 rounded-l-md bg-slate-900"
          placeholder=" Search"
        />
      </li>
      <li class="grid cursor-pointer place-items-center rounded-r-md bg-black p-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
          ></path>
        </svg>
      </li>
    </ul>
    <ul class="hidden gap-4 sm:flex">
      <li class="hover:text-white/70">
        <RouterLink to="/" class="focus:text-white/70 active:text-white/70">Home</RouterLink>
      </li>
      <li class="hover:text-white/70">
        <RouterLink to="/series" class="focus:text-white/70 active:text-white/70"
          >Series</RouterLink
        >
      </li>
      <li class="hover:text-white/70">
        <RouterLink to="/" class="focus:text-white/70 active:text-white/70">Anime</RouterLink>
      </li>
      <li class="hover:text-white/70">Explore</li>
    </ul>
    <div class="flex items-center gap-4 sm:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
        />
      </svg>

      <div class="drawer-content">
        <div @click="drawerStatusToggle">
          <label
            for="my-drawer-4"
            class="drawer-button btn -mr-4 border-0 bg-gray-900/50 text-white hover:bg-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  </header>

  <div id="drawer-display-status" class="drawer drawer-end fixed top-16 z-40 hidden">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label for="my-drawer-4" class="drawer-overlay" @click="drawerStatusToggle"></label>
      <ul class="menu w-80 bg-base-100/50 p-4 text-base-content backdrop-blur-md">
        <li @click="deneme"><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/">Movies</RouterLink></li>
        <li><RouterLink to="/series">Series</RouterLink></li>
        <li><RouterLink to="/">Explore</RouterLink></li>
      </ul>
    </div>
  </div>
</template>
