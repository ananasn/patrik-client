export const codeGenerator = (function (start = 0) {
  return () => ++start;
}());

export const getTheme = () => {
  const isDayTheme = `${window?.localStorage?.getItem('light')}`
  console.log(isDayTheme)
  if (isDayTheme == true) return true;
  if (isDayTheme == false) return false;
  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) return true;
  return false;
}

