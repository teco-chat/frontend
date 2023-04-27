import { defineStore } from "pinia";
import { Chat } from "~/models/chat/chat";
import { Message } from "~/models/chat/message";

export const useItemsStore = defineStore("items", () => {
  const items: any = ref([]);

  for (let idx = 1; idx <= 9; idx++) {
    const messages = [
      new Message(1, "안녕", "USER", Date.now()),
      new Message(2, "안녕하세요 챗 지피티입니다. 오늘은 너무 힘드네요 이걸 어떻게 해야할까요?", "ASSISTANT", Date.now()),
      new Message(3, "안녕", "USER", Date.now()),
      new Message(4, "안녕하세요", "ASSISTANT", Date.now()),
    ];
    items.value.push(new Chat(
      idx,
      "첫 질문",
      idx % 2 == 0 ? "말랑" : "허브",
      Date.now(),
      messages.filter((message) => message.role == "ASSISTANT").at(0)!.content,
      messages
    ));
  }

  return { items };
});
