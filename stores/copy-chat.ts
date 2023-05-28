import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useCopyChatStore = defineStore("copy-chat", () => {
  const copy = async (id: any) => {
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chats/copy/" + id,
      {
        headers: {
          name: useAuthStore().encodedName(),
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    const result: any = data.value;
    return result["copiedChatId"];
  };

  return { copy };
});
