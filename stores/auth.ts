import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const course = ref("");
    const name = ref("");

    const isInvalid = () => {
      return !course.value || !name.value;
    };

    const login = async () => {
      if (isInvalid()) {
        return;
      }

      const body = {
        name: name.value,
        course: course.value,
      };

      const { error } = await useFetch(
        useRuntimeConfig().public.baseUrl + "/members",
        {
          body: body,
          method: "POST",
        }
      );

      return error;
    };

    return { course, name, isInvalid, login };
  },
  { persist: true }
);
