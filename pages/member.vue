<template>
  <div>
    <v-container align="center">
      <v-card align="left" max-width="800px">
        <v-card-item>
          <h3>
            <v-icon class="me-2" icon="mdi-xml"></v-icon>과정을 선택해주세요.
          </h3>
          <br />
          <v-chip-group mandatory v-model="authStore.courseIndex">
            <v-chip
              class="ma-2"
              color="success"
              text-color="white"
              prepend-icon="mdi-language-java"
              variant="outlined"
            >
              백엔드
            </v-chip>
            <v-chip
              class="ma-2"
              color="info"
              text-color="white"
              prepend-icon="mdi-language-typescript"
              variant="outlined"
            >
              프론트엔드
            </v-chip>
            <v-chip
              class="ma-2"
              color="primary"
              text-color="white"
              prepend-icon="mdi-language-kotlin"
              variant="outlined"
            >
              안드로이드
            </v-chip>
          </v-chip-group>
        </v-card-item>
        <v-card-item>
          <h3>
            <v-icon class="me-2" icon="mdi-account-outline"></v-icon>닉네임을
            입력해주세요.
          </h3>
          <br />
          <v-text-field
            v-model="authStore.name"
            :label="nameLabel"
            hide-details
            variant="outlined"
            @click:append-inner="login"
            @keypress.enter="login"
          ></v-text-field>
          <br />
        </v-card-item>
        <v-card-item align="right">
            <v-btn variant="outlined" color="success" @click="login"
              ><h2>완료</h2></v-btn
            >
        </v-card-item>
        <v-divider></v-divider>
      </v-card>
      <v-snackbar v-model="loginAlert" location="bottom"
        >과정과 닉네임을 입력해주세요.
        <template v-slot:actions>
          <v-btn color="error" @click="loginAlert = false"> 닫기 </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~~/stores/auth";
import { COURSE } from "~~/models/course";

const randomLabel = ["음식을", "색상을", "과일을", "과자를", "브랜드를"];
const generateNameLabel = () => {
  var label = randomLabel[Math.floor(Math.random() * randomLabel.length)];
  return "익명을 원한다면 좋아하는 " + label + " 입력해보는건 어떨까요?";
};

const authStore = useAuthStore();
const loginAlert = ref(false);

const nameLabel = ref(generateNameLabel());

const login = async () => {
  if (authStore.isInvalidCredential()) {
    loginAlert.value = true;
  }
  const error = await authStore.login();

  if (error?.value) {
    loginAlert.value = true;
    return;
  }
  navigateTo("/");
};
</script>

<style scoped>
* {
  font-family: "IBM Plex Sans KR", Arial, Verdana, Tahoma, sans-serif;
}
</style>
