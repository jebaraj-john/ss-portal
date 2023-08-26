"use strict";

import * as React from "react";
import { HomeScreen } from "./screens/HomeScreen.js";
import { EventsScreen } from "./screens/EventsScreen.js";
import { AppRegistry } from "react-native";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { BottomNavigation } from "react-native-paper";
import { Reports } from "./screens/ReportsScreen.js";
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
    const [userInfo, setUserInfo] = React.useState(null);

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
                const userDet = await GetUserInfo("xyz@gmail.com");
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
    return (
        <PaperProvider theme={theme}>
            {userInfo && (
                <BottomNavigation
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
            )}
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
