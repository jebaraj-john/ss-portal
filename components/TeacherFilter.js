import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Chip, Text } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { theme } from "../core/theme";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
    },
    searchText: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 6,
    },
    simpleText: {
        fontSize: 17,
        paddingLeft: 14,
    },
    simpleTextContent: {
        paddingTop: 10,
    },
    text: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10,
    },
});

const AttendanceFilterStyles = StyleSheet.create({
    attendanceFilterBar: {
        padding: 5,
    },
    centerButtons: {
        borderRadius: 5,
    },
    centerViewWrap: {
        borderRadius: 5,
    },
    departmentButtons: {
        borderRadius: 5,
        paddingLeft: 4,
        width: 120,
    },
    dropdownBox: {
        height: 40,
        width: 150,
    },
    dropdownBoxContentStyle: {
        fontSize: 14,
        margin: 0,
        paddingLeft: 5,
        textAlign: "justify",
    },
    serviceButtons: {
        borderRadius: 5,
    },
    splitFilterBar: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: 8,
    },
    splitFilterBarTwo: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 23,
    },
    teacherButtons: {
        width: 184,
    },
    teacherReportBtn: {
        alignItems: "flex-end",
        paddingRight: 6,
        paddingTop: 8,
    },
    teacherSelectButton: {
        color: theme.buttonText,
        height: 40,
        width: 150,
    },
    teacherSelectButtonLabel: {
        fontSize: 15,
        height: 20,
    },
});

export const TeacherFilter = (props, children) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleContent = () => {
        setIsCollapsed(!isCollapsed);
    };
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
                        style: [/* AttendanceFilterStyles.dropdownBox, */ props.selectBoxStyles],
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
                    style={[AttendanceFilterStyles.dropdownBox, AttendanceFilterStyles.centerButtons]}
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
                    style={[AttendanceFilterStyles.dropdownBox, AttendanceFilterStyles.serviceButtons]}
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
        toggleContent();
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

    const getTeacherName = () => {
        return "Anand";
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

    const renderButton = () => {
        return (
            <Button
                contentStyle={AttendanceFilterStyles.teacherSelectButton}
                labelStyle={AttendanceFilterStyles.teacherSelectButtonLabel}
                mode="contained"
                name="get_attendance"
                key="get_attendance"
                onPress={onPress}>
                {props.filterButtonName}
            </Button>
        );
    };

    if (userInfo.role !== "teacher" && userInfo.role !== "leader") {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={toggleContent}>
                    <View style={styles.text}>
                        <Text style={styles.searchText}>Search</Text>
                        <Text>
                            {isCollapsed ? (
                                <Icon name="chevron-down" type="font-awesome" size={20} color="black" />
                            ) : (
                                <Icon name="chevron-up" type="font-awesome" size={20} color="black" />
                            )}
                        </Text>
                    </View>
                </TouchableOpacity>
                {!isCollapsed && (
                    <View id="attendanceFilterBar" style={AttendanceFilterStyles.attendanceFilterBar}>
                        <View id="attendanceFilterBar" style={AttendanceFilterStyles.splitFilterBar}>
                            {renderCenters()}
                            {renderServices()}
                        </View>
                        <View id="attendanceFilterBar" style={AttendanceFilterStyles.splitFilterBarTwo}>
                            {renderDepartments()}
                            {renderTeachers()}
                        </View>
                        {children[0]}
                        <View id="attendanceFilterBar" style={AttendanceFilterStyles.splitFilterBar}>
                            {(props.filterButtonAlwaysOn || userInfo.role !== "teacher") && renderButton()}
                        </View>
                    </View>
                )}
                {isCollapsed && (
                    <View style={styles.simpleTextContent}>
                        <Text style={styles.simpleText}>
                            {center} | {service} | {department} | {getTeacherName()}
                        </Text>
                    </View>
                )}
            </View>
        );
    } else if (userInfo.role === "leader") {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={toggleContent}>
                    <View style={styles.text}>
                        <Text style={styles.searchText}>Search</Text>
                        <Text>
                            {isCollapsed ? (
                                <Icon name="chevron-down" type="font-awesome" size={20} color="black" />
                            ) : (
                                <Icon name="chevron-up" type="font-awesome" size={20} color="black" />
                            )}
                        </Text>
                    </View>
                </TouchableOpacity>
                {!isCollapsed && (
                    <View style={styles.content}>
                        <View id="attendanceFilterBar" style={AttendanceFilterStyles.attendanceFilterBar}>
                            <View id="attendanceFilterBar" style={AttendanceFilterStyles.splitFilterBar}>
                                {renderCenters()}
                                {renderServices()}
                                {renderDepartments()}
                            </View>
                            <View id="attendanceFilterBar" style={AttendanceFilterStyles.splitFilterBar}>
                                {renderTeachers()}
                            </View>
                            {children[0]}
                            <View id="attendanceFilterBar" style={AttendanceFilterStyles.splitFilterBar}>
                                {(props.filterButtonAlwaysOn || userInfo.role !== "teacher") && renderButton()}
                            </View>
                        </View>
                    </View>
                )}
                {isCollapsed && (
                    <View style={styles.simpleTextContent}>
                        <Text style={styles.simpleText}>
                            {center} | {service} | {department} | {getTeacherName()}
                        </Text>
                    </View>
                )}
            </View>
        );
    } else {
        if (props.filterButtonAlwaysOn) {
            return (
                <View id="attendanceFilterBar" style={AttendanceFilterStyles.attendanceFilterBar}>
                    <View style={styles.simpleTextContent}>
                        <Text style={styles.simpleText}>
                            {center} | {service} | {department} | {getTeacherName()}
                        </Text>
                    </View>
                    {children[0]}
                    <View id="attendanceFilterBar" style={AttendanceFilterStyles.teacherReportBtn}>
                        {(props.filterButtonAlwaysOn || userInfo.role !== "teacher") && renderButton()}
                    </View>
                </View>
            );
        } else {
            return (
                <View id="attendanceFilterBar" style={AttendanceFilterStyles.attendanceFilterBar}>
                    <View id="attendanceFilterBar" style={AttendanceFilterStyles.splitFilterBar}>
                        {renderCenters()}
                        {renderServices()}
                        {renderDepartments()}
                    </View>
                    <View id="attendanceFilterBar" style={AttendanceFilterStyles.splitFilterBar}>
                        {renderTeachers()}
                    </View>
                    {children[0]}
                    <View id="attendanceFilterBar" style={AttendanceFilterStyles.splitFilterBar}></View>
                </View>
            );
        }
    }
};
