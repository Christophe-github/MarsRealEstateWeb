function applyTheme(isDark: boolean) {
    if (isDark)
        document.querySelector("html")!.classList.add("dark");
    else
        document.querySelector("html")!.classList.remove("dark");
}


function applyFontSize(fontSize: number) {
    document.querySelector("html")!.style.fontSize = `${fontSize}px`;
}


export { applyTheme, applyFontSize }