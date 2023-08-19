import React, { useState } from 'react'
import { Button, SegmentedButtons, Text } from "react-native-paper";
import { View } from "react-native";
import DropDown from "react-native-paper-dropdown";

export const TeacherFilter = (props) => {
    const defaultTeacherMail = props.role == "teacher" ? props.userInfo.email : "";
    const [teacherEmail, setTeacherEmail] = useState(defaultTeacherMail);
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

    const onPress = () => {
        let teacherInfo = null;

        for (index in  props.teachers) {
            let teacher = props.teachers[index];

            if (teacher.email ==  teacherEmail) {
                teacher["center"] = center;
                teacher["department"] = department;
                teacher["service"] = service;
                teacher["personalInfo"] = teacher;
                teacherInfo = teacher;
                break;
            }
        }
        if (props.onValueChange) {
            props.onValueChange(teacherInfo);
        }

    };

    const renderTeachers = () => {
        if (props.role !== "teacher") {
            return (
                <View>
                    <DropDown label="Teacher Name" mode={"outlined"} visible={showTeacherDrop}
                        showDropDown={() => setShowTeacherDrop(true)}
                        onDismiss={() => setShowTeacherDrop(false)} value={teacherEmail}
                        setValue={setTeacherEmail} list={teachersList}
                    />
                    <Button mode="contained-tonal" name="get_attendance" key="get_attendance"
                    onPress={onPress}>
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

    return (
        <View id="attendanceFilterBar">
            {renderCenters()}
            {renderServices()}
            {renderDepartments()}
            {renderTeachers()}
        </View>
    );

};