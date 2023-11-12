export const codeGenerator = (function (start = 0) {
  return () => ++start;
}());

export const getTheme = () => {
  const isDay = `${window?.localStorage?.getItem('light')}`
  console.log(isDay, "из локалстор")
  const theme = isDay ? 'light' : 'dark';
  console.log(isDay, theme, "из локалстор");
  if (theme == 'light') return true;
  if (theme == 'dark') return false;

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) return true;
  return false;
}

