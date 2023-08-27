import React from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import { Text, SegmentedButtons } from "react-native-paper";

import { StudentsStyles } from "../themes/default";

const AttendanceButton = (props) => {
    const [value, setValue] = React.useState("");
    const attList = [
        {
            label: "Present",
            value: "P",
        },
        {
            label: "Absent",
            value: "A",
        },
    ];

    const onValueChange = (value) => {
        setValue(value);
        props.onValueChange(value);
    };

    return (
        <SegmentedButtons
            style={{ width: 40, padding: 0 }}
            value={value ? value : props.defaultValue}
            onValueChange={onValueChange}
            buttons={attList}
        />
    );
};

const StudentsList = (props) => {
    let studList = props.studList;

    const onAttButtonChange = (item, value) => {
        item.att = value;
        props.onValueChange(studList);
    };

    const Item = ({ item }) => (
        <View style={StudentsStyles.item}>
            <Text style={StudentsStyles.title}>{item.name}</Text>
            <View style={StudentsStyles.attButtonWrap}>
                <AttendanceButton defaultValue={item.att} onValueChange={onAttButtonChange.bind(this, item)} />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={StudentsStyles.container}>
            <FlatList
                data={studList}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
};

export { StudentsList };
