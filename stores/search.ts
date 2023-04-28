import { defineStore } from "pinia";
import { COURSE } from "~/models/member/courseQuery";
import { useItemsStore } from "./items";

export const useSearchStore = defineStore("search", () => {
  const courseIndex = ref(0);
  const page = ref(0);
  const course = [COURSE.ALL, COURSE.BE, COURSE.FE, COURSE.AD];

  const searchNext = async () => {
    const itemsStore = useItemsStore();
  }
  return { courseIndex, searchNext }
});