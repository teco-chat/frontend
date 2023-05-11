import { defineStore } from "pinia";
import { replaceCodeFences } from "~~/utils/code";
import { useAuthStore } from "./auth";

export const useItemStore = defineStore("item", () => {
  const item = ref();
  const load = ref(false);

  const searchById = async (id: string) => {
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

    const result: any = data;
    item.value = result.value;
    for (let i = 0; i < item.value.messages.length; i++) {
      item.value.messages[i].content = replaceCodeFences(
        item.value.messages[i].content
      );
    }
    load.value = false;
  };

  const like = async () => {
    if (item.value["isAlreadyClickLike"]) {
      item.value["likeCount"] -= 1;
      item.value["isAlreadyClickLike"] = false;
    } else {
      item.value["likeCount"] += 1;
      item.value["isAlreadyClickLike"] = true;
    }
  }

  return { item, like, searchById };
});
