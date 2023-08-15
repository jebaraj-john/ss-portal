import {StyleSheet, StatusBar} from 'react-native'
    
const AppDefault = {
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
      buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
};

let HomeScreenStyles = StyleSheet.create({
    "container": {
        flex: 1,
    }
});


const StudentsStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:"center",
      alignItems:'center',

    },
    item: {
      padding: 1,
      marginVertical: 4,
      marginHorizontal: 4,
      flex: 1,
      flexWrap: "wrap",
      fontSize: 17,
      height: 50,
      width: 350,
      alignItems: "flex-end",
    },
    title: {
      height: "100%",
      width: 150,
      flexGrow: 2,
      paddingTop: 7,
      paddingRight: 2,
      fontSize: 17,
    },
    att: {
      width: 100,
      height: 40,
      paddingTop: 1,
      //alignItems: "center"
    },
});

let ReportsStyles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "black",
        flexDirection: "column",
        fontSize: "14px",
    },
    containerText: {
        fontSize: 17,
    },
    filterPane: {
        flex: 1,
        marginTop: 1,
        flexDirection: "row",
        fontSize: 17,
        alignItems: "center",
        flexWrap: "wrap",
        height: "100%",
        backgroundColor: "#fffff1",
    },
    filterPaneText: {
        fontSize: 21,
    },
    attRangeSelector: {
        paddingLeft: 1,
        fontSize: 17,
    },
    attSelectorLabel: {
        marginLeft: 1,
        marginRight: 2,
        paddingLeft: 1,
        fontSize: 17,
    },
    teacherNameSelector: {
        paddingLeft: 1,
        marginLeft: 1,
        marginTop: 1,
        width: 110,
    },
    teacherNameLabel: {
        marginLeft: 10,
        marginRight: 2,
        paddingLeft: 1,
        fontSize: 14,
    },
    tableContainer: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 1,
        paddingRight: 1,
        backgroundColor: '#fff',
        flexGrow: 4,
    },
    tableHead: { height: 40, backgroundColor: '#f1f8ff' },
    tableText: {
        marginTop: 3,
        marginBottom: 3,
        textAlign: "center",
    }
});

let EventsStyles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "black",
        flexDirection: "column",
        fontSize: "14px",
        backgroundColor: "#F7F1FF"
    },
    eventsContainer: {
        flex: 1,
        padding: 1,
    },
    eventsCard: {
        backgroundColor: '#FFFFFF',
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 25,
        marginRight: 25,
    },
    eventsCardContent: {
        color: '#000000',
        marginRight: 8,
    },
    eventsCardSubTitle: {
        color: '#000000',
    },
    eventsCardTitle: {
        color: '#000000',
    },
    filterBadges: {
        paddingTop: 15,
        paddingBottom: 20,
        flex: 0.15,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: "center",
        justifyContent:  "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    filterBadgeButton: {
        backgroundColor: '#D0BCFF',
        margin: 4,
    },
    filterBadgeButtonActive: {
        backgroundColor: '#6750A4',
        margin: 2
    },
    filterBadgeText: {
        color: '#21005D',
    },
    filterBadgeTextActive: {
        color: '#FFFFFF',
    },

});



/* Use below code to debug Styles **/

for (style in ReportsStyles) {
    ReportsStyles[style].borderColor = "black";
    ReportsStyles[style].borderWidth = 1;
    ReportsStyles[style].borderStyle = "solid";
}



export {HomeScreenStyles, StudentsStyles, ReportsStyles, EventsStyles} ;