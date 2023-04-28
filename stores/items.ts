import { defineStore } from "pinia";

export const useItemsStore = defineStore("items", () => {
  const items: any = ref([]);

  const add = (item: any) => {
    items.value.push(item);
  };

  const clear = () => {
    items.value = [];
  };

  const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return { items, add, clear };
});
