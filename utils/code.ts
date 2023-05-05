export const replaceCodeFences = (input: String) => {
  const codeFencesRegex = /```([\w-]*)\n([\s\S]*?)\n```/g;
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(codeFencesRegex, (match, p1, p2) => {
      const languageClass = p1 ? ` class="language-${p1}"` : "";
      return `<pre><code${languageClass}>${p2}</code></pre>`;
    })
    .replace(/\n/g, "<br>");
};