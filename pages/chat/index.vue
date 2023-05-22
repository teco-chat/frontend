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
          <v-card :to="'/chat/' + chat.id" align="left" min-height="240px">
            <div class="d-flex mr-4 align-center">
              <v-chip
                v-if="chat.course == 'BACKEND'"
                class="ma-2"
                color="success"
                text-color="white"
                prepend-icon="mdi-language-java"
                variant="outlined"
              >
                {{ chat.crewName }}
              </v-chip>
              <v-chip
                v-if="chat.course == 'FRONTEND'"
                class="ma-2"
                color="info"
                text-color="white"
                prepend-icon="mdi-language-typescript"
                variant="outlined"
              >
                {{ chat.crewName }}
              </v-chip>
              <v-chip
                v-if="chat.course == 'ANDROID'"
                class="ma-2"
                color="primary"
                text-color="white"
                prepend-icon="mdi-language-kotlin"
                variant="outlined"
              >
                {{ chat.crewName }}
              </v-chip>
              <v-spacer></v-spacer>
            </div>
            <v-card-item>
              <v-card-title>{{ chat.title }}</v-card-title>
              <v-card-subtitle>{{
                parseDateTimeFormat(chat.createdAt)
              }}</v-card-subtitle>
            </v-card-item>
            <chipdiv v-for="keyword in chat.keywords" :key="keyword">
              <v-chip
                size="small"
                class="ma-2"
                color="warning"
                label
                variant="outlined"
              >
                {{ "#" + keywordShortener(keyword.keyword) }}
              </v-chip>
            </chipdiv>
            <v-card-actions class="card-actions">
              <v-list-item class="w-100">
                <template v-slot:append>
                  <div class="justify-self-end">
                    <v-icon
                      class="me-2"
                      icon="mdi-robot-confused-outline"
                    ></v-icon>
                    <span class="subheading me-4">{{
                      chat.totalQnaCount
                    }}</span>
                    <v-icon
                      class="me-2"
                      icon="mdi-comment-text-outline"
                    ></v-icon>
                    <span class="subheading me-4">{{ chat.commentCount }}</span>
                    <v-icon
                      class="me-2"
                      color="error"
                      icon="mdi-heart-outline"
                    ></v-icon>
                    <span class="subheading">{{ chat.likeCount }}</span>
                  </div>
                </template>
              </v-list-item>
            </v-card-actions>
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
import { useChatLikeStore } from "~/stores/chat-like";
import { COURSE } from "~/models/courseWithAll";
import { parseDateTimeFormat } from "~~/utils/date";
import { keywordShortener } from "~~/utils/keyword";
import Tiptap from "~/components/Tiptap.vue";

const isIntersect = ref(false);
const itemsStore = useItemsStore();
const searchStore = useSearchStore();
const chatLikeStore = useChatLikeStore();

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

<style scoped>
.card-actions {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
