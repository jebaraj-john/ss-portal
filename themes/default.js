import { StyleSheet } from "react-native";

const colors = {
    black: "#000000",
    white: "#ffffff",
    eventBackground: "#F7F1FF",
    filterBadgeTextColor: "#21005D",
    filterBadgeTextActiveColor: "#6750A4",
    filterBadgeBackground: "#D0BCFF",
    tableHead: "#f1f8ff",
}

const HomeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const StudentsStyles = StyleSheet.create({
    att: {
        height: 40,
        paddingTop: 1,
        width: 100,
    },
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    item: {
        alignItems: "flex-end",
        flex: 1,
        flexWrap: "wrap",
        fontSize: 17,
        height: 50,
        marginHorizontal: 4,
        marginVertical: 4,
        padding: 1,
        width: 350,
    },
    title: {
        flexGrow: 2,
        fontSize: 17,
        height: "100%",
        paddingRight: 2,
        paddingTop: 7,
        width: 150,
    },
});

const ReportsStyles = StyleSheet.create({
    attRangeSelector: {
        fontSize: 17,
        paddingLeft: 1,
    },
    attSelectorLabel: {
        fontSize: 17,
        marginLeft: 1,
        marginRight: 2,
        paddingLeft: 1,
    },
    container: {
        borderColor: colors.black,
        flex: 1,
        flexDirection: "column",
        fontSize: "14px",
    },
    containerText: {
        fontSize: 17,
    },
    filterPane: {
        alignItems: "center",
        backgroundColor: colors.white,
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        fontSize: 17,
        height: "100%",
        marginTop: 1,
    },
    filterPaneText: {
        fontSize: 21,
    },
    tableContainer: {
        backgroundColor: colors.white,
        flex: 1,
        flexGrow: 4,
        paddingBottom: 5,
        paddingLeft: 1,
        paddingRight: 1,
        paddingTop: 5,
    },
    tableHead: { backgroundColor: colors.tableHead, height: 40 },
    tableText: {
        marginBottom: 3,
        marginTop: 3,
        textAlign: "center",
    },
    teacherNameLabel: {
        fontSize: 14,
        marginLeft: 10,
        marginRight: 2,
        paddingLeft: 1,
    },
    teacherNameSelector: {
        marginLeft: 1,
        marginTop: 1,
        paddingLeft: 1,
        width: 110,
    },
});

const EventsStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.eventBackground,
        borderColor: colors.black,
        flex: 1,
        flexDirection: "column",
        fontSize: "14px",
    },
    eventsCard: {
        backgroundColor: colors.white,
        marginBottom: 8,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 8,
    },
    eventsCardContent: {
        color: colors.black,
        marginRight: 8,
    },
    eventsCardSubTitle: {
        color: colors.black,
    },
    eventsCardTitle: {
        color: colors.black,
    },
    eventsContainer: {
        flex: 1,
        padding: 1,
    },
    filterBadgeButton: {
        backgroundColor: colors.filterBadgeBackground,
        margin: 4,
    },
    filterBadgeButtonActive: {
        backgroundColor: colors.filterBadgeTextActiveColor,
        margin: 2,
    },
    filterBadgeText: {
        color: colors.filterBadgeTextColor,
    },
    filterBadgeTextActive: {
        color: colors.white,
    },
    filterBadges: {
        alignItems: "center",
        flex: 0.15,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
    },
});

export { HomeScreenStyles, StudentsStyles, ReportsStyles, EventsStyles };
