<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <!-- Welcome Section -->
    <div class="text-center py-8">
      <h1 class="text-4xl font-bold text-blue-600">Welcome to Pressing Service</h1>
      <p class="mt-4 text-lg text-gray-700">
        We offer fast, professional pressing services to help you look your best. Experience
        high-quality garment care from the comfort of your home.
      </p>
      <button
        @click="router.push({ name: 'orders' })"
        class="mt-6 cursor-pointer px-6 py-3 mx-72 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        View Orders
      </button>
    </div>

    <!-- How It Works Section -->
    <div class="py-16 bg-white w-full">
      <h2 class="text-3xl font-semibold text-center text-gray-800">How It Works</h2>
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <div class="text-center p-6 border rounded-lg shadow-md bg-blue-50">
          <h3 class="text-xl font-semibold text-blue-600">1. Schedule Pickup</h3>
          <p class="mt-2 text-gray-600">
            Choose a convenient time for us to pick up your garments.
          </p>
        </div>
        <div class="text-center p-6 border rounded-lg shadow-md bg-blue-50">
          <h3 class="text-xl font-semibold text-blue-600">2. Professional Pressing</h3>
          <p class="mt-2 text-gray-600">Our experts carefully press and clean your clothes.</p>
        </div>
        <div class="text-center p-6 border rounded-lg shadow-md bg-blue-50">
          <h3 class="text-xl font-semibold text-blue-600">3. DELIVERY</h3>
          <p class="mt-2 text-gray-600">
            Your fresh, pressed clothes are delivered back to you on time.
          </p>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div class="py-16 bg-gray-200 w-full">
      <h2 class="text-3xl font-semibold text-center text-gray-800">Our Services</h2>
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <div class="text-center p-6 border rounded-lg shadow-md bg-white">
          <h3 class="text-xl font-semibold text-blue-600">Shirt Pressing</h3>
          <p class="mt-2 text-gray-600">
            We take care of your shirts with precision, making them look crisp and fresh.
          </p>
        </div>
        <div class="text-center p-6 border rounded-lg shadow-md bg-white">
          <h3 class="text-xl font-semibold text-blue-600">Pants Pressing</h3>
          <p class="mt-2 text-gray-600">
            Our team ensures your pants have a sharp crease and a polished finish.
          </p>
        </div>
        <div class="text-center p-6 border rounded-lg shadow-md bg-white">
          <h3 class="text-xl font-semibold text-blue-600">Suit Pressing</h3>
          <p class="mt-2 text-gray-600">
            We specialize in professional suit pressing to keep your outfits in perfect condition.
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Us Section -->
    <div class="py-16 w-full">
      <h2 class="text-3xl font-semibold text-center text-gray-800">Contact Us</h2>
      <p class="mt-4 text-center text-lg text-gray-700">
        Have questions or need support? Get in touch with us!
      </p>
      <div class="mt-8 text-center">
        <p class="text-lg font-semibold text-blue-600">Email:</p>
        <p class="text-gray-600">support@pressingservice.com</p>
        <p class="mt-4 text-lg font-semibold text-blue-600">Phone:</p>
        <p class="text-gray-600">+1 234 567 890</p>
      </div>
    </div>
  </div>
</template>
