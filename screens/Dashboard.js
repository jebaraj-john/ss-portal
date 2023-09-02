import { UserContext } from "../User.js";
import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import { HomeScreen } from "../screens/HomeScreen.js";
import { EventsScreen } from "../screens/EventsScreen.js";
import { Reports } from "../screens/ReportsScreen.js";

export default function Dashboard({ userInfo }) {
    const [index, setIndex] = React.useState(0);

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
