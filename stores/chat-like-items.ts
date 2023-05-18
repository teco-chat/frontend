import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useItemsStore } from "./items";

export const useChatLikeItemsStore = defineStore("chat-like-items", () => {
  const items: any = ref([]);
  const page = ref(0);
  const load = ref(false);

  const searchNext = async () => {
    if (load.value) {
      return;
    }
    load.value = true;
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chat-likes",
      {
        headers: {
          name: useAuthStore().encodedName(),
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    const result: any = data;
    result.value.forEach((chat: any) => {
      items.value.push(chat);
    });
    load.value = false;
  };

  const clear = async () => {
    await useItemsStore().clear();
    page.value = 0;
  };

  return { items, searchNext, clear };
});
