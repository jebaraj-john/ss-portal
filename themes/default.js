import { StyleSheet } from "react-native";
import { theme } from "../core/theme";

const colors = {
    black: "#000000",
    white: "#ffffff",
    eventBackground: "#F7F1FF",
    filterBadgeTextColor: "#21005D",
    filterBadgeTextActiveColor: "#560CCE",
    filterBadgeBackground: "#D0BCFF",
    tableHead: "#f1f8ff"
};

const HomeScreenStyles = StyleSheet.create({
    buttonView: {
        alignItems: "center"
    },
    container: {
        flex: 1
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        height: 40,
        width: 100
    },
    submitButtonLabel: {
        color: theme.colors.buttonText,
        fontSize: 15,
        height: 20
    },
    fab: {
        bottom: 10,
        margin: 16,
        position: "absolute",
        right: 0,
        zIndex: 100,
    },
});

const StudentsStyles = StyleSheet.create({
    att: {
        height: 40,
        paddingTop: 1,
        width: 100
    },
    container: {
        minHeight: 450,
        paddingTop: 20
    },
    iconColor: {
        absent: "#ce0c2c",
        present: "#047016"
    },
    item: {
        alignItems: "flex-start",
        flexDirection: "row",
        height: 50,
        marginLeft: 20
    },
    title: {
        flexGrow: 1,
        fontSize: 17,
        paddingRight: 2,
        paddingTop: 7
    },
    titleId: {
        fontSize: 12,
        paddingLeft: 3,
        paddingBottom: 10
    },
    titleWrap: {
        minWidth: 160
    }
});

const ReportsStyles = StyleSheet.create({
    attRangeSelector: {
        fontSize: 17,
        paddingLeft: 1
    },
    attSelectorLabel: {
        fontSize: 17,
        marginLeft: 1,
        marginRight: 2,
        paddingLeft: 1
    },
    container: {
        flex: 1,
        flexDirection: "column",
        fontSize: "14px"
    },
    containerText: {
        fontSize: 17
    },
    filterPane: {
        alignItems: "center",
        flexDirection: "column",
        marginTop: 1,
        paddingLeft: 5,
        paddingRight: 5
    },
    filterPaneText: {
        fontSize: 21
    },
    quaterSelection: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    quaterText: {
        fontSize: 20
    },
    quaterToggleBtn: {
        height: 30,
        width: 60
    },
    tableContainer: {
        flexGrow: 4,
        paddingBottom: 5,
        paddingLeft: 1,
        paddingRight: 1,
        paddingTop: 5
    },
    tableHead: { backgroundColor: colors.tableHead, height: 40 },
    tableText: {
        marginBottom: 3,
        marginTop: 3,
        textAlign: "center"
    },
    teacherNameLabel: {
        fontSize: 14,
        marginLeft: 10,
        marginRight: 2,
        paddingLeft: 1
    },
    teacherNameSelector: {
        marginLeft: 1,
        marginTop: 1,
        paddingLeft: 1,
        width: 110
    },
    viewBtn: {
        alignItems: "center",
        flexDirection: "row",
        margin: 5,
        paddingLeft: 14
    },
});

const EventsStyles = StyleSheet.create({
    container: {
        borderColor: colors.black,
        flex: 1,
        flexDirection: "column",
        fontSize: "14px"
    },
    eventsCard: {
        backgroundColor: colors.white,
        marginBottom: 8,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 8
    },
    eventsCardContent: {
        color: colors.black,
        marginRight: 8
    },
    eventsCardSubTitle: {
        color: colors.black
    },
    eventsCardTitle: {
        color: colors.black
    },
    eventsContainer: {
        flex: 1,
        padding: 1
    },
    filterBadgeButton: {
        backgroundColor: colors.filterBadgeBackground,
        margin: 4,
        width: 150
    },
    filterBadgeButtonActive: {
        backgroundColor: colors.filterBadgeTextActiveColor,
        margin: 4,
        width: 150
    },
    filterBadgeText: {
        color: colors.filterBadgeTextColor,
        fontSize: 15,
        fontWeight: "bold"
    },
    filterBadgeTextActive: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "bold"
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
        paddingTop: 15
    },
});

export { HomeScreenStyles, StudentsStyles, ReportsStyles, EventsStyles };
