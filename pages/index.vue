<template>
  <div>
    <v-container class="justify-center">
      <h1>안녕하세요.</h1>
      <h1>우아한테크코스 크루들을 위한 Chat-GPT 서비스입니다.</h1>
      <br />
      <div v-for="message in chatStore.result" :key="message.id">
        <v-card align="left">
          <v-card-item>
            <v-card-subtitle v-if="message.role == 'USER'"
              >{{ authStore.name }}의 질문</v-card-subtitle
            >
            <v-card-subtitle v-if="message.role != 'USER'"
              >Chat-GPT의 응답</v-card-subtitle
            >
            <v-card-text>
              <Tiptap v-model="message.content"></Tiptap
            ></v-card-text>
          </v-card-item>
          <v-divider></v-divider>
        </v-card>
        <br />
      </div>
      <v-app-bar height="100" flat location="bottom">
        <v-container class="justify-center">
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
            ><template v-slot:loader>
              <v-progress-linear
                :active="chatStore.load"
                :model-value="progress"
                absolute
                height="4"
                indeterminate
              ></v-progress-linear> </template
          ></v-text-field>
        </v-container>
      </v-app-bar>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useChatStore } from "~~/stores/chat";
import Tiptap from "~/components/Tiptap.vue";
import { useAuthStore } from "~/stores/auth";

const chatStore = useChatStore();
const authStore = useAuthStore();

const chat = async () => {
  await chatStore.chat();
};
</script>

<style scoped>
* {
  font-family: "IBM Plex Sans KR", Arial, Verdana, Tahoma, sans-serif;
}
</style>
