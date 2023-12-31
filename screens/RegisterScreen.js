import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import { Button, TextInput, BackButton } from "../components/Form";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { supabase } from "../lib/supabase";

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });

    const onSignUpPressed = async () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError || nameError) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });

            return;
        }
        const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        });
        if (error) {
            console.log(error);
        }
        Alert.alert("Registration almost done! Please check your email to complete the process.");
        navigation.navigate("LoginScreen");
    };

    return (
        <Background>
            <BackButton
                goBack={() => {
                    navigation.navigate("LoginScreen");
                }}
            />
            <Logo />
            <Header headerText="Create Account"></Header>
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: "" })}
                error={!!name.error}
                errorText={name.error}
            />
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
            <Button mode="contained" onPress={onSignUpPressed} style={{ marginTop: 24 }} btnText="Sign Up" />
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    link: {
        color: theme.colors.primary,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        marginTop: 4,
    },
});
