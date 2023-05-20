import { defineStore } from "pinia";
import { replaceCodeFences } from "~~/utils/code";
import { useAuthStore } from "./auth";

export const useItemStore = defineStore("item", () => {
  const item = ref();
  const likeCrew: any = ref([]);
  const load = ref(false);

  const likeCrewName = () => {
    if (likeCrew.value.length == 0) {
      return '첫 좋아요를 눌러주세요!'
    }
    if (likeCrew.value.length >= 10) {
      return likeCrew.value.slice(0, 10).join("<br />") + "<br />..."
    }
    return likeCrew.value.join("<br />");
  }

  const searchById = async (id: string) => {
    if (load.value) {
      return;
    }
    load.value = true;
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chats/" + id,
      {
        headers: {
          name: useAuthStore().encodedName(),
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    const result: any = data;
    item.value = result.value;
    for (let i = 0; i < item.value.messages.length; i++) {
      item.value.messages[i].content = replaceCodeFences(
        item.value.messages[i].content
      );
    }
    load.value = false;
  };

  const searchLikeCrewById = async (id: string) => {
    if (load.value) {
      return;
    }
    load.value = true;
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chat-likes?chatId=" + id
    );
    likeCrew.value = [];

    const result: any = data;
    for (let i = 0; i < result.value.length; i++) {
      likeCrew.value.push(result.value[i].memberInfo.crewName);
    }
    load.value = false;
  };

  const like = async () => {
    if (item.value["isAlreadyClickLike"]) {
      item.value["likeCount"] -= 1;
      item.value["isAlreadyClickLike"] = false;
      let name: string = useAuthStore().name;
      likeCrew.value = likeCrew.value.filter((crewName: string) => crewName != name);
    } else {
      item.value["likeCount"] += 1;
      item.value["isAlreadyClickLike"] = true;
      likeCrew.value.push(useAuthStore().name);
    }
  };

  return { item, likeCrewName, like, searchById, searchLikeCrewById };
});
