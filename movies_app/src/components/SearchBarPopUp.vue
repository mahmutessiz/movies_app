<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
async function sendToSearch() {
  const inputValue = document.querySelector('#search-bar2');
  await router.push('/search/' + inputValue.value).then(() => {
    window.location.reload();
  });
}
</script>

<template>
  <div
    class="fixed inset-0 z-40 hidden w-full justify-center backdrop-blur-lg sm:hidden"
    id="search-div"
  >
    <ul class="z-50 mt-32 flex h-fit shadow-sm shadow-rose-500">
      <li class="">
        <input
          type="text"
          name="searchBar"
          class="h-9 w-full rounded-l-md bg-slate-900"
          placeholder=" Search"
          id="search-bar2"
          v-on:keyup.enter="sendToSearch"
        />
      </li>
      <li
        class="grid h-fit cursor-pointer place-items-center rounded-r-md bg-black p-2"
        @click="sendToSearch"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.3rem" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
          ></path>
        </svg>
      </li>
    </ul>
  </div>
</template>
