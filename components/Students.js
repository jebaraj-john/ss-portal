"use strict";

import React from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import { ActivityIndicator, Text, SegmentedButtons } from "react-native-paper";

import { GetStudents } from "../services/services";
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
    const [data, setData] = React.useState([]);
    const [isLoading, setLoader] = React.useState(false);
    React.useEffect(() => {
        async function fetchMyAPI() {
            try {
                setLoader(true);
                const studList = await GetStudents(props.teacherInfo.email, props.center);
                setData(studList);
                console.log(studList);
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }

        if (props.teacherInfo.email) {
            fetchMyAPI();
        }
    }, [props.teacherInfo]);
    const onAttButtonChange = (item, value) => {
        item.att = value;
        props.onValueChange(data);
    };

    const Item = ({ item }) => (
        <View style={StudentsStyles.item}>
            <Text style={StudentsStyles.title}>{item.name}</Text>
            <AttendanceButton defaultValue={item.att} onValueChange={onAttButtonChange.bind(this, item)} />
        </View>
    );

    return (
        <SafeAreaView style={StudentsStyles.container}>
            <ActivityIndicator animating={isLoading} />
            <FlatList data={data} renderItem={({ item }) => <Item item={item} />} keyExtractor={(item) => item.id} />
        </SafeAreaView>
    );
};

export { StudentsList };
