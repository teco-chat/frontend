import { defineStore } from "pinia";
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

  const startWith = async (id: any) => {
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

  const chat = async () => {
    if (load.value || query.value == "") {
      return;
    }
    load.value = true;

    addMessage(query.value, "user");

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
    query.value = "";

    if (error.value) {
      load.value = false;
      addMessage("다시 요청해주세요. 서버가 응답할 수 없습니다.", "assistant");
      return;
    }

    const result: any = data.value;
    addMessage(result["content"], "assistant");
    chatId.value = result["chatId"];
    load.value = false;
  };

  const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const addMessage = (content: string, role: string) => {
    item.value.messages.push({
      content: replaceCodeFences(content),
      role: role,
      createdAt: dateTimeFormat.format(Date.now()),
    });
  };

  const replaceCodeFences = (input: String) => {
    const codeFencesRegex = /```([\w-]*)\n([\s\S]*?)\n```/g;
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(codeFencesRegex, (match, p1, p2) => {
        const languageClass = p1 ? ` class="language-${p1}"` : "";
        return `<pre><code${languageClass}>${p2}</code></pre>`;
      })
      .replace(/\n/g, "<br>");
  };

  return { query, item, load, chat, clear, clearAll, startWith };
});
