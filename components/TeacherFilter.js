import React, { useState } from "react";
import { View } from "react-native";
import { Button, Chip, Text } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

import { AttendanceFilterStyles } from "../themes/default";

export const TeacherFilter = (props, children) => {
    const defaultTeacherMail = props.role == "teacher" ? props.userInfo.email : "";
    const [teacherEmail, setTeacherEmail] = useState(defaultTeacherMail);

    const [center, setCenter] = useState(props.centers[0]);
    const createButton = (data) => {
        return { label: data, value: data };
    };
    const centerButtons = props.centers.map(createButton);
    const teachersList = props.teachers.map((teacher) => {
        teacher["label"] = teacher.name;
        teacher["value"] = teacher.email;
        return teacher;
    });
    const [service, setService] = useState(props.services[0]);
    const serviceButtons = props.services.map(createButton);
    const [department, setDepartment] = useState(props.departments[0]);
    const departmentButtons = props.departments.map(createButton);

    const SelectBox = (props) => {
        const [showDrop, setShowDrop] = useState(false);
        const [value, setValue] = useState(props.value);
        const onValueChange = (value) => {
            setValue(value);
            if (props.onValueChange) {
                props.onValueChange(value);
            }
        };
        return (
            <View style={props && props.style}>
                <DropDown
                    label={props.label}
                    mode={"outlined"}
                    visible={showDrop}
                    value={value}
                    setValue={onValueChange}
                    list={props.list}
                    showDropDown={() => setShowDrop(true)}
                    onDismiss={() => setShowDrop(false)}
                />
            </View>
        );
    };

    const renderCenters = () => {
        if (props.centers.length > 1) {
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
                    <Chip selected={true} showSelectedCheck={true}>
                        {props.centers[0]}
                    </Chip>
                </View>
            );
        }
    };

    const renderServices = () => {
        if (props.services.length > 1) {
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
                    <Chip icon="heart">{props.services[0]}</Chip>
                </View>
            );
        }
    };
    const renderDepartments = () => {
        if (props.departments.length > 1) {
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
                    <Chip icon="heart">{props.departments[0]}</Chip>
                </View>
            );
        }
    };

    const onPress = () => {
        let teacherInfo = {};

        for (let index in props.teachers) {
            let teacher = props.teachers[index];

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
        if (props.role !== "teacher") {
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
                    <Chip icon="heart">{props.userInfo.name}</Chip>
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
            {props.role !== "teacher" && (
                <Button
                    style={AttendanceFilterStyles.teacherSelectButton}
                    mode="contained-tonal"
                    name="get_attendance"
                    key="get_attendance"
                    onPress={onPress}>
                    <Text>Get Attendance</Text>
                </Button>
            )}
        </View>
    );
};
