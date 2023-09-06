import { UserContext } from "../User.js";
import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import { HomeScreen } from "../screens/HomeScreen.js";
import { EventsScreen } from "../screens/EventsScreen.js";
import { Reports } from "../screens/ReportsScreen.js";
import { GetUserInfo } from "../services/services.js";
import { AppLoader } from "../components/AppLoader.js";
import { supabase } from "../lib/supabase";
import TitleBar from "../components/TitleBar.js";
import { View, Text, StyleSheet } from "react-native";


const GuestPage = () => {
    return (
        <>
            <TitleBar title="Guest" />
            <View style={guestStyles.container}>
                <Text style={guestStyles.title}>Welcome to Our Guest Page</Text>
                <Text style={guestStyles.text}>Our guest page is currently under construction!</Text>
                <Text style={guestStyles.text}>
                    If you are a member of NLAG Sunday School, please don&lsquo;t hesitate to contact our Sunday School
                    Helpdesk.
                </Text>
                <View style={guestStyles.contactInfo}>
                    <Text style={guestStyles.contactText}>Contact Sunday School Helpdesk:</Text>
                    <Text style={guestStyles.contactText}>Email: sunday_school@nlag.org</Text>
                    <Text style={guestStyles.contactText}>Phone: (123) 456-7890</Text>
                </View>
            </View>
        </>
    );
};

const guestColors = {
    contactText: "#007BFF",
    text: "#555",
    title: "#333",
};
const guestStyles = StyleSheet.create({
    contactInfo: {
        marginTop: 20,
    },
    contactText: {
        color: guestColors.contactText,
        fontSize: 18,
        marginBottom: 5,
    },
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        margin: 20,
    },
    text: {
        color: guestColors.text,
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center",
    },
    title: {
        color: guestColors.title,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

export default function Dashboard({ navigation }) {
    const [index, setIndex] = React.useState(0);
    const [userInfo, setUserInfo] = React.useState(null);
    const userContext = {
        userInfo: userInfo,
        navigation: navigation,
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
        const loadPage = async () => {
            const sessionData = await supabase.auth.getSession();
            const supaSession = sessionData.data;
            console.log("I am at dash", sessionData);

            const session = supaSession.session;
            if (!session) {
                console.log("session not found");
                return;
            }
            if (!session.user) {
                console.log("user not found");
                return;
            }
            console.log("This is day", session.user.email);
            const userDet = await GetUserInfo(session.user.email);
            console.log("I ran");
            setUserInfo(userDet);

            //console.log(userDet)
        };

        // supabase.auth.onAuthStateChange((_event, session) => {
        //     setSession(session);
        // });

        loadPage();
    }, []);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeScreen,
        reports: () => <Reports userInfo={userInfo} />,
        events: EventsScreen,
    });

    console.log(userInfo);

    return userInfo ? (
        userInfo.role == "guest" ? (
            <GuestPage />
        ) : (
            <UserContext.Provider value={userContext}>
                <BottomNavigation
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
            </UserContext.Provider>
        )
    ) : (
        <AppLoader />
    );
}
