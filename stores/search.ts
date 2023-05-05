import { defineStore } from "pinia";
import { COURSE } from "~/models/member/courseWithAll";
import { useItemsStore } from "./items";

export const useSearchStore = defineStore("search", () => {
  const courseIndex = ref(0);
  const page = ref(0);
  const load = ref(false);
  const course = [COURSE.ALL, COURSE.BE, COURSE.FE, COURSE.AD];

  const searchNext = async () => {
    if (load.value) {
      return;
    }
    load.value = true;
    const param =
      "?course=" + course[courseIndex.value].value + "&page=" + page.value + "&size=30";
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chats" + param
    );

    const itemsStore = useItemsStore();
    const result: any = data;
    result.value["content"].forEach((chat: any) => {
      itemsStore.add(chat);
    });
    page.value += 1;
    load.value = false;
  };

  const clear = async () => {
    await useItemsStore().clear();
    page.value = 0;
  };

  return { courseIndex, searchNext, clear };
});
