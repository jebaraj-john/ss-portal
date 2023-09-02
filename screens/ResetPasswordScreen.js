import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import { Button, TextInput, BackButton } from "../components/Form";
import { emailValidator } from "../helpers/emailValidator";

export default function ResetPasswordScreen({ navigation }) {
    const [email, setEmail] = useState({ value: "", error: "" });

    const sendResetPasswordEmail = () => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }
        //TODO: Integrate to supabse
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
            <Header headerText="Restore Password"></Header>
            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: "" })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description="You will receive email with password reset link."
            />
            <Button mode="contained" onPress={sendResetPasswordEmail} style={{ marginTop: 16 }} btnText=" Send Instructions" />
        </Background>
    );
}
