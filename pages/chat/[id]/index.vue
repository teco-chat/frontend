<template>
  <div>
    <v-container align="center">
      <v-card align="left" max-width="640px">
        <v-card-item>
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
          <div class="ma-2">
          <v-card-title>{{ itemStore.item.title }}</v-card-title>
          <v-card-subtitle>{{
            parseDateTimeFormat(itemStore.item.createdAt)
          }}</v-card-subtitle>
          </div>
          <chipdiv v-for="keyword in itemStore.item.keywords" :key="keyword">
            <v-chip size="small" class="ma-2" color="warning" label>
              {{ '#' + keyword.keyword }}
            </v-chip>
          </chipdiv>
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
              >Chat-GPT의 답변</v-card-subtitle
            >
            <v-card-text>
              <Tiptap v-model="message.content"></Tiptap
            ></v-card-text>
          </v-card-item>
          <v-divider></v-divider>
        </v-card>
        <br />
      </div>
      <br />
      <v-card align="center" max-width="640px" variant="text">
        <v-divider></v-divider>
        <v-btn
          size="small"
          color="error"
          variant="text"
          :icon="likeIcon"
          @click="like"
        ></v-btn>
        <br />
        {{ itemStore.item.likeCount }}
      </v-card>
      <v-card align="left" max-width="640px" variant="text">
        <br />
        <b>댓글 총 {{ commentStore.item.length }}개 </b>
        <br />
      </v-card>
      <br />
      <div v-for="comment in commentStore.item" :key="comment.id">
        <v-card align="left" max-width="640px" variant="outlined">
          <v-card-item>
            <v-card-subtitle>
              <b>{{ comment.crewName }}</b>
              &nbsp; &nbsp;
              {{ parseDateTimeFormat(comment.createdAt) }}
            </v-card-subtitle>
            <template
              v-if="useAuthStore().name == comment.crewName"
              v-slot:append
            >
              <v-icon
                size="small"
                color="error"
                icon="mdi-minus-circle"
                @click="commentStore.remove(comment.id)"
              ></v-icon>
            </template>
            <v-card-text>
              <Tiptap v-model="comment.content"></Tiptap></v-card-text
          ></v-card-item>
        </v-card>
        <br />
      </div>
      <v-card align="left" max-width="640px" variant="outlined">
        <v-textarea
          v-model="commentStore.text"
          variant="solo"
          label="댓글을 입력해주세요."
          append-inner-icon="mdi-arrow-right"
          clearable
          clear-icon="mdi-close-circle"
          hide-details
          @click:append-inner="addComment"
          @keydown.enter.exact.prevent="addComment"
          @keydown.enter.shift.prevent="appendNewLine"
        >
        </v-textarea>
      </v-card>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { useItemStore } from "~/stores/item";
import { useAuthStore } from "~/stores/auth";
import { useCommentStore } from "~/stores/comment";
import { useChatLikeStore } from "~/stores/chat-like";
import Tiptap from "~/components/Tiptap.vue";
import { parseDateTimeFormat } from "~~/utils/date";
import { scrollToBottom } from "~~/utils/window";
import { useChatStore } from "~/stores/chat";

const itemStore = useItemStore();
await itemStore.searchById(useRoute().params.id.toString());
const commentStore = useCommentStore();
await commentStore.searchByChatId(useRoute().params.id.toString());
const chatLikeStore = useChatLikeStore();
const likeIcon = ref(
  itemStore.item.isAlreadyClickLike ? "mdi-heart" : "mdi-heart-outline"
);

const addComment = async () => {
  await commentStore.add(useRoute().params.id.toString());
  scrollToBottom();
};

const appendNewLine = (event: any) => {
  if (event.isComposing) {
    event.stopPropagation();
  } else if (event.shiftKey) {
    commentStore.text += "\n";
  }
};

const like = async () => {
  await chatLikeStore.like(useRoute().params.id.toString());
  await itemStore.like();
  likeIcon.value = itemStore.item.isAlreadyClickLike
    ? "mdi-heart"
    : "mdi-heart-outline";
};
</script>

<style></style>
