<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import Topbar from '@/components/Topbar.vue'
import { RouterView } from 'vue-router'
import FooterSection from './components/FooterSection.vue'

const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
</script>

<template>
  <div>
    <Topbar class="sticky bg-blue-50 dark:bg-blue-950 top-0 left-0 right-0" />

    <RouterView />
    <FooterSection />
  </div>
</template>
