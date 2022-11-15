// window.onload = () => {
//     const theme = window.localStorage.getItem("theme") ?? "dark";
//     changeTheme(theme);
//   };
  
 export const onThemeChange = () => {
    const checkbox = document.getElementById("switch");
    const theme = checkbox.checked ?  "dark" : "light";
    changeTheme(theme);
  };
  
export const changeTheme = (theme) => {
    const illustration = document.getElementById("illustration");
    illustration.style.backgroundImage = `url('./${theme}.jpg')`;
    const checkbox = document.getElementById("switch");
    checkbox.checked = theme === "dark";
    window.localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };