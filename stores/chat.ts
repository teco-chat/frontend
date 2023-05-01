import { defineStore } from "pinia";
import { Message } from "~/models/chat/message";
import { ROLE } from "~/models/chat/role";
import { useAuthStore } from "./auth";

export const useChatStore = defineStore("chat", () => {
  const query = ref("");
  const result: any = ref([]);
  const load = ref(false);
  const chatId = ref(0);

  const clear = () => {
    query.value = "";
    load.value = false;
  };

  const clearAll = () => {
    query.value = "";
    load.value = false;
    result.value = [];
    chatId.value = 0;
  };

  const chat = async () => {
    if (load.value) {
      return;
    }
    load.value = true;

    addMessage(query.value, ROLE.USER);

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
      addMessage(
        "다시 요청해주세요. 서버가 응답할 수 없습니다.",
        ROLE.ASSISTANT
      );
      return;
    }

    const result: any = data.value;
    addMessage(result["content"], ROLE.ASSISTANT);
    chatId.value = result["chatId"];
    load.value = false;
  };

  const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const addMessage = (content: string, role: string) => {
    result.value.push(
      new Message(
        result.value.length + 1,
        replaceCodeFences(content),
        role,
        dateTimeFormat.format(Date.now())
      )
    );
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

  return { query, result, load, chat, clear, clearAll };
});
