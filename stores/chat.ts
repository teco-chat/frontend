import { defineStore } from "pinia";
import { replaceCodeFences } from "~~/utils/code";
import { useAuthStore } from "./auth";

export const useChatStore = defineStore("chat", () => {
  const query = ref("");
  const item: any = ref({ messages: [] });
  const load = ref(false);
  const chatId = ref(0);

  const clear = () => {
    query.value = "";
    load.value = false;
  };

  const clearAll = () => {
    query.value = "";
    load.value = false;
    item.value = { messages: [] };
    chatId.value = 0;
  };

  const startNewChatWithId = async (id: any) => {
    if (load.value) {
      return;
    }
    load.value = true;
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chats/" + id,
      {
        method: "GET",
      }
    );

    const result: any = data;
    item.value = result.value;
    for (let i = 0; i < item.value.messages.length; i++) {
      item.value.messages[i].content = replaceCodeFences(
        item.value.messages[i].content
      );
    }
    chatId.value = id;
    load.value = false;
  };

  const question = async () => {
    if (load.value || query.value == "") {
      return;
    }
    load.value = true;
    addMessage(query.value, "user");
    load.value = false;
  };

  const answer = async () => {
    if (load.value || query.value == "") {
      return;
    }
    load.value = true;

    const url = chatId.value == 0 ? "/chats" : "/chats/" + chatId.value;
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + url,
      {
        headers: {
          name: useAuthStore().encodedName(),
        },
        body: {
          message: query.value,
          token: 0,
        },
        method: "POST",
      }
    );

    if (error.value) {
      load.value = false;
      addMessage("다시 요청해주세요. 서버가 응답할 수 없습니다.", "assistant");
      return;
    }
    query.value = "";
    const result: any = data.value;
    addMessage(result["content"], "assistant");
    chatId.value = result["chatId"];
    load.value = false;
  };

  const addMessage = (content: string, role: string) => {
    item.value.messages.push({
      content: replaceCodeFences(content),
      role: role
    });
  };

  return { query, load, item, question, answer, clear, clearAll, startNewChatWithId };
});
