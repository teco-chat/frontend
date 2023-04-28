import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const course = ref("");
    const name = ref("");

    const isInvalid = () => {
      return !course.value || !name.value;
    };

    const encodedName = () => {
      const uriComponent = unescape(encodeURIComponent(name.value));
      return btoa(uriComponent);
    }
    
    const login = async () => {
      if (isInvalid()) {
        return;
      }

      const { error } = await useFetch(
        useRuntimeConfig().public.baseUrl + "/members",
        {
          body: {
            name: name.value,
            course: course.value,
          },
          method: "POST",
        }
      );

      return error;
    };

    return { course, name, isInvalid, login, encodedName };
  },
  { persist: true }
);
