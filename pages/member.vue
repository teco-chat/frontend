<template>
  <div>
    <v-container align="center">
      <v-card variant="solo" max-width="640px">
        <v-item-group selected-class="bg-secondary" mandatory>
          <h2>분야를 선택해주세요.</h2>
          <br />
          <v-row>
            <v-col v-for="course in COURSE" :key="course.value">
              <v-item v-slot="{ toggle }">
                <v-card
                  variant="outlined"
                  :class="[
                    'd-flex align-center',
                    { 'bg-secondary': course.value == authStore.course },
                  ]"
                  dark
                  height="100"
                  @click="select(toggle, course.value)"
                >
                  <div class="text-h5 flex-grow-1 text-center">
                    {{ course.key }}
                  </div>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
          <br /><br />
          <h2>닉네임을 입력해주세요.</h2>
          <br />
          <v-text-field
            v-model="authStore.name"
            label="닉네임"
            single-line
            hide-details
            variant="outlined"
            @click:append-inner="login"
            @keypress.enter="login"
          ></v-text-field>
          <br />
          <v-btn block variant="outlined" @click="login"
            ><h2>정보 입력하고 무료로 GPT 이용하기</h2></v-btn
          >
        </v-item-group>
      </v-card>
      <v-snackbar v-model="loginAlert" location="bottom"
        >로그인 실패
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

const authStore = useAuthStore();
const loginAlert = ref(false);

const select = (toggle: any, selectedCourse: string) => {
  toggle();
  authStore.course = selectedCourse;
};

const login = async () => {
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
