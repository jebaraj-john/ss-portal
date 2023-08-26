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

const Reports = (props) => {
    const [reportData, setreportData] = useState([]);
    const [showQuarterDropDown, setShowQuarterDropDown] = useState(false);
    const [quarter, setQuarter] = useState("");
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [responseData, setReponseData] = useState();

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const getReportInfo = async (teacherData) => {
        if (teacherData) {
            let email = teacherData.email;
            let center = teacherData.center;
            let reports_data = await getReports(email, center, quarter);

            setReponseData(reports_data);
            let formatted_data = formatReportData(reports_data);
            setreportData(formatted_data);
        }
    };

    return (
        <View style={ReportsStyles.container}>
            <TitleBar title="Reports" />

            <View style={ReportsStyles.filterPane}>
                <TeacherFilter
                    centers={props.centers}
                    services={props.services}
                    departments={props.departments}
                    role={props.role}
                    teachers={props.teachers}
                    userInfo={props.userInfo}
                    onValueChange={getReportInfo}></TeacherFilter>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", fontSize: 29 }}>
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
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                <Text style={{ fontSize: 17 }}>Classic View</Text>
            </View>
            <ScrollView style={ReportsStyles.tableContainer}>
                {!isSwitchOn && (
                    <View>
                        {reportData.map((row) => {
                            return (
                                <ReportCard
                                    name={row["StudName"]}
                                    att={row["att_list"]}
                                    key={row["StudId"]}
                                    present_count={row["present_days"]}
                                    absent_count={row["absent_days"]}></ReportCard>
                            );
                        })}
                    </View>
                )}
                {isSwitchOn && (
                    <View>
                        <ReportTable header={responseData[0]} data={responseData.slice(1)} />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export { Reports };
