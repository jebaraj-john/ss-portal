import {StyleSheet, StatusBar} from 'react-native'

const HomeScreenStyles = StyleSheet.create({
    "container": {
        flex: 1,
        alignItems: "center",
        justifyContent: "top",
    }
});

const StudentsStyles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,

    },
    item: {
      //backgroundColor: '#fff',
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


export {HomeScreenStyles, StudentsStyles} ;