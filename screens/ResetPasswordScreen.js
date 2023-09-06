import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import { Button, TextInput, BackButton } from "../components/Form";
import { emailValidator } from "../helpers/emailValidator";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../User";

function ResetPage({onChangeEmail, setPage, navigation}) {
    const [email, setEmail] = useState({ value: "", error: "" });
    const resetEmail = async (emailId) => {
        const {error} = await supabase.auth.resetPasswordForEmail(emailId, {
            redirectTo: '',
        });

        if (!error) {
            onChangeEmail(email);
        }
    };

    const sendResetPasswordEmail = async () => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });

            return;
        }
        resetEmail(email.value);
        setPage("updatePassword");


    };

    return (
        <>
         <BackButton
                goBack={() => {
                    navigation.navigate("LoginScreen");
                }}
            />
            <Logo />
            <Header headerText="Sign In With OTP"></Header>
            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={(text) => {
                    setEmail({ value: text, error: "" })
                }}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description="You will receive an email with code."
            />
            <Button
                mode="contained"
                onPress={sendResetPasswordEmail}
                style={{ marginTop: 16 }}
                btnText=" Send Code"
            />
        </>
    )
}

function OTPSignInPage({email, navigation}) {
    const [code, setCode] = useState("")
    const { signInWithOTP } = React.useContext(AuthContext);


    const doLogin = async () => {
        signInWithOTP(email, code);
    };

    return (
        <>
         <BackButton
                goBack={() => {
                    navigation.navigate("LoginScreen");
                }}
            />
            <Logo />
            <Header headerText="Sign In With OTP"></Header>
            <TextInput
                label="Code"
                returnKeyType="done"
                value={code}
                onChangeText={setCode}
                autoCapitalize="none"
                textContentType="oneTimeCode"
                keyboardType="number-pad"
                description="auth code from email"
            />
            <Button
                mode="contained"
                onPress={doLogin}
                style={{ marginTop: 16 }}
                btnText="Sign In"
            />
        </>
    )
}




export default function ResetPasswordScreen({navigation}) {
    const [page, changePage] = useState("resetPage");
    const [email, setEmail] = useState("");


    return (
        <Background>
           {
           page === "resetPage" ? <ResetPage navigation={navigation} onChangeEmail={setEmail} setPage={changePage} /> :
           <OTPSignInPage  navigation={navigation} email={email.value}/>
           }
        </Background>
    );
}
