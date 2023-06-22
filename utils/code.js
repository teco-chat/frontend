export const replaceCodeFences = (input) => {
  let hasCodeFences = false;
  const codeFencesPlaceholder = "___CODE_FENCES___";

  // 코드블록 내부의 HTML 태그를 임시로 대체
  const modifiedInput = input.replace(codeFencesRegex, (match) => {
    hasCodeFences = true;
    return match.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  });

  // 코드블록 적용
  const transformedInput = modifiedInput
    .replace(codeFencesRegex, (match, p1, p2) => {
      const languageClass = p1 ? ` class="language-${p1}"` : "";
      return `<pre><code${languageClass}>${p2}</code></pre>`;
    })
    .replace(/\n/g, "<br>");

  // 코드블록 내부의 HTML 태그를 원래대로 복원
  const finalOutput = transformedInput.replace(
    new RegExp(codeFencesPlaceholder, "g"),
    (match) => match.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  );

  return hasCodeFences ? finalOutput : input.replace(/\n/g, "<br>");;
};

export const codeFencesRegex = /```([\w-]*)\n([\s\S]*?)\n```/g;
