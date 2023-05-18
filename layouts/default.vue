<template>
  <div>
    <Head>
      <Title>테코GPT</Title>
    </Head>
  </div>
  <v-layout>
    <v-app-bar flat class="dohyeon">
      <v-btn @click="navigateTo('/')"><h2>테코GPT</h2></v-btn>
      <v-btn variant="text" align="left" to="/chat">채팅 목록</v-btn>
      <v-btn variant="text" align="left" to="/like">내가 좋아요한 채팅 목록</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme" :icon="themeIcon"></v-btn>
      <v-btn variant="text" icon="mdi-account-outline">
        <v-icon>mdi-account-outline</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item @click="navigateTo('/member')">
              <v-list-item-title>정보 수정</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
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

const member = () => {
  navigateTo("/member");
};
</script>

<style scoped>
.dohyeon {
  font-family: "Do Hyeon", Arial, Verdana, Tahoma, sans-serif;
}
</style>
