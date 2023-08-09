
import { Button, Text, View } from "react-native";
import {DateWidget} from "../components/DatePanel.js"
import {StudentsList} from "../components/Students.js"
import React, { useState } from 'react'
import {HomeScreenStyles} from "../themes/default.js"


function HomeScreen() {
    const [date, setDate] = useState();

    const onDateChanged = (date) => {
        setDate(date)
    };

    return (
        <View style={HomeScreenStyles.container}>
        <StudentsList />
        </View>
    );
}


export  {HomeScreen};
