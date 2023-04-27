<template>
  <div>
    <v-container>
      <div class="pa-4">
        <v-chip-group selected-class="text-secondary" column>
          <v-chip v-for="tag in COURSE" :key="tag">
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
              <v-card-subtitle>{{ chat.createdAt }}</v-card-subtitle>
            </v-card-item>
            <v-card-text overflow-hidden class="text-medium-emphasis">
              {{ chat.body }}
            </v-card-text>
            <v-divider></v-divider>
            <div class="d-flex mr-4 align-center">
              <v-chip
                class="ma-2"
                color="secondary"
                text-color="white"
                prepend-icon="mdi-account-circle"
              >
                {{ chat.name }}
              </v-chip>
              <v-chip
                class="ma-2"
                :class="{
                  'text-info': chat.course == '프론트엔드',
                  'text-success': chat.course == '백엔드',
                  'text-primary': chat.course == '안드로이드',
                }"
                text-color="white"
                prepend-icon="mdi-crosshairs"
              >
                {{ chat.course }}
              </v-chip>
              <v-spacer></v-spacer>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useItemsStore } from "~/stores/items";
import { COURSE } from "~~/models/member/course";
import Tiptap from "~/components/Tiptap.vue";

const itemsStore = useItemsStore();
</script>
