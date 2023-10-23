import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";

export default function Header(props) {
    return (
        <Text style={styles.header} {...props}>
            {props.headerText}
        </Text>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop:50,
        color: theme.colors.primary,
        fontSize: 21,
        fontWeight: "bold",
        paddingVertical: 12,
    },
});
