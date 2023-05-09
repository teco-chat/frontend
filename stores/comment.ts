import { defineStore } from "pinia";
import { replaceCodeFences } from "~~/utils/code";
import { useAuthStore } from "./auth";

export const useCommentStore = defineStore("comment", () => {
  const item = ref();
  const load = ref(false);

  const clearAll = async () => {
    item.value = [];
    load.value = false;
  };

  const add = async (chatId: string, content: string) => {
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/comments",
      {
        headers: {
          name: useAuthStore().encodedName(),
        },
        method: "POST",
        body: {
          chatId: chatId,
          content: content,
        },
      }
    );
  };

  const remove = async (commentId: string) => {
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/comments/" + commentId,
      {
        headers: {
          name: useAuthStore().encodedName(),
        },
        method: "DELETE",
      }
    );
    item.value = item.value.filter((it: { id: string }) => it.id !== commentId);
  };

  const searchByChatId = async (chatId: string) => {
    if (load.value) {
      return;
    }
    load.value = true;
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/comments?chatId=" + chatId,
      {
        method: "GET",
      }
    );

    const result: any = data;
    item.value = result.value;
    for (let i = 0; i < item.value.length; i++) {
      item.value[i].content = replaceCodeFences(item.value[i].content);
    }
    load.value = false;
  };

  return { item, add, clearAll, remove, searchByChatId };
});
