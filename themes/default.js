import { StyleSheet } from "react-native";

const colors = {
    black: "#000000",
    white: "#ffffff",
    eventBackground: "#F7F1FF",
    filterBadgeTextColor: "#21005D",
    filterBadgeTextActiveColor: "#6750A4",
    filterBadgeBackground: "#D0BCFF",
    tableHead: "#f1f8ff",
};

const HomeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: 100,
    },
    attButtonWrap: {
        width: 180,
    },
    container: {
        minHeight: 450,
    },
    item: {
        alignItems: "flex-start",
        flexDirection: "row",
        height: 60,
        marginLeft: 1,
        marginRight: 0,
        padding: 1,
        width: "100%",
    },
    title: {
        flexGrow: 1,
        fontSize: 17,
        minWidth: 120,
        paddingRight: 2,
        paddingTop: 7,
    },
});

const attFilterDefaultBtnStyle = {
    margin: 2,
};

const AttendanceFilterStyles = StyleSheet.create({
    attendanceFilterBar: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    centerButtons: {
        ...attFilterDefaultBtnStyle,
    },
    centerView: {
        marginLeft: 1,
        marginRight: 5,
    },
    centerViewWrap: {
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 1,
        marginRight: 5,
        marginTop: 5,
    },
    departmentButtons: {
        ...attFilterDefaultBtnStyle,
    },
    serviceButtons: {
        ...attFilterDefaultBtnStyle,
    },
    serviceButtonsLabel: {
        padding: 0,
    },
    teacherBoxWrap: {
        minWidth: 200,
    },
    teacherButtons: {
        ...attFilterDefaultBtnStyle,
    },
    teacherSelectButton: {
        alignSelf: "center",
        height: 40,
        marginTop: 5,
        margin: 2,
    },
    teacherWrap: {
        flexDirection: "row",
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
        flexDirection: "column",
        marginTop: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    filterPaneText: {
        fontSize: 21,
    },
    tableContainer: {
        backgroundColor: colors.white,
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

export { HomeScreenStyles, StudentsStyles, ReportsStyles, EventsStyles, AttendanceFilterStyles };
