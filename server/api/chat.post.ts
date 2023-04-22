export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response: any = await $fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.GPT_API_TOKEN,
      },
      body: {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: body.text }],
      },
    }
  );

  return response.choices[0].message.content;
});
