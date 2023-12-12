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

//для склонения слова раз\раза
export const numberTimes = (number) => {
  if (number == null) {
    return "раз";
  }

  number = number.toString();

  if (2 <= number[number.length-1] && number[number.length-1] <= 4) {
    return "раза";
  } else {
    return "раз";
  }
}

