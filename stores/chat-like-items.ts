import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useChatLikeItemsStore = defineStore("chat-like-items", () => {
  const items: any = ref([]);
  const page = ref(0);
  const load = ref(false);

  const searchNext = async () => {
    if (load.value) {
      return;
    }
    load.value = true;
    const param = "?page=" + page.value + "&size=30";
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chat-likes" + param,
      {
        headers: {
          name: useAuthStore().encodedName(),
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    const result: any = data;
    result.value["content"].forEach((chat: any) => {
      items.value.push(chat);
    });
    page.value += 1;
    load.value = false;
  };

  const clear = async () => {
    items.value = [];
    page.value = 0;
  };

  return { items, searchNext, clear };
});
