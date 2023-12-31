import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { ToggleButton } from "react-native-paper";
import { StudentsStyles } from "../themes/default";

const attedanceBtnStyles = StyleSheet.create({
    button: {
        width: 80,
    },
    toggleBtn: {
        paddingRight: 10,
    },
});

const AttendanceButton = (props) => {
    const [attedance, setAttedance] = React.useState(props.defaultValue);

    const onValueChange = (value) => {
        setAttedance(value);
        props.onValueChange(value);
    };

    return (
        <View style={attedanceBtnStyles.toggleBtn}>
            <ToggleButton.Row onValueChange={(value) => onValueChange(value)} value={attedance}>
                <ToggleButton
                    icon="alpha-p-circle"
                    iconColor={StudentsStyles.iconColor.present}
                    style={attedanceBtnStyles.button}
                    value="P"
                />
                <ToggleButton
                    icon="alpha-a-circle"
                    iconColor={StudentsStyles.iconColor.absent}
                    style={attedanceBtnStyles.button}
                    value="A"
                />
            </ToggleButton.Row>
        </View>
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
            <View style={StudentsStyles.titleWrap}>
                <Text style={StudentsStyles.title}>{item.name}</Text>
                <Text style={StudentsStyles.titleId}>{item.id}</Text>
            </View>
            <View>
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
