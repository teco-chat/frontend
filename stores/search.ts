import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", () => {
  const load = ref(false);
  const query = ref("");
  const items: any = ref([]);
  const isEmptyResult = ref(false);
  const lastQuery = ref("");

  const search = async () => {
    if (load.value) {
      return;
    }
    load.value = true;
    const param = "?title=" + query.value + "&size=50";
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chats" + param
    );

    lastQuery.value = query.value;
    items.value = [];
    query.value = "";
    isEmptyResult.value = true;
    const result: any = data;
    result.value["content"].forEach((chat: any) => {
      items.value.push(chat);
    });
    load.value = false;
  };

  const clear = async () => {
    items.value = [];
    query.value = "";
    lastQuery.value = "";
    isEmptyResult.value = false;
  };

  const isEmpty = () => {
    return isEmptyResult.value && items.value.length == 0;
  }

  return { items, query, lastQuery, search, clear, isEmpty };
});
