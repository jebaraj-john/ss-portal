import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Button, Text } from "react-native-paper";

import { StudentsList } from "../components/Students.js";
import { TeacherFilter } from "../components/TeacherFilter";
import TitleBar from "../components/TitleBar.js";
import { GetStudents, PostAttendance } from "../services/services.js";
import { HomeScreenStyles } from "../themes/default.js";
import Loader from "../components/Loader.js";
import { UserContext } from "../User.js";

function HomeScreen() {
    const userInfo = React.useContext(UserContext);
    const [teacherInfo, setTeacherInfo] = useState(userInfo.role == "teacher" ? userInfo : {});
    const [isLoading, setLoader] = useState(false);
    const [attData, setAttData] = useState([]);

    const [studList, setStudList] = React.useState([]);

    React.useEffect(() => {
        async function fetchMyAPI() {
            try {
                console.log("I am here", teacherInfo);
                setLoader(true);
                let center =
                    teacherInfo.role == "teacher" && teacherInfo.centers ? teacherInfo.centers[0] : teacherInfo.center;
                const studList = await GetStudents(teacherInfo.email, center);
                setStudList(studList);
                console.log(studList);
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
        console.log(attRecords);
        try {
            await PostAttendance(attRecords);
            Alert.alert("", "Attendance submitted!", [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
        } catch (error) {
            console.log(error);
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
            <Loader show={isLoading} />
            <TitleBar title="Home" />
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
        </View>
    );
}

export { HomeScreen };
