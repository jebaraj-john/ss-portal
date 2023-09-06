import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import { supabase } from "../lib/supabase";
import Header from "../components/Header";
import { BackButton, Button, TextInput } from "../components/Form";
import { passwordValidator } from "../helpers/passwordValidator";
import { Alert } from "react-native";

const ChangePasswordScreen = ({ navigation }) => {
    const [newPassword, setnewPassword] = useState({ value: "", error: "" });
    const [confirmNewpassword, setconfirmNewpassword] = useState({ value: "", error: "" });

    const onChangePwdPressed = async () => {
        const passwordError = passwordValidator(newPassword.value);
        if (passwordError) {
            setnewPassword({ ...newPassword, error: passwordError });
            return;
        }
        if (newPassword.value !== confirmNewpassword.value) {
            Alert.alert("Password Mismatch");
            return;
        }

        const { error } = supabase.auth.updateUser({ password: newPassword.value });

        if (error) {
            Alert.alert(error.message);
            return;
        }

        navigation.navigate("Dashboard");
        //ToDo : Toast to Indicate whether the password is updated or not
    };
    return (
        <Background>
            <BackButton
                goBack={() => {
                    navigation.navigate("Dashboard");
                }}
            />
            <Logo />
            <Header headerText={"Welcome back."}></Header>

            <TextInput
                label="New Password"
                returnKeyType="done"
                value={newPassword.value}
                onChangeText={(text) => setnewPassword({ value: text, error: "" })}
                error={!!newPassword.error}
                errorText={newPassword.error}
                secureTextEntry
            />
            <TextInput
                label="Confirm Password"
                returnKeyType="done"
                value={confirmNewpassword.value}
                onChangeText={(text) => setconfirmNewpassword({ value: text, error: "" })}
                error={!!confirmNewpassword.error}
                errorText={confirmNewpassword.error}
                secureTextEntry
            />

            <Button mode="contained" onPress={onChangePwdPressed} btnText="Change Password" />
        </Background>
    );
};

export default ChangePasswordScreen;
