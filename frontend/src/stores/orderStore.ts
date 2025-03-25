import { defineStore } from "pinia";
import axios from "axios";
import type { Order } from "@/types";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as Order[],
  }),
  actions: {
    async fetchOrders() {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        this.orders = response.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },

    async createOrder(service: string) {
      try {
        const userId = "auth0|67afbc2cf7fb44f3a714d471"; // Replace with actual user ID (use Auth0 if needed)
        console.log("Sending request:", { service, userId });
    
        const response = await axios.post("http://localhost:3000/orders", {
          service,
          userId,
        });
    
        console.log("Order created:", response.data);
        this.orders.push(response.data);
      } catch (error: any) {
        console.error("Error creating order:", error.response?.data || error.message);
      }
    },

    async updateOrderStatus(id: number, status: string) {
      try {
        await axios.put(`http://localhost:3000/orders/${id}`, { status });
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    },

    async deleteOrder(id: number) {
      try {
        await axios.delete(`http://localhost:3000/orders/${id}`);
        this.orders = this.orders.filter((order) => order.id !== id);
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    },
  },
});
