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
      <v-btn variant="text" align="left" to="/trend">요즘 뜨는 채팅</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        @click="navigateTo('/like')"
        icon="mdi-heart-outline"
        color="red"
      ></v-btn>
      <v-btn @click="toggleTheme" :icon="commentStore.icon"></v-btn>
      <v-btn variant="text" icon="mdi-account-outline">
        <v-icon>mdi-account-outline</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item @click="navigateTo('/member')">
              <v-list-item-title>
                <v-icon icon="mdi-account-edit-outline"></v-icon>
                정보 수정
              </v-list-item-title>
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
import { useCommonStore } from "~/stores/common";

const commentStore = useCommonStore();
const theme = useTheme();
theme.global.name.value = commentStore.theme;

const toggleTheme = () => {
  commentStore.toggle();
  theme.global.name.value = commentStore.theme;
};
</script>

<style scoped>
.dohyeon {
  font-family: "Do Hyeon", Arial, Verdana, Tahoma, sans-serif;
}
</style>
