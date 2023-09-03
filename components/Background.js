import React from "react";
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from "react-native";
import { theme } from "../core/theme";

export default function Background(props) {
    return (
        <ImageBackground
            source={require("../assets/background_dot.png")}
            resizeMode="repeat"
            style={props.style ? props.style : styles.background}>
            <KeyboardAvoidingView style={props.style ? props.style : styles.container} behavior="padding">
                {props.children}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: theme.colors.surface,
        flex: 1,
        width: "100%",
    },
    container: {
        alignItems: "center",
        alignSelf: "center",
        flex: 1,
        justifyContent: "center",
        maxWidth: 340,
        padding: 20,
        width: "100%",
    },
});
