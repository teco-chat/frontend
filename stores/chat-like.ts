import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useChatLikeStore = defineStore("chat-like", () => {
  const like = async (id: any) => {
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chat-likes",
      {
        headers: {
          name: useAuthStore().encodedName(),
          "Content-Type": "application/json",
        },
        method: "POST",
        body: {
          chatId: id,
        },
      }
    );
  };

  return { like };
});
