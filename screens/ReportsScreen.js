import React, { useState } from "react";
import { Button, Text, View, ScrollView } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { Table, Row, Rows } from "react-native-reanimated-table";

import TitleBar from "../components/TitleBar";
import { quarterList } from "../data/reports_data";
import { ReportsStyles } from "../themes/default";

const state = {
    tableHead: ["Name", "06/08", "13/08", "20/08", "27/08"],
    tableData: [
        ["Dans", "A", "P", "P", "P"],
        ["Harap", "P", "P", "P", "P"],
        ["Mark", "P", "P", "P", "P"],
        ["John", "P", "A", "P", "P"],
        ["Luke", "P", "A", "P", "P"],
    ],
};

const Reports = () => {
    const [showQuarterDropDown, setShowQuarterDropDown] = useState(false);
    const [quarter, setQuarter] = useState("");
    const coolBlue = "#c8e1ff";

    return (
        <View style={ReportsStyles.container}>
            <TitleBar title="Reports" />
            <View style={ReportsStyles.filterPane}>
                <Text style={ReportsStyles.attSelectorLabel}>Quarter</Text>
                <View style={ReportsStyles.attRangeSelector}>
                    <DropDown
                        label="Quarter"
                        mode="outlined"
                        visible={showQuarterDropDown}
                        showDropDown={() => setShowQuarterDropDown(true)}
                        onDismiss={() => setShowQuarterDropDown(false)}
                        value={quarter}
                        setValue={setQuarter}
                        list={quarterList}
                    />
                </View>

                <Text style={ReportsStyles.teacherNameLabel}>Teacher Name</Text>
                <View style={ReportsStyles.teacherNameSelector} />
                <Button title="Submit" />
            </View>
            <ScrollView style={ReportsStyles.tableContainer}>
                <Table borderStyle={{ borderWidth: 2, borderColor: coolBlue }}>
                    <Row data={state.tableHead} style={ReportsStyles.tableHead} />
                    <Rows data={state.tableData} />
                </Table>
            </ScrollView>
        </View>
    );
};

export { Reports };
