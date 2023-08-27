"use strict";

import * as React from "react";
import { HomeScreen } from "./screens/HomeScreen.js";
import { EventsScreen } from "./screens/EventsScreen.js";
import { AppRegistry } from "react-native";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { BottomNavigation } from "react-native-paper";
import { Reports } from "./screens/ReportsScreen.js";
import { UserContext } from "./User.js";

import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
// import { GetUserInfo } from "./services/services.js";
import { GetUserInfo as GetUser } from "./services/supabase.js";


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
        const loadPage = async () => {
            const supaSession = await supabase.auth.getSession();
            console.log(supaSession);
            if (!supaSession.data.session) {
                return;
            }
            // const userDet = await GetUserInfo(supaSession.data.session.user.email);
            const userDet = await GetUser(supaSession.data.session.user.email);
            setUserInfo(userDet);
            setSession(supaSession.data.session);
        };

        loadPage();
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log("Da");
            console.log(session);
            setSession(session);
        });
    }, []);

    const RenderPage = () => {
        if (!session || !session.user) {
            return <Auth />;
        } else {
            return (
                userInfo && (
                    <UserContext.Provider value={userInfo}>
                        <BottomNavigation
                            navigationState={{ index, routes }}
                            onIndexChange={setIndex}
                            renderScene={renderScene}
                        />
                    </UserContext.Provider>
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
