import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../core/theme";
import Background from "./Background";

export function AppLoader() {
    return (
        <Background>
            <ActivityIndicator size={70} animating={true} color={theme.colors.primary} />
        </Background>
    );
}
