import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", () => {
  const query = ref("");
  const result = ref("");

  function clear() {
    query.value = "";
  }

  const chat = async () => {
    if (result.value == "") {
      result.value += "질문에 대한 답변";
    }
  };

  return { query, result, chat, clear };
});
