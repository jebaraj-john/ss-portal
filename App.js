"use strict";

import * as React from "react";
import { HomeScreen } from "./screens/HomeScreen.js";
import { EventsScreen } from "./screens/EventsScreen.js";
import { AppRegistry } from "react-native";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { BottomNavigation } from "react-native-paper";
import { Reports } from "./screens/ReportsScreen.js";
import { LoginScreen } from "./screens/LoginScreen.js";
import { GetUserInfo } from "./services/services.js";
import { UserContext } from "./User.js";

import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "tomato",
        secondary: "yellow",
    },
};

export default function Main() {
    const [index, setIndex] = React.useState(0);
    const [session, setSession] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState(null);

    React.useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUserInfo({ a: "a" });
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    });

    const RenderPage = () => {
        if (!session || !session.user) {
            return <Auth />;
        } else {
            return (
                userInfo && (
                    <BottomNavigation
                        navigationState={{ index, routes }}
                        onIndexChange={setIndex}
                        renderScene={renderScene}
                    />
                )
            );
        }
    };

    const [routes] = React.useState([
        {
            key: "home",
            title: "Home",
            focusedIcon: "home",
            unfocusedIcon: "home-outline",
        },
        {
            key: "reports",
            title: "Reports",
            focusedIcon: "file-document-multiple",
            unfocusedIcon: "file-document-multiple-outline",
        },
        {
            key: "events",
            title: "Events",
            focusedIcon: "calendar-month",
            unfocusedIcon: "calendar-month-outline",
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeScreen,
        reports: () => <Reports userInfo={userInfo} />,
        events: EventsScreen,
    });
    return <PaperProvider theme={theme}>{RenderPage()}</PaperProvider>;
}

AppRegistry.registerComponent(appName, () => Main);
