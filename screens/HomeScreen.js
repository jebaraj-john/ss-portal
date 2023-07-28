
import { Button, Text, View } from "react-native";
import {DateWidget} from "../components/DatePanel.js"
import {StudentsList} from "../components/Students.js"
import React, { useState } from 'react'


function HomeScreen() {
    const [date, setDate] = useState()

    const submitAtt = (e) => {
        console.log(date)
    };

    const onDateChanged = (date) => {
        setDate(date)
    };

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "top" }}>
        <DateWidget onChange={onDateChanged}/>
        <StudentsList />
        <Button title="Submit Attendance" onPress={submitAtt.bind(this)}/>
        </View>
    );
}


export  {HomeScreen};
