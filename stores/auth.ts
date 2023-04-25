import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const course = ref("");
    const name = ref("");

    const isInvalid = () => {
      return !course.value && !name.value;
    };

    return { course, name, isInvalid };
  },
  { persist: true }
);


