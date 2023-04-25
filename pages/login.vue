<template>
  <div>
    <v-container>
      <v-item-group selected-class="bg-success">
        <h3>분야를 선택해주세요.</h3>
        <v-row>
          <v-col v-for="course in COURSE" :key="course" cols="12" md="4">
            <v-item v-slot="{ selectedClass, toggle }">
              <v-card
                :color="auth.course == course.value ? 'success' : ''"
                :class="['d-flex align-center', selectedClass]"
                dark
                height="100"
                @click="select(toggle, course.value)"
              >
                <div class="text-h3 flex-grow-1 text-center">
                  {{ course.key }}
                </div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~~/stores/auth";

const auth = useAuthStore();

const COURSE = {
  BE: {
    key: "백엔드",
    value: "backend",
  },
  FE: {
    key: "프론트엔드",
    value: "frontend",
  },
  AD: {
    key: "안드로이드",
    value: "android",
  },
} as const;

const select = (toggle: any, selectedCourse: string) => {
  toggle();
  auth.course = selectedCourse;
};
</script>

<style scoped>
* {
  font-family: "IBM Plex Sans KR", Arial, Verdana, Tahoma, sans-serif;
}
</style>
