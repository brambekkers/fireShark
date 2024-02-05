import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const user = ref()

  const fetchUser = async (userId) =>
    await fetch("http://192.168.0.192:3000/users").then((res) => user.value = res.json()[userId])
  
  return {
    user,
    fetchUser
  }
})

export default useUserStore
