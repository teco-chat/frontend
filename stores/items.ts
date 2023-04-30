import { defineStore } from "pinia";

export const useItemsStore = defineStore("items", () => {
  const items: any = ref([]);

  const add = (item: any) => {
    items.value.push(item);
  };

  const clear = () => {
    items.value = [];
  };

  return { items, add, clear };
});
