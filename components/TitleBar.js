import React from "react";
import { Alert } from "react-native";
import { Appbar } from "react-native-paper";

const TitleBar = (props) => {
    return (
        <Appbar.Header>
            <Appbar.Content title={props.title} />
            <Appbar.Action icon="account-circle" onPress={() => Alert.alert("Hello User!")} />
        </Appbar.Header>
    );
};

export default TitleBar;
