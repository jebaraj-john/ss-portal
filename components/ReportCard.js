import { Card, Text } from "react-native-paper";
import React from "react";
import AttendanceDate from "./AttendanceDate";
import { View } from "react-native";
import { EventsStyles } from "../themes/default";

const ReportCard = (props) => {
    const AttendanceCount = ({ present, absent }) => {
        return (
            <View style={{ flexDirection: "row" }}>
                <View>
                    <Text variant="labelLarge">Total Days : {props.att.length}&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                </View>
                <View>
                    <Text variant="labelLarge">Present :{present}&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                </View>
                <View>
                    <Text variant="labelLarge">Absent : {absent}&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                </View>
            </View>
        );
    };
    const formatDate = (date) => {
        return date.split("/").slice(0, 2).join("/");
    };

    return (
        <Card mode="elevated" style={EventsStyles.eventsCard} contentStyle={EventsStyles.eventsCardContent}>
            <Card.Title
                title={props.name}
                subtitle={<AttendanceCount present={props.present_count} absent={props.absent_count} />}
            />
            <Card.Content style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {props.att.map((ele, index) => (
                        <AttendanceDate
                            status={Object.values(ele)[0]}
                            key={"attdate-" + index + props.name}
                            date={formatDate(Object.keys(ele)[0])}
                        />
                    ))}
                </View>
            </Card.Content>
        </Card>
    );
};

export default ReportCard;
