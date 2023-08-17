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
    const [isLoggedIn, setLoginStatus] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState(null);

    const RenderPage = () => {
        if (!isLoggedIn) {
            return (
                <LoginScreen
                    afterSignIn={() => {
                        setLoginStatus(true);
                    }}
                />
            );
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

    React.useEffect(() => {
        async function fetchMyAPI() {
            try {
                const userDet = await GetUserInfo("x1yz@gmail.com");
                setUserInfo(userDet);
                console.log(userDet);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMyAPI();
    }, []);
    const renderScene = BottomNavigation.SceneMap({
        home: () => (
            <HomeScreen
                centers={userInfo.centers}
                services={userInfo.services}
                departments={userInfo.departments}
                role={userInfo.role}
                teachers={userInfo.teachers}
                userInfo={userInfo}
            />
        ),
        reports: () => (
            <Reports
                centers={userInfo.centers}
                services={userInfo.services}
                departments={userInfo.departments}
                role={userInfo.role}
                teachers={userInfo.teachers}
                userInfo={userInfo}
            />
        ),
        events: EventsScreen,
    });
    return <PaperProvider theme={theme}>{RenderPage()}</PaperProvider>;
}

AppRegistry.registerComponent(appName, () => Main);
