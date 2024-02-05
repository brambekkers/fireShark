import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const user = ref()
  
  const fetchUser = async (userId) => {
    try {
      const response = await fetch("http://192.168.0.172:3000/users")
      const users = await response.json()
      user.value = users?.[userId]
    } catch {
      console.log("Error")
    }
  }
  return {
    user,
    fetchUser,
  }
})

export default useUserStore
