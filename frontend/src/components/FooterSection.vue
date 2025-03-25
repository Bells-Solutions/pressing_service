<template>
  <div class="w-full bg-gray-800 text-white py-6 mt-4">
    <div class="text-center">
      <p>&copy; 2025 Pressing Service. All rights reserved.</p>
      <RouterLink :to="{ name: 'privacy-policy' }" class="text-blue-400 hover:underline mt-2 block"
        >Privacy Policy</RouterLink
      >
      <RouterLink
        :to="{ name: 'terms-and-conditions' }"
        class="text-blue-400 hover:underline mt-2 block"
        >Terms & Conditions</RouterLink
      >
    </div>
  </div>
</template>
