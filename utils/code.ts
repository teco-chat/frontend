export const replaceCodeFences = (input: String) => {
  const codeFencesRegex = /```([\w-]*)\n([\s\S]*?)\n```/g;
  // 코드블록 입력 여부 체크를 위한 변수
  let hasCodeFences = false;
  return input
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(codeFencesRegex, (match, p1, p2) => {
      const languageClass = p1 ? ` class="language-${p1}"` : "";
      // 코드블록이 있음을 표시
      hasCodeFences = true;
      return `<pre><code${languageClass}>${p2}</code></pre>`;
    })
    .replace(/\n/g, "<br>")
    // 이미 코드블록이 적용된 경우 return
    .replace(codeFencesRegex, (match) => match)
    // 코드블록이 없으면서 hasCodeFences가 false인 경우 아무 것도 반환하지 않음
    || (hasCodeFences ? input : "");
};

export const codeFencesRegex = /```([\w-]*)\n([\s\S]*?)\n```/g;