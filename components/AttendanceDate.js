import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const AttendanceDate = (props) => {
    const attDefaultStyles = {
        borderRadius: 55,
        width: 55,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    };
    const styles = StyleSheet.create({
        absent: Object.assign(
            {
                backgroundColor: "#facdc5",
            },
            attDefaultStyles,
        ),
        default: Object.assign(
            {
                backgroundColor: "#f0e9e9",
            },
            attDefaultStyles,
        ),
        present: Object.assign(
            {
                backgroundColor: "#d4fac3",
            },
            attDefaultStyles,
        ),
    });
    const selectStyle = (status) => {
        const styleMap = {
            "": styles.default,
            P: styles.present,
            A: styles.absent,
        };

        return styleMap[status];
    };

    return (
        <View style={selectStyle(props.status)}>
            <Text>{props.date}</Text>
        </View>
    );
};

export default AttendanceDate;
