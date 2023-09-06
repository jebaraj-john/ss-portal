import React, { useState } from "react";
import { Text, View } from "react-native";
import { ReportsStyles } from "../themes/default";
import DropDown from "react-native-paper-dropdown";
import { ScrollView } from "react-native";
import TitleBar from "../components/TitleBar";
import ReportCard from "../components/ReportCard";
import { getReports } from "../services/services";
import { TeacherFilter } from "../components/TeacherFilter";
import { formatReportData } from "../services/services";
import ReportTable from "../components/ReportTable";
import { Switch } from "react-native-paper";
import Loader from "../components/Loader";

const Reports = (props) => {
    const [reportData, setreportData] = useState([]);
    const [showQuarterDropDown, setShowQuarterDropDown] = useState(false);
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

    const getReportInfo = async (teacherData) => {
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
            console.log(reportData);
            setLoader(false);
        }
    };

    return (
        <View style={ReportsStyles.container}>
            <TitleBar title="Reports" />
            <View style={ReportsStyles.filterPane}>
                <TeacherFilter
                    userInfo={props.userInfo}
                    filterButtonName={"Get Reports"}
                    filterButtonAlwaysOn={true}
                    onValueChange={getReportInfo}></TeacherFilter>
            </View>
            <Loader show={isLoading} />
            <View
                style={{
                    flexDirection: "row",
                    fontSize: 29,
                    justifyContent: "space-between",
                    paddingLeft: 5,
                    paddingRight: 5,
                }}>
                <DropDown
                    key="quarter-drop"
                    label={"Quarter"}
                    mode={"outlined"}
                    visible={showQuarterDropDown}
                    value={quarter}
                    setValue={setQuarter}
                    list={[
                        { label: "Q1", value: "Q1" },
                        { label: "Q2", value: "Q2" },
                        { label: "Q3", value: "Q3" },
                        { label: "Q4", value: "Q4" },
                    ]}
                    showDropDown={() => setShowQuarterDropDown(true)}
                    onDismiss={() => setShowQuarterDropDown(false)}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                    <Text style={{ fontSize: 17 }}>Classic View</Text>
                </View>
            </View>
            <ScrollView style={ReportsStyles.tableContainer}>
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
    );
};

export { Reports };
