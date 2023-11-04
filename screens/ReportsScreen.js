import React, { useState } from "react";
import { Text, View } from "react-native";
import { ReportsStyles } from "../themes/default";
import { ScrollView } from "react-native";
import TitleBar from "../components/TitleBar";
import ReportCard from "../components/ReportCard";
import { getReports } from "../services/services";
import { TeacherFilter } from "../components/TeacherFilter";
import { formatReportData } from "../services/services";
import ReportTable from "../components/ReportTable";
import { Switch } from "react-native-paper";
import Loader from "../components/Loader";
import { ToggleButton } from "react-native-paper";
import { theme } from "../core/theme";
import Background from "../components/Background.js";
import { HomeScreenStyles } from "../themes/default.js";

const Reports = (props) => {
    const [reportData, setreportData] = useState([]);
    const [quarter, setQuarter] = useState("Q1");
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [responseData, setReponseData] = useState([]);

    const [isLoading, setLoader] = useState(false);

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    };
    const addTotalAttendance = (reportData) => {
        reportData[0][reportData[0].length] = "Total";
        for (let i = 1; i < reportData.length; i++) {
            let row = reportData[i].slice(2, reportData.length);
            let attCount = row.reduce((atCount, att_data) => {
                return att_data === "P" ? atCount + 1 : atCount;
            }, 0);
            reportData[i][reportData[i].length] = attCount;
        }

        return reportData;
    };

    const [isVisible, setViewVisible] = React.useState(false);

    const getReportInfo = async (teacherData) => {
        setViewVisible(true);
        let teacherInfo = props.userInfo;
        teacherInfo["center"] = props.userInfo.centers[0];
        teacherData = props.userInfo.role === "teacher" ? teacherInfo : teacherData;
        if (teacherData && teacherData.email && teacherData.center && quarter) {
            setLoader(true);
            let email = teacherData.email;
            let center = teacherData.center;
            let reports_data = await getReports(email, center, quarter);
            let formatted_data = formatReportData(reports_data);
            reports_data = addTotalAttendance(reports_data);
            setReponseData(reports_data);
            setreportData(formatted_data);
            setLoader(false);
        }
    };

    return (
        <Background style={HomeScreenStyles.container}>
            <View style={ReportsStyles.container}>
                <TitleBar title="Reports" />
                <View style={{ padding: 5, paddingTop: 15 }}>
                    <View style={ReportsStyles.quaterSelection}>
                        <Text style={ReportsStyles.quaterText}>Quarter :</Text>
                        <ToggleButton.Row onValueChange={(value) => setQuarter(value)} value={quarter}>
                            <ToggleButton
                                icon="numeric-1-circle"
                                iconColor={theme.colors.primary}
                                style={ReportsStyles.quaterToggleBtn}
                                value="Q1"
                            />
                            <ToggleButton
                                icon="numeric-2-circle"
                                iconColor={theme.colors.primary}
                                style={ReportsStyles.quaterToggleBtn}
                                value="Q2"
                            />
                            <ToggleButton
                                icon="numeric-3-circle"
                                iconColor={theme.colors.primary}
                                style={ReportsStyles.quaterToggleBtn}
                                value="Q3"
                            />
                            <ToggleButton
                                icon="numeric-4-circle"
                                iconColor={theme.colors.primary}
                                style={ReportsStyles.quaterToggleBtn}
                                value="Q4"
                            />
                        </ToggleButton.Row>
                    </View>
                </View>
                <View>
                    <TeacherFilter
                        userInfo={props.userInfo}
                        filterButtonName={"Get Reports"}
                        filterButtonAlwaysOn={true}
                        onValueChange={getReportInfo}></TeacherFilter>
                </View>
                <Loader show={isLoading} />

                <ScrollView style={ReportsStyles.tableContainer}>
                    {isVisible && (
                        <View style={ReportsStyles.viewBtn}>
                            <Text style={{ fontSize: 17 }}>Classic View</Text>
                            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                        </View>
                    )}
                    {!isSwitchOn && (
                        <View>
                            {reportData.map((row, index) => {
                                return (
                                    <ReportCard
                                        key={`card-id-${index}}`}
                                        name={row["StudName"]}
                                        att={row["att_list"]}
                                        present_count={row["present_days"]}
                                        absent_count={row["absent_days"]}></ReportCard>
                                );
                            })}
                        </View>
                    )}
                    {isSwitchOn && (
                        <View>
                            {responseData.length > 1 ? (
                                <ReportTable header={responseData[0]} data={responseData.slice(1)} />
                            ) : (
                                <></>
                            )}
                        </View>
                    )}
                </ScrollView>
            </View>
        </Background>
    );
};

export { Reports };
