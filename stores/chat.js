import { defineStore } from "pinia";
import { codeFencesRegex, replaceCodeFences } from "~~/utils/code";
import { scrollToBottom } from "~~/utils/window";
import { useAuthStore } from "./auth";

export const useChatStore = defineStore("chat", () => {
  const query = ref("");
  const item = ref({ messages: [] });
  const load = ref(false);
  const chatId = ref(0);
  let ws;
  const SOCKET_END = "[DONE] - ID:";

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

  const streamChat = async () => {
    if (!load.value) {
      load.value = true;
      addMessage("", "assistant");
      const url = chatId.value == 0 ? "/stream/chats" : "/stream/chats/" + chatId.value;
      const queryString = "?name=" + useAuthStore().encodedName();
      ws = new WebSocket(useRuntimeConfig().public.wsUrl + url + queryString);
    }
    
    ws.onopen = (event) => {
      ws.send(query.value);
      query.value = "";
    }
    
    ws.onmessage = function (event) {
      let result = '' + event.data;
      if (result.startsWith(SOCKET_END)) {
        chatId.value = parseInt(result.replace(SOCKET_END, ''));
      } else {
        item.value.messages[lastIndexOfMessages()].content += result;
        if (item.value.messages[lastIndexOfMessages()].content.match(codeFencesRegex)) {
          item.value.messages[lastIndexOfMessages()].content = replaceCodeFences(
            item.value.messages[lastIndexOfMessages()].content
          );
        }
      }
    }
    
    ws.onclose = (event) => {
      load.value = false;
      item.value.messages[lastIndexOfMessages()].content = replaceCodeFences(
        item.value.messages[lastIndexOfMessages()].content
      );
      scrollToBottom();
    }
  }

  const lastIndexOfMessages = () => item.value.messages.length - 1;

  const startNewChatWithId = async (id) => {
    if (load.value) {
      return;
    }
    load.value = true;
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chats/" + id,
      {
        headers: {
          name: useAuthStore().encodedName(),
          "Content-Type": "application/json"
        },
        method: "GET",
      }
    );

    const result = data;
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
    await streamChat();
  };

  const addMessage = (content, role) => {
    item.value.messages.push({
      content: replaceCodeFences(content),
      role: role
    });
  };

  return { query, load, item, question, answer, clear, clearAll, startNewChatWithId };
});
