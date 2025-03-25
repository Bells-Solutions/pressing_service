<script setup>
import { ref, onMounted } from "vue";
import { useOrderStore } from "@/stores/orderStore";

const orderStore = useOrderStore();
const newService = ref("");

onMounted(() => {
  orderStore.fetchOrders();
});

const addOrder = async () => {
  if (newService.value.trim() !== "") {
    await orderStore.createOrder(newService.value);
    newService.value = "";
  }
};
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-semibold text-gray-800">Orders</h1>
    
    <div class="mt-4 flex gap-2">
      <input
        v-model="newService"
        placeholder="Enter service"
        class="p-2 border rounded-lg"
      />
      <button @click="addOrder" class="px-4 py-2 bg-green-500 text-white rounded-lg">
        Add Order
      </button>
    </div>

    <ul class="mt-4 space-y-2">
      <li
        v-for="order in orderStore.orders"
        :key="order.id"
        class="p-4 bg-white shadow-md rounded-lg flex justify-between"
      >
        <span>{{ order.service }}</span>
        <span
          :class="{
            'text-green-500': order.status === 'completed',
            'text-yellow-500': order.status === 'pending',
          }"
        >
          {{ order.status }}
        </span>
      </li>
    </ul>
  </div>
</template>
