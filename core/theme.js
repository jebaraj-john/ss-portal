import { DefaultTheme } from "react-native-paper";

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        text: "#000000",
        primary: "#560CCE",
        primaryBG: "#e8def7",
        secondary: "#414757",
        error: "#f13a59",
        buttonText: "#ffffff",
    },
    fonts: {
        ...DefaultTheme.fonts,
        lineHeight: 0,
        fontSize: 1,
    },
};
