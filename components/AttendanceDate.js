import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const AttendanceDate = (props) => {
    attDefaultStyles = {
        borderRadius:50,
        width:50,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        margin:5
    }
    const styles =StyleSheet.create({
        present: Object.assign({
            backgroundColor:"#84f6ae",        
        }, attDefaultStyles),
        absent:Object.assign({
            backgroundColor:"#f98e8e",        
        }, attDefaultStyles),
        default:Object.assign({
            backgroundColor:"grey"
        }, attDefaultStyles)
    });
    const selectStyle = (status) => {
        const styleMap = {
            "": styles.default,
            "P": styles.present,
            "A": styles.absent,
        };

        return styleMap[status]; 
    };

    return (
    <View style={selectStyle(props.status)}>
        <Text >{props.date}</Text>
    </View>
    )
}

export default AttendanceDate