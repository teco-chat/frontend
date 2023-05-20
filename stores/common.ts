import { defineStore } from "pinia";

export const useCommonStore = defineStore(
  "common",
  () => {
    const theme = ref("light");
    const icon = ref("mdi-weather-sunny");

    const toggle = () => {
      theme.value = theme.value == "dark" ? "light" : "dark";
      icon.value =
        icon.value == "mdi-weather-night"
          ? "mdi-weather-sunny"
          : "mdi-weather-night";
    };

    return { theme, icon, toggle };
  },
  { persist: true }
);
