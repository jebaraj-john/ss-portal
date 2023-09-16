import React, { useState } from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import { Button, Text, FAB } from "react-native-paper";

import { StudentsList } from "../components/Students.js";
import { TeacherFilter } from "../components/TeacherFilter";
import TitleBar from "../components/TitleBar.js";
import { GetStudents, PostAttendance } from "../services/services.js";
import { HomeScreenStyles } from "../themes/default.js";
import Loader from "../components/Loader.js";
import { UserContext } from "../User.js";
import Background from "../components/Background.js";
import { findAttendanceDate } from "../utils/Utils.js";
import { theme } from "../core/theme.js";

function HomeScreen() {
    const userContext = React.useContext(UserContext);
    const userInfo = userContext.userInfo;
    const navigation = userContext.navigation;
    const [teacherInfo, setTeacherInfo] = useState(userInfo.role == "teacher" ? userInfo : {});
    const [isLoading, setLoader] = useState(false);
    const [attData, setAttData] = useState([]);

    const [studList, setStudList] = React.useState([]);

    React.useEffect(() => {
        async function fetchMyAPI() {
            try {
                console.log("I am here", teacherInfo);
                let centers = teacherInfo.centers;
                setLoader(true);
                let center = teacherInfo.role == "teacher" && centers ? centers[0] : teacherInfo.center;
                const studList = await GetStudents(teacherInfo.email, center);
                console.log(studList);
                setStudList(studList);
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }

        if (teacherInfo.email) {
            fetchMyAPI();
        }
    }, [teacherInfo]);

    const getTeacherInfo = (teacherData) => {
        if (teacherData) {
            setTeacherInfo(teacherData);
        }
    };

    const submitAtt = async () => {
        setLoader(true);
        const attRecords = createAttendanceData(attData, teacherInfo.email);
        try {
            await PostAttendance(attRecords);
            Alert.alert("", "Attendance submitted!", [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
            // prevStudList.current = studList;
        } catch (error) {
            console.log("Post Attendance error", JSON.stringify(error));
        } finally {
            setLoader(false);
        }
    };

    const createAttendanceData = (attRecords, teacherEmail, date = null) => {
        const attendanceData = {
            type: "update_attendance",
            teacher_email: teacherEmail,
            att_data: [],
        };

        if (date) {
            attendanceData["date"] = date;
        }

        attRecords.forEach((attRecord) => {
            attendanceData.att_data.push({
                id: attRecord.id,
                att: attRecord.att,
                name: attRecord.name,
            });
        });

        return attendanceData;
    };

    return (
        <View style={HomeScreenStyles.container}>
            <Background style={HomeScreenStyles.container}>
                <Loader show={isLoading} />
                <TitleBar title="Home" navigation={navigation} />
                <TouchableOpacity style={HomeScreenStyles.fab}>
                    <FAB
                        icon="plus"
                        style={HomeScreenStyles.fab}
                        onPress={() => navigation.navigate("AddStudent")}
                        theme={theme}
                    />
                </TouchableOpacity>

                <View>
                    <Text variant="titleLarge">Date: {findAttendanceDate()}</Text>
                </View>
                <TeacherFilter
                    userInfo={userInfo}
                    onValueChange={getTeacherInfo}
                    filterButtonName="Get Attendance"
                    filterButtonAlwaysOn={false}
                />

                <StudentsList
                    studList={studList}
                    onValueChange={(item) => {
                        console.log(item);
                        setAttData(item);
                    }}
                />
                <Button mode="contained-tonal" name="submit" key="submit" onPress={submitAtt.bind(this)}>
                    <Text>Submit</Text>
                </Button>
            </Background>
        </View>
    );
}

export { HomeScreen };
