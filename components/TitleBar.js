import React from "react";
import { Alert } from "react-native";
import { Appbar } from "react-native-paper";
import { supabase } from "../lib/supabase";

const TitleBar = (props) => {
    return (
        <Appbar.Header>
            <Appbar.Content title={props.title} />
            <Appbar.Action
                icon="account-circle"
                onPress={async () => {
                    console.log("logotu");
                    await supabase.auth.signOut();
                    Alert.alert("Hello User!");
                }}
            />
        </Appbar.Header>
    );
};

export default TitleBar;
