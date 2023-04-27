import { defineStore } from "pinia";
import { Chat } from "~/models/chat/chat";
import { Message } from "~/models/chat/message";

export const useItemStore = defineStore("item", () => {
  const item = ref();

  const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const data =
    "다음의 코드를 이용해보세요." +
    "```jsx\n" +
    "{\n" +
    '    "id": 1,\n' +
    '    "crewName": "말랑",\n' +
    '    "title": "안녕?",\n' +
    '    "course": "BACKEND",\n' +
    '    "createdAt": "2023-04-27T16:25:06.494014",\n' +
    '    "messages": [\n' +
    "        {\n" +
    '            "id": 1,\n' +
    '            "content": "안녕?",\n' +
    '            "role": "user",\n' +
    '            "createdAt": "2023-04-27T16:25:06.495927"\n' +
    "        },\n" +
    "        {\n" +
    '            "id": 2,\n' +
    '            "content": "응 안녕",\n' +
    '            "role": "assistant",\n' +
    '            "createdAt": "2023-04-27T16:25:06.497408"\n' +
    "        },\n" +
    "        {\n" +
    '            "id": 3,\n' +
    '            "content": "안녕? 두번째",\n' +
    '            "role": "user",\n' +
    '            "createdAt": "2023-04-27T16:25:06.720327"\n' +
    "        },\n" +
    "        {\n" +
    '            "id": 4,\n' +
    '            "content": "응 안녕 두번째",\n' +
    '            "role": "assistant",\n' +
    '            "createdAt": "2023-04-27T16:25:06.720917"\n' +
    "        }\n" +
    "    ]\n" +
    "}\n" +
    "```";

  const replaceCodeFences = (input: String) => {
    const codeFencesRegex = /```([\w-]*)\n([\s\S]*?)\n```/g;
    return input
      .replace(codeFencesRegex, (match, p1, p2) => {
        const languageClass = p1 ? ` class="language-${p1}"` : "";
        return `<pre><code${languageClass}>${p2}</code></pre>`;
      })
      .replace(/\n/g, "<br>");
  };

  const result = replaceCodeFences(data);

  const messages = [
    new Message(1, "안녕", "USER", dateTimeFormat.format(Date.now())),
    new Message(
      2,
      "안녕하세요 챗 지피티입니다. 오늘은 너무 힘드네요 이걸 어떻게 해야할까요?",
      "ASSISTANT",
      dateTimeFormat.format(Date.now())
    ),
    new Message(3, "안녕", "USER", dateTimeFormat.format(Date.now())),
    new Message(4, result, "ASSISTANT", dateTimeFormat.format(Date.now())),
  ];
  item.value = new Chat(
    1,
    "첫 질문",
    "말랑",
    "백엔드",
    dateTimeFormat.format(Date.now()),
    messages.filter((message) => message.role == "ASSISTANT").at(0)!.content,
    messages
  );

  return { item };
});
