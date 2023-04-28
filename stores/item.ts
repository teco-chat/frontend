import { defineStore } from "pinia";

export const useItemStore = defineStore("item", () => {
  const item = ref();

  const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return { item };
});
