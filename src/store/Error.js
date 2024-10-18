import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore('Error', () => {
  const show = ref(false);
  const errorMessage = ref({
    name:'1',
    left:'1'
  });
  
  const showError = (message) => {
    console.log('调用');
    show.value = true;
    //errorMessage.value = message;
    console.log(errorMessage.value);
  };

  return {
    show,
    errorMessage,
    showError
  };
});

