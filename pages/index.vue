<template>
  <div>
    <v-container>
      <h1>안녕하세요.</h1>
      <h1>우아한테크코스 크루들을 위한 Chat-GPT 서비스입니다.</h1>
      <h5>
        현재 백엔드를 구현하지 않아 무료 버전을 사용함으로 API 사용제한에 의해
        답변이 출력되지 않을 수 있습니다.
      </h5>
      <h5>또한 현재 답변을 한 번에 반환하기 때문에 로딩이 느릴 수 있습니다.</h5>
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
        ><template v-slot:loader>
          <v-progress-linear
            :active="chatStore.load"
            :model-value="progress"
            absolute
            height="4"
            indeterminate
          ></v-progress-linear> </template
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
