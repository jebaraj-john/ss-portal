import React, { useState } from "react";
import { Alert, StyleSheet, View, Image } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "react-native-elements";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.appLogoWrap}>
                <Image style={styles.appLogo} source={require("../logo.webp")} />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    label="Email"
                    leftIcon={{ type: "font-awesome", name: "envelope" }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={"none"}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Password"
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={"none"}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appLogo: {
        height: 100,
        width: 100,
    },
    appLogoWrap: {
        alignItems: "center",
    },
    container: {
        marginTop: 40,
        padding: 12,
    },
    mt20: {
        marginTop: 20,
    },
    verticallySpaced: {
        alignSelf: "stretch",
        paddingBottom: 4,
        paddingTop: 4,
    },
});
