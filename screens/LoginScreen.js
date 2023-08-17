import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import "expo-dev-client";

import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

const LoginScreen = (props) => {
    GoogleSignin.configure({
        webClientId: "943862444859-6vor0a00ocq68cgd5p1th5kci1vfmu1q.apps.googleusercontent.com",
    });

    const onGoogleButtonPress = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        //return auth().signInWithCredential(googleCredential);
        const user_sign_in = auth().signInWithCredential(googleCredential);
        user_sign_in
            .then((user) => {
                props.afterSignIn({ email: "xyz@gmail.com" });
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const OnLoginPress = () => {
        props.afterSignIn({ email: "xyz@gmail.com" });
    };

    return (
        <View>
            <Button mode="contained-tonal" name={"Login"} key={"Login"} onPress={OnLoginPress}>
                <Text>Login Here</Text>
            </Button>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => onGoogleButtonPress().then(() => console.log("Signed in with Google!"))}
            />
        </View>
    );
};

export { LoginScreen };
