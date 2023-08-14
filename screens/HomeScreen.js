
import { View, Alert, Pressable} from "react-native";
import { Button, SegmentedButtons, Text, ActivityIndicator } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {DateWidget} from "../components/DatePanel.js"
import {StudentsList} from "../components/Students.js"
import React, { useState } from 'react'
import {HomeScreenStyles} from "../themes/default.js"
import TitleBar from "../components/TitleBar.js";
import {urls} from "../config";




function HomeScreen(props) {
    const defaultTeacherMail = props.role == "teacher" ? props.userInfo.email : "";
    const [teacherEmail, setTeacherEmail] = useState(defaultTeacherMail);
    const [isTeacherNameChanged, toggleTeacherChange] = useState(true);
    const [isLoading, setLoader] = useState(false);
    const [attData, setAttData] = useState([]);
    const [showTeacherDrop, setShowTeacherDrop] = useState(false);
    const [center, setCenter] = useState(props.centers[0]);
    const centerButtons = props.centers.map((center) => {return {"label": center, "value": center}});
    const teachersList = props.teachers.map((teacher) => {return {"label": teacher.name, "value": teacher.email}});
    const [service, setService] = useState(props.services[0]);
    const serviceButtons = props.services.map((department) => {return {"label": department, "value": department}});
    const [department, setDepartment] = useState(props.departments[0]);
    const departmentButtons = props.departments.map((department) => {return {"label": department, "value": department}});
    const renderCenters = () => {
        if (props.centers.length > 1) {
            return (
                <SegmentedButtons style={{width: 40, padding: 0}}
                    value={center}
                    onValueChange={setCenter}
                    buttons={centerButtons}
                />
            );
        }
        else {
            return (
                <View style={{flexDirection: "row"}}>
                    <Text variant="titleLarge" >Center</Text>
                    <Text variant="titleLarge" >{props.centers[0]}</Text>
                </View>

            )
        }
    };

    const renderServices = () => {
        if (props.services.length > 1) {
            return (
                <SegmentedButtons style={{width: 40, padding: 0}}
                    value={service}
                    onValueChange={setService}
                    buttons={serviceButtons}
                />
            );
        }
        else {
            return (
                <View style={{flexDirection: "row"}}>
                    <Text variant="titleLarge" >Service</Text>
                    <Text variant="titleLarge" >{props.services[0]}</Text>
                </View>

            )
        }
    };
    const renderDepartments = () => {
        if (props.departments.length > 1) {
            return (
                <SegmentedButtons style={{width: 40, padding: 0}}
                    value={department}
                    onValueChange={setDepartment}
                    buttons={departmentButtons}
                />
            );
        }
        else {
            return (
                <View style={{flexDirection: "row"}}>
                    <Text variant="titleLarge" >Department</Text>
                    <Text variant="titleLarge" >{props.departments[0]}</Text>
                </View>
            );
        }
    };

    const changeState = () => {
        console.log("tes");
        toggleTeacherChange(!isTeacherNameChanged);
    };

    const renderTeachers = () => {
        if (props.role !== "teacher") {
            //console.log(teachersList);
            return (
                <View>
                <DropDown label="Teacher Name" mode={"outlined"} visible={showTeacherDrop}
                    showDropDown={() => setShowTeacherDrop(true)}
                    onDismiss={() => setShowTeacherDrop(false)} value={teacherEmail}
                    setValue={setTeacherEmail} list={teachersList}
                />
                <Button mode="contained-tonal" name="get_attendance" key="get_attendance"
                onPress={changeState}>
                    <Text >Get Attendance</Text>
                </Button>
                </View>
            );
        }
        else {
            return (
                <View style={{flexDirection: "row"}}>
                    <Text variant="titleLarge" >Teacher</Text>
                    <Text variant="titleLarge" >{props.userInfo.name}</Text>
                </View>
            );
        }
    };

    const submitAtt = (e) => {
        console.log(attData);
        const attRecords = createAttendanceData(attData, teacherEmail)
        console.log(attRecords)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attRecords)
        };
        const update_attendance_url = `${urls.attendance_url}`
        setLoader(true);
        fetch(update_attendance_url, requestOptions)
          .then(response => response.json())
          .then(data =>  {
            setLoader(false);
            Alert.alert('', 'Attendance submitted!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        });

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
            <View id="attendanceFilterBar">
            {renderCenters()}
            {renderServices()}
            {renderDepartments()}
            {renderTeachers()}
            </View>
            <ActivityIndicator animating={isLoading} />
            <StudentsList teacherEmail={teacherEmail} isTeacherNameChanged={isTeacherNameChanged}
                onValueChange={(item) => {console.log(item);setAttData(item)}}
            />
            <Button mode="contained-tonal" name="submit" key="submit" onPress={submitAtt.bind(this)} >
                <Text >Submit</Text>
            </Button>
        </View>
    );
}


export  {HomeScreen};
