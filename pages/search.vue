<template>
  <div>
    <v-container align="center">
      <v-text-field
        label="검색어를 입력해주세요."
        v-model="searchStore.query"
        hide-details
        variant="outlined"
        append-inner-icon="mdi-magnify"
        @click:append-inner="search"
        @keypress.enter="search"
      ></v-text-field>
      <br />
      <div class="resultText" v-if="searchStore.items.length != 0">
        "{{ searchStore.lastQuery }}"에 대한 {{ searchStore.items.length }}개의 채팅이 있어요.
      </div>
      <br>
      <div class="tung" v-if="searchStore.isEmpty()">
        <v-icon class="me-2" icon="mdi-robot-confused-outline"></v-icon>
      </div>
      <div class="tungText" v-if="searchStore.isEmpty()">
        검색 결과가 없어요!
      </div>
      <v-row>
        <v-col
          v-for="chat in searchStore.items"
          cols="12"
          sm="4"
          lg="4"
          xl="3"
          xxl="2"
          :key="chat.title"
        >
          <v-card :to="'/chats/' + chat.id" align="left" min-height="240px">
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
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import { useSearchStore } from "~/stores/search";

const searchStore = useSearchStore();
searchStore.clear();

const search = async () => {
  await searchStore.search();
};
</script>

<style scoped>
* {
  font-family: "IBM Plex Sans KR", Arial, Verdana, Tahoma, sans-serif;
}

.card-actions {
  position: absolute;
  bottom: 0;
  right: 0;
}

.tung {
  font-family: "Do Hyeon", Arial, Verdana, Tahoma, sans-serif;
  font-size: 250px;
  color: gray;
  text-align: center;
}

.tungText {
  font-family: "Do Hyeon", Arial, Verdana, Tahoma, sans-serif;
  font-size: 20px;
  color: gray;
  text-align: center;
}

.resultText {
  font-family: "Do Hyeon", Arial, Verdana, Tahoma, sans-serif;
  font-size: 20px;
  text-align: left;
}
</style>
