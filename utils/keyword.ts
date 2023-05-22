export const keywordShortener = (keyword: string) => {
  return keyword.substring(0, 10) + (keyword.length > 10 ? "..." : "");
};