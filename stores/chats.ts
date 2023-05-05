import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useChatsStore = defineStore("chats", () => {
  const items: any = ref([]);
  const load = ref(false);
  const page = ref(0);

  const searchNext = async () => {
    if (load.value) {
      return;
    }
    load.value = true;
    const param =
      "?name=" + useAuthStore().name + "&page=" + page.value + "&size=15";
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chats" + param
    );

    const result: any = data;
    result.value["content"].forEach((chat: any) => {
      items.value.push(chat);
    });
    page.value += 1;
    load.value = false;
  };

  const clearAll = async () => {
    items.value = [];
    page.value = 0;
    load.value = false;
  };

  return { items, searchNext, clearAll };
});
