import { defineStore } from "pinia";

export const useItemStore = defineStore("item", () => {
  const item = ref();
  const load = ref(false);

  const getItem = async (id: string) => {
    if (load.value) {
      return;
    }
    load.value = true;
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/chats/" + id,
      {
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

  const replaceCodeFences = (input: String) => {
    const codeFencesRegex = /```([\w-]*)\n([\s\S]*?)\n```/g;
    return input
      .replace(codeFencesRegex, (match, p1, p2) => {
        const languageClass = p1 ? ` class="language-${p1}"` : "";
        return `<pre><code${languageClass}>${p2}</code></pre>`;
      })
      .replace(/\n/g, "<br>");
  };

  return { item, getItem };
});
