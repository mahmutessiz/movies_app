<script setup>
import { RouterView } from 'vue-router'
import MainMenu from './components/MainMenu.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <MainMenu />
  <RouterView />
  <FooterSection />
</template>
