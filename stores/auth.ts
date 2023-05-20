import { defineStore } from "pinia";
import { COURSE } from "~/models/course";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const courseIndex = ref(4);
    const name = ref("");
    const course = [COURSE.BE, COURSE.FE, COURSE.AD];

    const isInvalidCredential = () => {
      return courseIndex.value == 4 || !name.value;
    };

    const encodedName = () => {
      const uriComponent = unescape(encodeURIComponent(name.value));
      return btoa(uriComponent);
    };

    const login = async () => {
      if (isInvalidCredential()) {
        return;
      }

      const { error } = await useFetch(
        useRuntimeConfig().public.baseUrl + "/members",
        {
          body: {
            name: name.value,
            course: course[courseIndex.value].value,
          },
          method: "POST",
        }
      );

      return error;
    };

    return { courseIndex, name, isInvalidCredential, login, encodedName };
  },
  { persist: true }
);
