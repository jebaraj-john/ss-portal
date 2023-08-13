
import { Button, Text, View } from "react-native";
import {DateWidget} from "../components/DatePanel.js"
import {StudentsList} from "../components/Students.js"
import React, { useState } from 'react'
import {HomeScreenStyles} from "../themes/default.js"
import TitleBar from "../components/TitleBar.js";


function HomeScreen() {
    const [date, setDate] = useState();

    const onDateChanged = (date) => {
        setDate(date)
    };

    return (
        <View style={HomeScreenStyles.container} >
            <TitleBar title = "Home"/>
            <StudentsList teacherEmail="xyz@gmail.com" />
        </View>
    );
}


export  {HomeScreen};
