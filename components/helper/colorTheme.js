export function colorThemeShow(){

    let currentTheme=sessionStorage.getItem("colorThemeSpurt")
    

    if(currentTheme){
        return currentTheme;
    }
    else{
        return "normal";
    }

}