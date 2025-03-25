<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ProfileMenu from './ProfileMenu.vue'
</script>

<template>
  <header class="bg-background p-4 flex justify-center items-center">
    <div class="flex justify-between w-full max-w-1200 mx-auto">
      <RouterLink class="flex items-center" :to="{ name: 'home' }">
        <img src="@/assets/lr-logo.png" alt="Logo" class="sm:w-24 sm:h-12 w-12 h-6" />
      </RouterLink>
      <nav class="flex gap-4 justify-center items-center">
        <RouterLink class="text-text hover:text-text-hover" :to="{ name: 'orders' }"
          >Orders</RouterLink
        >
      </nav>
    </div>
    <ProfileMenu />
  </header>
</template>
