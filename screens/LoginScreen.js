import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import { supabase } from "../lib/supabase";
import Header from "../components/Header";
import { Button, TextInput } from "../components/Form";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });

    const onLoginPressed = async () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        if (error) {
            Alert.alert(error.message);
            return;
        }
        navigation.navigate("Dashboard");
    };

    return (
        <Background>
            <Logo />
            <Header headerText={"Welcome back."}></Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: "" })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => navigation.navigate("ResetPasswordScreen")}>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={onLoginPressed} btnText="Login" />
            <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    forgot: {
        color: theme.colors.secondary,
        fontSize: 13,
    },
    forgotPassword: {
        alignItems: "flex-end",
        marginBottom: 24,
        width: "100%",
    },
    link: {
        color: theme.colors.primary,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        marginTop: 4,
    },
});
