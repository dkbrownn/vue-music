import { defineStore } from "pinia"
import { ref } from "vue"
export const useTestSotre = defineStore('test', () => {
  const test = ref(null)
  const changeTest = () => {
    test.value = [1]
  }
  return { test, changeTest }
})