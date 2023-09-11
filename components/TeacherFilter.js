import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Chip } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { theme } from "../core/theme";

const AttendanceFilterStyles = StyleSheet.create({
    attendanceFilterBar: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 5,
        padding: 0,
    },
    centerButtons: {
        alignItems: "center",
        borderRadius: 5,
        padding: 5,
    },
    centerViewWrap: {
        alignItems: "center",
        borderRadius: 5,
        padding: 5,
    },
    departmentBox: {
        width: 120,
    },
    departmentButtons: {
        alignItems: "center",
        borderRadius: 5,
        padding: 5,
    },
    dropdownBox: {
        height: 30,
        width: 140,
    },
    dropdownBoxContentStyle: {
        fontSize: 12,
        margin: 0,
        paddingLeft: 5,
        textAlign: "justify",
    },
    serviceButtons: {
        alignItems: "center",
        borderRadius: 5,
        padding: 5,
    },
    teacherBox: {
        width: 200,
    },
    teacherSelectButton: {
        color: theme.buttonText,

        fontSize: 11,
        paddingTop: 0,
    },
    teacherSelectButtonLabel: {
        fontSize: 13,
        height: 20,
    },
});

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
                    inputProps={{
                        style: [AttendanceFilterStyles.dropdownBox, props.selectBoxStyles],
                        activeOutlineColor: theme.colors.primary,
                        outlineColor: theme.colors.primary,
                        textColor: theme.colors.primary,
                        contentStyle: AttendanceFilterStyles.dropdownBoxContentStyle,
                    }}
                    label={props.label}
                    mode={"outlined"}
                    visible={showDrop}
                    value={value}
                    setValue={onValueChange}
                    list={props.list}
                    showDropDown={() => setShowDrop(true)}
                    onDismiss={() => setShowDrop(false)}
                    width={100}
                />
            </View>
        );
    };

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
                    selectBoxStyles={AttendanceFilterStyles.departmentBox}
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
                        selectBoxStyles={AttendanceFilterStyles.teacherBox}
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
                    contentStyle={AttendanceFilterStyles.teacherSelectButton}
                    labelStyle={AttendanceFilterStyles.teacherSelectButtonLabel}
                    mode="contained"
                    name="get_attendance"
                    key="get_attendance"
                    onPress={onPress}>
                    {props.filterButtonName}
                </Button>
            )}
        </View>
    );
};
