<template>
  <v-layout>
    <v-app-bar flat>
      <v-app-bar-title class="title">우아GPT</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme" :icon="themeIcon"></v-btn>
    </v-app-bar>

    <v-main>
      <v-divider></v-divider>
      <slot />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { useTheme } from "vuetify";

const theme = useTheme();
const themeIcon = ref("mdi-weather-sunny");

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  themeIcon.value =
    themeIcon.value == "mdi-weather-night"
      ? "mdi-weather-sunny"
      : "mdi-weather-night";
};
</script>

<style scoped>
.title {
    font-family: "Do Hyeon", Arial, Verdana, Tahoma, sans-serif;
}
</style>