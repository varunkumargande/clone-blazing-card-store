export function colorThemeShow() {
  let currentTheme = sessionStorage.getItem("colorThemeBlazing");

  if (currentTheme) {
    return currentTheme;
  } else {
    return "normal";
  }
}
