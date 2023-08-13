import React, { useState } from 'react'
import { Button, Text, View} from "react-native";

import { ReportsStyles } from '../themes/default';
import DropDown from "react-native-paper-dropdown";
import { Table, Row, Rows } from 'react-native-reanimated-table';
import { ScrollView } from "react-native";
import {quarterList}  from "../data/reports_data";
import TitleBar from '../components/TitleBar';

state = {
    tableHead: ['Name', '06/08', '13/08', '20/08', '27/08'],
    tableData: [
      ['Dans', 'A', 'P', 'P', 'P'],
      ['Harap', 'P', 'P', 'P', 'P'],
      ['Mark', 'P', 'P', 'P', 'P'],
      ['John', 'P', 'A', 'P', 'P'],
      ['Luke', 'P', 'A', 'P', 'P'],
    ]
  }

const Reports = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Harry Potter', value: 'harry@gmail.com' },
    { label: 'Mark Hendry', value: 'hendry@gmail.com' },
]);

const [nightMode, setNightmode] = useState(false);
  const [showQuarterDropDown, setShowQuarterDropDown] = useState(false);
  const [quarter, setQuarter] = useState("");

    return (
        <View style={ReportsStyles.container}>
          <TitleBar title="Reports"/>
            <View style={ReportsStyles.filterPane} >
                <Text style={ReportsStyles.attSelectorLabel}>Quarter</Text>
                <View style={ReportsStyles.attRangeSelector}>
                <DropDown
                    label={"Quarter"}
                    mode={"outlined"}
                    visible={showQuarterDropDown}
                    showDropDown={() => setShowQuarterDropDown(true)}
                    onDismiss={() => setShowQuarterDropDown(false)}
                    value={quarter}
                    setValue={setQuarter}
                    list={quarterList}
                />
                </View>

                <Text style={ReportsStyles.teacherNameLabel}>Teacher Name</Text>
                <View style={ReportsStyles.teacherNameSelector}>


                </View>
                <Button title="Submit" />
            </View>
            <ScrollView style={ReportsStyles.tableContainer}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={state.tableHead} style={ReportsStyles.tableHead} />
                    <Rows data={state.tableData} />
                </Table>
            </ScrollView>

        </View>
    );
};

export { Reports};
