import { ATTR_FOR_THEME, Themes } from "../types/themeTypes";

export function getThemeFromLocalStorage(){
     return localStorage.getItem('user-theme') as Themes;
}

function changeThemeOnLocalStorage(newTheme: Themes){
     localStorage.setItem('user-theme' , newTheme);
}

export function changeDocumentTheme(newTheme : Themes){
     let htmlDocument = document.querySelector('html');
     if(htmlDocument){
          changeThemeOnLocalStorage(newTheme);
          htmlDocument.setAttribute(ATTR_FOR_THEME , newTheme);
     }
}