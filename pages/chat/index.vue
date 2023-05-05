<template>
  <div>
    <v-container>
      <div class="pa-4">
        <v-chip-group
          selected-class="text-secondary"
          column
          v-model="searchStore.courseIndex"
          mandatory
        >
          <v-chip
            v-for="tag in COURSE"
            :key="tag"
            filter
            @click="clearAndSearch"
          >
            {{ tag.key }}
          </v-chip>
        </v-chip-group>
      </div>
      <v-row>
        <v-col
          v-for="chat in itemsStore.items"
          cols="12"
          sm="4"
          lg="4"
          xl="3"
          xxl="2"
          :key="chat.title"
        >
          <v-card :to="'/chat/' + chat.id" align="left">
            <v-card-item>
              <v-card-title>{{ chat.title }}</v-card-title>
              <v-card-subtitle>{{ parseDateTimeFormat(chat.createdAt) }}</v-card-subtitle>
            </v-card-item>
            <v-divider></v-divider>
            <div class="d-flex mr-4 align-center">
              <v-chip
                class="ma-2"
                color="secondary"
                text-color="white"
                prepend-icon="mdi-account-circle"
              >
                {{ chat.crewName }}
              </v-chip>
              <v-chip
                v-if="chat.course == 'BACKEND'"
                class="ma-2"
                color="success"
                text-color="white"
                prepend-icon="mdi-language-java"
              >
                백엔드
              </v-chip>
              <v-chip
                v-if="chat.course == 'FRONTEND'"
                class="ma-2"
                color="info"
                text-color="white"
                prepend-icon="mdi-language-typescript"
              >
                프론트엔드
              </v-chip>
              <v-chip
                v-if="chat.course == 'ANDROID'"
                class="ma-2"
                color="primary"
                text-color="white"
                prepend-icon="mdi-language-kotlin"
              >
                안드로이드
              </v-chip>
              <v-spacer></v-spacer>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-card v-intersect="searchNext"></v-card>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useItemsStore } from "~/stores/items";
import { useSearchStore } from "~/stores/search";
import { COURSE } from "~~/models/member/courseQuery";
import { parseDateTimeFormat } from "~~/utils/date"
import Tiptap from "~/components/Tiptap.vue";

const isIntersect = ref(false);
const itemsStore = useItemsStore();
const searchStore = useSearchStore();

const searchNext = async () => {
  if (isIntersect.value) {
    return;
  }
  isIntersect.value = true;
  await searchStore.searchNext();
  isIntersect.value = false;
};

const clearAndSearch = async () => {
  await searchStore.clear();
  await searchStore.searchNext();
};

clearAndSearch();
</script>
