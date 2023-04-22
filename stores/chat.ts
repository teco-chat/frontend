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
    try {
      const response: any = await $fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useRuntimeConfig().public.gptApiToken}`
          },
          body: {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: query.value }],
          },
        }
      );
      console.log(response.choices[0].message.content);
      result.value = (response.choices[0].message.content).replace(/\n/g, '<br>');
      load.value = false;
    } catch (error) {
      result.value = "GPT 서버가 응답하지 않습니다.";
      load.value = false;
    };
  };

  return { query, result, load, chat, clear };
});
