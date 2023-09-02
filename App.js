"use strict";

import * as React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./core/theme";
import { LoginScreen, Dashboard, RegisterScreen, ResetPasswordScreen } from "./screens";

import { supabase } from "./lib/supabase";
import { GetUserInfo } from "./services/services.js";
import { AppLoader } from "./components/AppLoader.js";

const Stack = createStackNavigator();

export default function Main() {
    const [session, setSession] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState(null);
    const [isAppInitialized, initializeApp] = React.useState(false);

    const StartScreen = ({ navigation }) => {
        if (!isAppInitialized) {
            return <AppLoader />;
        }

        if (session && session.user) {
            return <Dash />;
        } else {
            return <LoginScreen navigation={navigation} />;
        }
    };

    const Dash = ({ navigation }) => {
        return <Dashboard userInfo={userInfo} navigation={navigation} />;
    };

    React.useEffect(() => {
        const loadPage = async () => {
            const supaSession = await supabase.auth.getSession();
            console.log(supaSession);
            if (!supaSession.data.session) {
                initializeApp(true);
                return;
            }
            setSession(supaSession.data.session);
            const userDet = await GetUserInfo(supaSession.data.session.user.email);
            setUserInfo(userDet);
            initializeApp(true);
        };

        loadPage();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={"StartScreen"}
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name="StartScreen" component={StartScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="Dashboard" component={Dash} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

                    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
