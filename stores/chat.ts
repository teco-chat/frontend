import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", () => {
  const query = ref("");
  const result = ref("");
  const load = ref(false);

  function clear() {
    query.value = "";
  }

  const chat = async () => {
    if (load.value) {
      return;
    }
    load.value = true;
    const response = await useFetch("/api/chat", {
      method: "post",
      body: { text: query.value },
    });
    result.value = response.data.value;
    load.value = false;
  };

  return { query, result, load, chat, clear };
});
