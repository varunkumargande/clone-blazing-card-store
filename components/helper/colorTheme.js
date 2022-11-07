export function colorThemeShow() {
  let currentTheme = localStorage.getItem("colorThemeBlazing");

  if (currentTheme) {
    return currentTheme;
  } else {
    return "normal";
  }
}
