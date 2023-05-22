import { defineStore } from "pinia";
import { TREND } from "~/models/trend";

export const useTrendStore = defineStore("trend", () => {
  const items: any = ref([]);
  const page = ref(0);
  const load = ref(false);
  const trendIndex = ref(0);
  const trend = [TREND.TODAY, TREND.WEEK, TREND.MONTH, TREND.YEAR, TREND.ALL];

  const searchNext = async () => {
    if (load.value) {
      return;
    }
    load.value = true;
    const param = "?page=" + page.value + "&size=30&likeCond=" + trend[trendIndex.value].value;
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chats" + param,
      {
        headers: {
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

  return { items, trendIndex, searchNext, clear };
});
