import { defineStore } from "pinia";
import { COURSE } from "~/models/member/courseQuery";
import { useItemsStore } from "./items";

export const useSearchStore = defineStore("search", () => {
  const courseIndex = ref(0);
  const page = ref(0);
  const course = [COURSE.ALL, COURSE.BE, COURSE.FE, COURSE.AD];

  const searchNext = async () => {
    const param = "?course=" + course[courseIndex.value].value + "&page=" + page.value;
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chats" + param
    );

    const itemsStore = useItemsStore();
    const result: any = data;
    result.value["content"].forEach((chat: any) => {
      itemsStore.add(chat);
    });
    page.value += 1;
  };

  const clear = async () => {
    await useItemsStore().clear();
    page.value = 0;
  };

  return { courseIndex, searchNext, clear };
});
