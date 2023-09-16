"use strict";

import * as React from "react";
import { Alert, AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./core/theme";
import { AuthContext } from "./User.js";
import { supabase } from "./lib/supabase";
import { LoginScreen, Dashboard, RegisterScreen, ResetPasswordScreen } from "./screens";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
const Stack = createStackNavigator();

export default function Main() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    console.log("action restore ", action.token);
                    return {
                        ...prevState,
                        userSession: action.token,
                        isLoading: false,
                    };
                case "SIGN_IN":
                    return {
                        ...prevState,
                        isSignout: false,
                        userSession: action.token,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        isSignout: true,
                        userSession: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userSession: null,
        },
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let session;

            const sessionData = await supabase.auth.getSession();
            const supaSession = sessionData.data;
            if (!supaSession.session) {
                return;
            }
            session = supaSession.session;
            dispatch({ type: "RESTORE_TOKEN", token: session });
        };

        bootstrapAsync();
    }, []);

    const showLoginError = (error) => {
        if (parseInt(error.status) >= 500) {
            Alert.alert("Sorry for the inconvenience ! We are facing some error issue.");
            console.log(error);
            return;
        }

        Alert.alert("Login failed! Please check your username and password");
    };

    const authContext = React.useMemo(
        () => ({
            signIn: async (username, password) => {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: username,
                    password: password,
                });

                if (error) {
                    Alert.alert("Login failed! Please check your username and password");
                    return;
                }
                dispatch({ type: "SIGN_IN", token: data.session });
            },
            signInWithOTP: async (email, token) => {
                const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });

                if (error) {
                    showLoginError(error);
                    return;
                }
                dispatch({ type: "SIGN_IN", token: data.session });
            },
            signOut: () => dispatch({ type: "SIGN_OUT" }),
        }),
        [],
    );

    console.log("user session", state.userSession);

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <AuthContext.Provider value={authContext}>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}>
                        {state.userSession == null ? (
                            <>
                                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                                <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                            </>
                        ) : (
                            <>
                                <Stack.Screen name="Dashboard" component={Dashboard} />
                                <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
                            </>
                        )}
                    </Stack.Navigator>
                </AuthContext.Provider>
            </NavigationContainer>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
