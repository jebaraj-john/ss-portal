import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import { Button, TextInput } from "../components/Form";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { AuthContext } from "../User";
import { SegmentedButtons } from "react-native-paper";
import { PhoneAuth } from "../components/PhoneAuth";

const EmailLogin = ({ navigation }) => {
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const { signIn } = React.useContext(AuthContext);
    const onLoginPressed = async () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        signIn(email.value, password.value);
    };

    return (
        <View style={{ width: "100%" }}>
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
        </View>
    );
};

export default function LoginScreen(props) {
    const [checked, setChecked] = React.useState("email");

    return (
        <Background>
            <Logo />
            <Header headerText={"Welcome back."}></Header>
            <SegmentedButtons
                style={{ width: 100, justifyContent: "center", padding: 0, margin: 0, height: 40 }}
                theme={theme}
                value={checked}
                onValueChange={setChecked}
                buttons={[
                    {
                        value: "email",
                        label: "email",
                    },
                    {
                        value: "phone",
                        label: "phone",
                    },
                ]}
            />
            {checked == "email" ? (
                <EmailLogin navigation={props.navigation} />
            ) : (
                <PhoneAuth navigation={props.navigation} />
            )}
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
