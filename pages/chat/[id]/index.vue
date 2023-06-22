<template>
  <div>
    <v-container align="center">
      <v-card align="left" max-width="800px">
        <v-card-item>
          <v-chip
            v-if="itemStore.item.course == 'BACKEND'"
            class="ma-2"
            color="success"
            text-color="white"
            prepend-icon="mdi-language-java"
            variant="outlined"
          >
            {{ itemStore.item.crewName }}
          </v-chip>
          <v-chip
            v-if="itemStore.item.course == 'FRONTEND'"
            class="ma-2"
            color="info"
            text-color="white"
            prepend-icon="mdi-language-typescript"
            variant="outlined"
          >
            {{ itemStore.item.crewName }}
          </v-chip>
          <v-chip
            v-if="itemStore.item.course == 'ANDROID'"
            class="ma-2"
            color="primary"
            text-color="white"
            prepend-icon="mdi-language-kotlin"
            variant="outlined"
          >
            {{ itemStore.item.crewName }}
          </v-chip>
          <div class="ma-2">
            <v-card-title>{{ itemStore.item.title }}</v-card-title>
            <v-card-subtitle>{{
              parseDateTimeFormat(itemStore.item.createdAt)
            }}</v-card-subtitle>
          </div>
          <chipdiv v-for="keyword in itemStore.item.keywords" :key="keyword">
            <v-chip
              size="small"
              class="ma-2"
              color="warning"
              label
              variant="outlined"
            >
              {{ "#" + keyword.keyword }}
            </v-chip>
          </chipdiv>
        </v-card-item>
      </v-card>
      <br />
      <div v-for="message in itemStore.item.messages" :key="message.id">
        <v-card align="left" max-width="800px">
          <v-card-item>
            <v-chip
              size="small"
              class="ma-2"
              text-color="white"
              prepend-icon="mdi-account-outline"
              variant="outlined"
              v-if="message.role == 'user'"
              label
            >
              {{ itemStore.item.crewName }}
            </v-chip>
            <v-chip
              size="small"
              class="ma-2"
              text-color="white"
              prepend-icon="mdi-robot-happy-outline"
              variant="outlined"
              v-if="message.role != 'user'"
              label
            >
              Chat-GPT
            </v-chip>
            <v-card-text>
              <Tiptap v-model="message.content"></Tiptap
            ></v-card-text>
          </v-card-item>
          <v-divider></v-divider>
        </v-card>
        <br />
      </div>
      <br />
      <v-card align="center" max-width="800px" variant="text">
        <v-snackbar :timeout="2000">
          <template v-slot:activator="{ props }">
            <v-btn
              variant="outlined"
              prepend-icon="mdi-link-variant"
              v-bind="props"
              >링크 복사
            </v-btn>
          </template>
          링크가 복사되었습니다.
        </v-snackbar>
        &nbsp;
        <v-tooltip location="top" align="center">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              color="error"
              variant="outlined"
              :prepend-icon="likeIcon"
              @click="like"
              >좋아요 {{ itemStore.item.likeCount }}</v-btn
            >
          </template>
          <span v-html="itemStore.likeCrewName()"></span>
        </v-tooltip>
        &nbsp;
        <v-btn
          color="success"
          variant="outlined"
          prepend-icon="mdi-content-copy"
          @click="copyAlert = true"
          v-if="authStore.isValidCredential()"
          >채팅 복사</v-btn
        >
      </v-card>
      <v-card align="left" max-width="800px" variant="text">
        <br />
        <b>댓글 총 {{ commentStore.item.length }}개 </b>
        <br />
      </v-card>
      <br />
      <div v-for="comment in commentStore.item" :key="comment.id">
        <v-card align="left" max-width="800px" variant="outlined">
          <v-card-item>
            <v-card-subtitle>
              <b>{{ comment.crewName }}</b>
              &nbsp; &nbsp;
              {{ parseDateTimeFormat(comment.createdAt) }}
            </v-card-subtitle>
            <template v-if="authStore.name == comment.crewName" v-slot:append>
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
      <v-card
        align="left"
        max-width="800px"
        variant="outlined"
        v-if="authStore.isValidCredential()"
      >
        <v-textarea
          v-model="commentStore.text"
          variant="solo"
          label="댓글을 입력해주세요. 줄바꿈은 Shift + Enter 입니다."
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
      <v-snackbar
        v-model="copyAlert"
        color="background"
        vertical
        location="center"
      >
        <div class="text-subtitle-1 pb-2">
          채팅 복사 후 GPT 사용화면으로 넘어갑니다.<br />
          복사하시겠습니까?
        </div>
        <template v-slot:actions>
          <v-btn
            variant="outlined"
            color="success"
            prepend-icon="mdi-content-copy"
            @click="copyChat"
            >복사</v-btn
          >
          &nbsp;
          <v-btn
            variant="outlined"
            color="error"
            prepend-icon="mdi-close"
            @click="copyAlert = false"
          >
            취소
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { useItemStore } from "~/stores/item";
import { useAuthStore } from "~/stores/auth";
import { useCommentStore } from "~/stores/comment";
import { useChatLikeStore } from "~/stores/chat-like";
import { useCopyChatStore } from "~/stores/copy-chat";
import Tiptap from "~/components/Tiptap.vue";
import { parseDateTimeFormat } from "~~/utils/date";
import { scrollToBottom } from "~~/utils/window";
import { useChatStore } from "~/stores/chat";

const copyAlert = ref(false);
const itemStore = useItemStore();
const authStore = useAuthStore();
await itemStore.searchById(useRoute().params.id.toString());
await itemStore.searchLikeCrewById(useRoute().params.id.toString());
const commentStore = useCommentStore();
await commentStore.searchByChatId(useRoute().params.id.toString());
const chatLikeStore = useChatLikeStore();
const copyChatStore = useCopyChatStore();
const likeIcon = ref(
  itemStore.item.isAlreadyClickLike ? "mdi-heart" : "mdi-heart-outline"
);

const copyChat = async () => {
  const id = await copyChatStore.copy(useRoute().params.id.toString());
  useChatStore().startNewChatWithId(id);
  navigateTo("/");
  scrollToBottom();
};

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
  if (authStore.isInvalidCredential()) {
    return;
  }
  await chatLikeStore.like(useRoute().params.id.toString());
  await itemStore.like();
  likeIcon.value = itemStore.item.isAlreadyClickLike
    ? "mdi-heart"
    : "mdi-heart-outline";
};
</script>

<style></style>
