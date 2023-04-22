<template>
  <div>
    <v-container>
      <h1>안녕하세요.</h1>
      <h1>우아한테크코스 크루들을 위한 Chat-GPT 서비스입니다.</h1>
      <br />
      <v-text-field
        v-model="chatStore.query"
        density="compact"
        variant="solo"
        label="질문을 입력해주세요."
        append-inner-icon="mdi-arrow-right"
        single-line
        clearable
        clear-icon="mdi-close-circle"
        hide-details
        @click:append-inner="chat"
        @click:clear="chatStore.clear"
        @keypress.enter="chat"
      ></v-text-field>
      <br />
      <v-card v-if="chatStore.result != ''">
        <v-card-text>
          {{ chatStore.result }}
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useChatStore } from "~~/stores/chat";

const chatStore = useChatStore();

const chat = async () => {
  chatStore.chat();
};
</script>

<style scoped>
* {
  font-family: "IBM Plex Sans KR", Arial, Verdana, Tahoma, sans-serif;
}
</style>
