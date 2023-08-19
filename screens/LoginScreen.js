import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import "expo-dev-client";

import React from "react";
import { View } from "react-native";
import { GetUserInfo } from "../services/services.js";

const LoginScreen = (props) => {
    GoogleSignin.configure({
        webClientId: "943862444859-6vor0a00ocq68cgd5p1th5kci1vfmu1q.apps.googleusercontent.com",
        iosClientId: "943862444859-6uh0juqage3nrj2hj9add8ro58mf40co.apps.googleusercontent.com",
    });

    const onGoogleButtonPress = async () => {
        try {
            //await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleUserInfo = userInfo.user;
            console.log(googleUserInfo);
            const userDet = await GetUserInfo(googleUserInfo.email);
            return userDet;
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("play service not available");
                // play services not available or outdated
            } else {
                console.log(error);
                // some other error happened
            }
        }
    };

    return (
        <View style={{ alignSelf: "center", flex: 1, justifyContent: "center" }}>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() =>
                    onGoogleButtonPress().then((userDet) => {
                        props.afterSignIn(userDet, {});
                    })
                }
            />
        </View>
    );
};

export { LoginScreen };
