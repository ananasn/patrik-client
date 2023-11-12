export const codeGenerator = (function (start = 0) {
  return () => ++start;
}());

export const getTheme = () => {
  const isDay = `${window?.localStorage?.getItem('light')}`
  if (isDay == true) return true;
  if (isDay == null) {
    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    if (userMedia.matches) return false;
    return true;
  }
}

