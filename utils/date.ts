const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "short",
  timeStyle: "short",
});

export const parseDateTimeFormat = (time: any) => {
  const date = new Date(time);
  return dateTimeFormat.format(date);
};