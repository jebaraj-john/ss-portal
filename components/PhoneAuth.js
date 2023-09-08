import { AuthContext } from "../User";
import { supabase } from "../lib/supabase";
import { Button, TextInput, BackButton } from "../components/Form";
import React, { useState } from "react";

function PhoneAuthVerify({ phone }) {
    const [code, setCode] = useState("");
    const { signInWithPhone } = React.useContext(AuthContext);

    const doLogin = async () => {
        signInWithPhone(phone, code);
    };

    return (
        <>
            <TextInput
                label="Code"
                returnKeyType="done"
                value={code}
                onChangeText={setCode}
                autoCapitalize="none"
                textContentType="oneTimeCode"
                keyboardType="number-pad"
                description="auth code from sms"
            />
            <Button mode="contained" onPress={doLogin} style={{ marginTop: 16 }} btnText="Sign In" />
        </>
    );
}

function PhoneLogin({ onChangePhone, setPage, navigation }) {
    const [phone, setPhone] = useState({ value: "", error: "" });
    const sendOTPToPhone = async (phone) => {
        phone = `+91${phone}`;
        console.log("login phone no", phone);
        const { error } = await supabase.auth.signInWithOtp({
            phone: phone,
        });

        if (error) {
            console.log(error);
        }
    };

    const doLogin = async () => {
        sendOTPToPhone(phone.value);

        onChangePhone(phone.value);

        setPage("PhoneAuthVerify");
    };

    return (
        <>
            <BackButton
                goBack={() => {
                    navigation.navigate("LoginScreen");
                }}
            />
            <TextInput
                label="Phone no"
                returnKeyType="done"
                value={phone.value}
                onChangeText={(text) => {
                    setPhone({ value: text, error: "" });
                }}
                error={!!phone.error}
                errorText={phone.error}
                autoCapitalize="none"
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                description="You will receive a sms with code."
            />
            <Button mode="contained" onPress={doLogin} style={{ marginTop: 16 }} btnText="Send Code" />
        </>
    );
}

export function PhoneAuth({ navigation }) {
    const [page, changePage] = useState("PhoneLogin");
    const [phone, setPhone] = useState("");

    return (
        <>
            {page === "PhoneLogin" ? (
                <PhoneLogin navigation={navigation} onChangePhone={setPhone} setPage={changePage} />
            ) : (
                <PhoneAuthVerify navigation={navigation} phone={phone} />
            )}
        </>
    );
}
