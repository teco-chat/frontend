import { defineStore } from "pinia";
import { COURSE } from "~/models/member/course";

export const useSearchStore = defineStore("search", () => {
  const courseIndex = ref(0);
  const course = [COURSE.ALL, COURSE.BE, COURSE.FE, COURSE.AD];

  return { courseIndex }
});