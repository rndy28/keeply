export function formatDate(
  date: Date | string,
  locales: Intl.LocalesArgument = "en-US",
  options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  },
) {
  if (date instanceof Date) return date.toLocaleDateString(locales, options);

  const stringToDate = new Date(date);

  return stringToDate.toLocaleDateString(locales, options);
}
