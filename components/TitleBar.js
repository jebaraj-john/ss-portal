import React from "react";
import { Alert } from "react-native";
import { Appbar } from "react-native-paper";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../User";

const TitleBar = (props) => {
    const { signOut } = React.useContext(AuthContext);
    return (
        <Appbar.Header>
            <Appbar.Content title={props.title} />
            <Appbar.Action
                icon="account-circle"
                onPress={async () => {
                    await supabase.auth.signOut();
                    signOut();
                    Alert.alert("Hello User!");
                }}
            />
        </Appbar.Header>
    );
};

export default TitleBar;
