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
              <v-card-subtitle>{{ parse(chat.createdAt) }}</v-card-subtitle>
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
                class="ma-2"
                :class="{
                  'text-info': chat.course == 'FRONTEND',
                  'text-success': chat.course == 'BACKEND',
                  'text-primary': chat.course == 'ANDROID',
                }"
                text-color="white"
                prepend-icon="mdi-crosshairs"
              >
                {{
                  chat.course == "BACKEND"
                    ? "백엔드"
                    : chat.course == "FRONTEND"
                    ? "프론트엔드"
                    : "안드로이드"
                }}
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
import Tiptap from "~/components/Tiptap.vue";

const isIntersect = ref(false);
const itemsStore = useItemsStore();
const searchStore = useSearchStore();
await searchStore.clear();
await searchStore.searchNext();

const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "short",
  timeStyle: "short",
});

const parse = (time: any) => {
  const date = new Date(time);
  return dateTimeFormat.format(date);
};

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
</script>
