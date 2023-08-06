import React, { useState } from 'react'
import { Button, Text, View} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ReportsStyles } from '../themes/default';
import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
//import { Table, Row, Rows } from 'react-native-table-component';
import { Table, Row, Rows } from 'react-native-reanimated-table';
import { ScrollView } from "react-native";

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
    return (
        <View style={ReportsStyles.container}>
            <View style={ReportsStyles.filterPane} >
                <Text style={ReportsStyles.attSelectorLabel}>Quarter</Text>
                <View style={ReportsStyles.attRangeSelector}>
                    <Text> Select</Text>
                    {/* <RNPickerSelect
                        onValueChange={(value) => { console.log(value); }}
                        items={[
                            { label: 'Q1', value: 'Q1' },
                            { label: 'Q2', value: 'Q2' },
                            { label: 'Q3', value: 'Q3' },
                            { label: 'Q4', value: 'Q4' },
                        ]}
                    /> */}
                </View>

                <Text style={ReportsStyles.teacherNameLabel}>Teacher Name</Text>
                <View style={ReportsStyles.teacherNameSelector}>
                {/* <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                /> */}
                    {/* <RNPickerSelect
                        onValueChange={(value) => { console.log(value); }}
                        items={[
                            { label: 'Harry Potter', value: 'harry@gmail.com' },
                            { label: 'Mark Hendry', value: 'hendry@gmail.com' },
                        ]}
                    /> */}
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
