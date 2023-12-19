import React from "react";
import { theme } from "../core/theme";
import { Dialog, Portal, Text, ActivityIndicator } from "react-native-paper";

const Loader = (props) => {
    console.log(props);
    const containerStyle = {
        dialogStyle: {
            backgroundColor: theme.colors.primaryBG,
            paddingLeft: 20,
            paddingRight: 20,
            height: "15%",
            borderRadius: 15,
            alignSelf: "center",
        },
        loader: {
            color: theme.colors.primary,
        },
        loadingText: {
            marginTop: 10,
            alignSelf: "center",
            color: theme.colors.text,
        },
    };
    return (
        <Portal>
            <Dialog visible={props.length == 0 ? false : props.show} style={containerStyle.dialogStyle}>
                <ActivityIndicator size="large" color={containerStyle.loader.color} />
                <Text variant="titleLarge" style={containerStyle.loadingText}>
                    Loading
                </Text>
            </Dialog>
        </Portal>
    );
};

export default Loader;
