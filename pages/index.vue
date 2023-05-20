<template>
  <div>
    <v-container class="justify-center">
      <h1>안녕하세요.</h1>
      <h1>우아한테크코스 크루들을 위한 Chat-GPT 서비스입니다.</h1>
      <br />
      <div v-for="message in chatStore.item.messages" :key="message.id">
        <v-card align="left">
          <v-card-item>
            <v-card-subtitle v-if="message.role == 'user'">
              <v-icon class="me-2" icon="mdi-account-outline"></v-icon>
              {{ authStore.name }}</v-card-subtitle
            >
            <v-card-subtitle v-if="message.role != 'user'"
              ><v-icon class="me-2" icon="mdi-robot-happy-outline"></v-icon>
              Chat-GPT</v-card-subtitle
            >
            <v-card-text>
              <Tiptap v-model="message.content"></Tiptap
            ></v-card-text>
          </v-card-item>
          <v-divider></v-divider>
        </v-card>
        <br />
      </div>
      <v-navigation-drawer expand-on-hover rail permanent>
        <v-list>
          <v-list-item
            prepend-icon="mdi-plus"
            title="새로운 채팅 시작하기"
            @click="clearAll"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-menu" title="나의 채팅"> </v-list-item>
          <div v-for="item in chatsStore.items" :key="item.id">
            <v-list-item
              class="py-2"
              prepend-icon="mdi-empty"
              :title="item.title"
              :subtitle="parseDateTimeFormat(item.createdAt)"
              @click="start(item.id)"
            >
            </v-list-item>
          </div>
          <v-list-item
            prepend-icon="mdi-chevron-down"
            title="추가로 불러오기"
            @click="searchNext"
          >
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </v-navigation-drawer>
      <v-app-bar height="200" flat location="bottom" color="background">
        <v-container class="justify-center">
          <v-textarea
            v-model="chatStore.query"
            variant="solo"
            label="질문을 입력해주세요. 줄바꿈은 Shift + Enter 입니다."
            append-inner-icon="mdi-arrow-right"
            clearable
            clear-icon="mdi-close-circle"
            hide-details
            @click:append-inner="chat"
            @click:clear="chatStore.clear"
            @keydown.enter.exact.prevent="chat"
            @keydown.enter.shift.prevent="appendNewLine"
            ><template v-slot:loader>
              <v-progress-linear
                :active="chatStore.load"
                :model-value="progress"
                absolute
                height="4"
                indeterminate
              ></v-progress-linear> </template
          ></v-textarea>
        </v-container>
      </v-app-bar>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useChatStore } from "~~/stores/chat";
import { useChatsStore } from "~~/stores/chats";
import Tiptap from "~/components/Tiptap.vue";
import { useAuthStore } from "~/stores/auth";
import { parseDateTimeFormat } from "~~/utils/date";
import { scrollToBottom } from "~~/utils/window";

const chatStore = useChatStore();
const authStore = useAuthStore();
const chatsStore = useChatsStore();

const chat = async () => {
  await chatStore.question();
  scrollToBottom();
  await chatStore.answer();
  scrollToBottom();
};

const start = async (id: any) => {
  chatStore.clearAll();
  await chatStore.startNewChatWithId(id);
  chatsStore.clearAll();
  await chatsStore.searchNext();
  scrollToBottom();
};

const clearAll = async () => {
  chatStore.clearAll();
  chatsStore.clearAll();
  await chatsStore.searchNext();
};

const clearChatsStore = async () => {
  chatsStore.clearAll();
  await chatsStore.searchNext();
  scrollToBottom();
};

const searchNext = async () => {
  await chatsStore.searchNext();
};

const appendNewLine = (event: any) => {
  if (event.isComposing) {
    event.stopPropagation();
  } else if (event.shiftKey) {
    chatStore.query += "\n";
  }
};

clearChatsStore();
</script>

<style scoped>
* {
  font-family: "IBM Plex Sans KR", Arial, Verdana, Tahoma, sans-serif;
}
</style>
