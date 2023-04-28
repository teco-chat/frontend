import { defineStore } from "pinia";

export const useItemStore = defineStore("item", () => {
  const item = ref();
  const load = ref(false);

  const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const getItem = async (id: string) => {
    if (load.value) {
      return;
    }
    load.value = true;
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chats/" + id
    );

    const result: any = data;
    item.value = result.value;
    load.value = false;
  };

  return { item, getItem };
});
