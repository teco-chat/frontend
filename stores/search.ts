import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", () => {
  const course = ref("");
  const name = ref("");
  const load = ref(false);

  return { }
});