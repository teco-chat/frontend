import { defineStore } from "pinia";
import { Chat } from "~/models/chat/chat";
import { Message } from "~/models/chat/message";

export const useItemStore = defineStore("item", () => {
  const item = ref();

  const messages = [
    new Message(1, "안녕", "USER", Date.now()),
    new Message(2, "안녕하세요 챗 지피티입니다. 오늘은 너무 힘드네요 이걸 어떻게 해야할까요?", "ASSISTANT", Date.now()),
    new Message(3, "안녕", "USER", Date.now()),
    new Message(4, "안녕하세요", "ASSISTANT", Date.now()),
  ];
  item.value = new Chat(
    1,
    "첫 질문",
    "말랑",
    Date.now(),
    messages.filter((message) => message.role == "ASSISTANT").at(0)!.content,
    messages
  )
  
  return { item };
});
