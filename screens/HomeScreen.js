
import { View, Alert, Pressable} from "react-native";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import {StudentsList} from "../components/Students.js"
import React, { useState } from 'react'
import {HomeScreenStyles} from "../themes/default.js"
import TitleBar from "../components/TitleBar.js";
import {PostAttendance} from "../services/services.js"
import {TeacherFilter} from "../components/TeacherFilter";


function HomeScreen(props) {
    const [teacherInfo, setTeacherInfo] = useState(props.role == "teacher" ? props.userInfo : {});
    const [isLoading, setLoader] = useState(false);
    const [attData, setAttData] = useState([]);
    const getTeacherInfo = (teacherData) => {
        if (teacherData) {
            setTeacherInfo(teacherData);
        }
    };

    const submitAtt = async (e) => {
        setLoader(true);
        const attRecords = createAttendanceData(attData, teacherInfo.email);
        console.log(attRecords);
        try {
            await PostAttendance(attRecords);
            Alert.alert('', 'Attendance submitted!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setLoader(false);
        }

    };

    const createAttendanceData = (attRecords, teacherEmail, date=null) => {
        let attendanceData = {
            "type": "update_attendance",
            "teacher_email": teacherEmail,
            "att_data": [],
        };

        if(date) {
            attendanceData["date"] = date;
        }

        attRecords.forEach(attRecord => {
            attendanceData.att_data.push({
                "id": attRecord.id,
                "att": attRecord.att,
                "name": attRecord.name,
            });
        });

        return attendanceData;
    };


    return (
        <View style={HomeScreenStyles.container} >
            <TitleBar title = "Home"/>
            <TeacherFilter centers={props.centers} services={props.services} departments={props.departments}
                role={props.role} teachers={props.teachers} userInfo={props.userInfo}
                onValueChange={getTeacherInfo}
            />
            <ActivityIndicator animating={isLoading} />
            <StudentsList teacherInfo={teacherInfo} center={props.role == "teacher" ? props.centers[0]: teacherInfo.center}
                onValueChange={(item) => {console.log(item);setAttData(item)}}
            />
            <Button mode="contained-tonal" name="submit" key="submit" onPress={submitAtt.bind(this)} >
                <Text >Submit</Text>
            </Button>
        </View>
    );
}


export  {HomeScreen};
