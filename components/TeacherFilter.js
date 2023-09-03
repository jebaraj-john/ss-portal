import React, { useState } from "react";
import { View } from "react-native";
import { Button, Chip, Text } from "react-native-paper";
import { SelectBox } from "./Form.js";

import { AttendanceFilterStyles } from "../themes/default";

export const TeacherFilter = (props, children) => {
    const userInfo = props.userInfo;
    const defaultTeacherMail = userInfo.role == "teacher" ? userInfo.email : "";
    const [teacherEmail, setTeacherEmail] = useState(defaultTeacherMail);

    const [center, setCenter] = useState(userInfo.centers[0]);
    const createButton = (data) => {
        return { label: data, value: data };
    };
    const centerButtons = userInfo.centers.map(createButton);
    const teachersList = userInfo.teachers.map((teacher) => {
        teacher["label"] = teacher.name;
        teacher["value"] = teacher.email;
        return teacher;
    });
    const [service, setService] = useState(userInfo.services[0]);
    const serviceButtons = userInfo.services.map(createButton);
    const [department, setDepartment] = useState(userInfo.departments[0]);
    const departmentButtons = userInfo.departments.map(createButton);

    const renderCenters = () => {
        if (userInfo.centers.length > 1) {
            return (
                <SelectBox
                    key="center-box"
                    style={AttendanceFilterStyles.centerButtons}
                    label="Center"
                    list={centerButtons}
                    value={center}
                    onValueChange={setCenter}
                />
            );
        } else {
            return (
                <View style={AttendanceFilterStyles.centerViewWrap}>
                    <Chip icon="church" selected={true} showSelectedCheck={true}>
                        {userInfo.centers[0]}
                    </Chip>
                </View>
            );
        }
    };

    const renderServices = () => {
        if (userInfo.services.length > 1) {
            return (
                <SelectBox
                    key="service-box"
                    style={AttendanceFilterStyles.serviceButtons}
                    label="Service"
                    list={serviceButtons}
                    value={service}
                    onValueChange={setService}
                />
            );
        } else {
            return (
                <View style={AttendanceFilterStyles.centerViewWrap}>
                    <Chip icon="account-group">{userInfo.services[0]}</Chip>
                </View>
            );
        }
    };
    const renderDepartments = () => {
        if (userInfo.departments.length > 1) {
            return (
                <SelectBox
                    key="department-box"
                    style={AttendanceFilterStyles.departmentButtons}
                    label="Department"
                    list={departmentButtons}
                    value={department}
                    onValueChange={setDepartment}
                />
            );
        } else {
            return (
                <View style={AttendanceFilterStyles.centerViewWrap}>
                    <Chip icon="account-multiple">{userInfo.departments[0]}</Chip>
                </View>
            );
        }
    };

    const onPress = () => {
        let teacherInfo = {};

        for (let index in userInfo.teachers) {
            let teacher = userInfo.teachers[index];

            if (teacher.email == teacherEmail) {
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
        if (userInfo.role !== "teacher") {
            let filteredTeachers = teachersList.filter((teacher) => {
                return teacher.center == center && teacher.service == service && teacher.department == department;
            });
            return (
                <View style={AttendanceFilterStyles.teacherBoxWrap}>
                    <SelectBox
                        key="teacher-box"
                        style={AttendanceFilterStyles.teacherButtons}
                        label="Teacher Name"
                        list={filteredTeachers}
                        value={teacherEmail}
                        onValueChange={setTeacherEmail}
                    />
                </View>
            );
        } else {
            return (
                <View style={AttendanceFilterStyles.centerViewWrap}>
                    <Chip icon="account">{userInfo.name}</Chip>
                </View>
            );
        }
    };

    return (
        <View id="attendanceFilterBar" style={AttendanceFilterStyles.attendanceFilterBar}>
            {renderCenters()}
            {renderServices()}
            {renderDepartments()}
            {renderTeachers()}
            {children[0]}
            {(props.filterButtonAlwaysOn || userInfo.role !== "teacher") && (
                <Button
                    style={AttendanceFilterStyles.teacherSelectButton}
                    mode="contained-tonal"
                    name="get_attendance"
                    key="get_attendance"
                    onPress={onPress}>
                    <Text>{props.filterButtonName}</Text>
                </Button>
            )}
        </View>
    );
};
