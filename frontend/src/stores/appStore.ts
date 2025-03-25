// stores/app.ts
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    appName: import.meta.env.VITE_APP_NAME,
    apiUrl: import.meta.env.VITE_API_URL,
    isDevMode: import.meta.env.DEV,
  }),
  // Optional getters if you need computed values
  getters: {
    fullApiUrl: (state) => `${state.apiUrl}/api/v1`,
  },
  // Optional actions if you need to modify state
  actions: {
    updateAppName(newName: string) {
      this.appName = newName
    },
  },
})
