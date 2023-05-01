<template>
  <div>
    <v-container align="center">
      <v-card align="left" max-width="640px">
        <v-card-item>
          <v-card-title>{{ itemStore.item.title }}</v-card-title>
          <v-card-subtitle>{{
            parse(itemStore.item.createdAt)
          }}</v-card-subtitle>
          <v-chip
            class="ma-2"
            color="secondary"
            text-color="white"
            prepend-icon="mdi-account-circle"
          >
            {{ itemStore.item.crewName }}
          </v-chip>
          <v-chip
            v-if="itemStore.item.course == 'BACKEND'"
            class="ma-2"
            color="success"
            text-color="white"
            prepend-icon="mdi-language-java"
          >
            백엔드
          </v-chip>
          <v-chip
            v-if="itemStore.item.course == 'FRONTEND'"
            class="ma-2"
            color="info"
            text-color="white"
            prepend-icon="mdi-language-typescript"
          >
            프론트엔드
          </v-chip>
          <v-chip
            v-if="itemStore.item.course == 'ANDROID'"
            class="ma-2"
            color="primary"
            text-color="white"
            prepend-icon="mdi-language-kotlin"
          >
            안드로이드
          </v-chip>
        </v-card-item>
      </v-card>
      <br />
      <div v-for="message in itemStore.item.messages" :key="message.id">
        <v-card align="left" max-width="640px">
          <v-card-item>
            <v-card-subtitle v-if="message.role == 'user'"
              >{{ itemStore.item.crewName }}의 질문</v-card-subtitle
            >
            <v-card-subtitle v-if="message.role != 'user'"
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
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { useItemStore } from "~/stores/item";
import Tiptap from "~/components/Tiptap.vue";

const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "short",
  timeStyle: "short",
});

const parse = (time: any) => {
  const date = new Date(time);
  return dateTimeFormat.format(date);
};

const itemStore = useItemStore();
await itemStore.getItem(useRoute().params.id.toString());
</script>

<style></style>
