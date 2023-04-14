<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <div class="z-50 mt-12 flex w-full justify-center bg-rose-900 px-4 py-2 pl-8 text-center">
    <p class="md:w-1/2">
      This product uses the TMDB API but is not endorsed or certified by TMDB. All data and/or
      images used are attributed to TMDB as the source. For more information:
      <a
        href="https://www.themoviedb.org/documentation/api/terms-of-use"
        class="text-blue-500 underline"
        >TMDB API Terms of Use
      </a>
    </p>
  </div>

  <footer class="footer footer-center rounded bg-gray-800 p-10 text-white/70">
    <div class="grid grid-flow-col gap-4">
      <RouterLink to="/" class="link-hover link">Home</RouterLink>
      <RouterLink to="/" class="link-hover link">Movies</RouterLink>
      <RouterLink to="/series" class="link-hover link">Series</RouterLink>
      <a class="link-hover link" href="mailto:mahmutessiz71@gmail.com">Contact</a>
    </div>
    <div>
      <div class="grid grid-flow-col gap-4">
        <a href="https://github.com/mahmutessiz" target="_blank"
          ><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
            /></svg
        ></a>
        <a href="https://www.linkedin.com/in/mahmut-e%C5%9Fsiz-b1b8a8185/" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              d="M17.04 17.043h-2.962v-4.64c0-1.107-.023-2.531-1.544-2.531c-1.544 0-1.78 1.204-1.78 2.449v4.722H7.793V7.5h2.844v1.3h.039c.397-.75 1.364-1.54 2.808-1.54c3.001 0 3.556 1.974 3.556 4.545v5.238ZM4.447 6.194c-.954 0-1.72-.771-1.72-1.72s.767-1.72 1.72-1.72a1.72 1.72 0 0 1 0 3.44Zm1.484 10.85h-2.97V7.5h2.97v9.543ZM18.521 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.042c.815 0 1.482-.644 1.482-1.44V1.44C20 .646 19.333 0 18.518 0h.003Z"
            />
          </svg>
        </a>
        <a href="https://www.mahmutessiz.dev/" target="_blank"
          ><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"
            /></svg
        ></a>
      </div>
    </div>
    <div>
      <p>Copyright © 2023 - Mahmut Eşsiz</p>
    </div>
  </footer>
</template>
