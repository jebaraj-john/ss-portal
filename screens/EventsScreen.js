import { View } from "react-native";
import React, { useState, useEffect } from "react";

import { buttons } from "../data/events_data";
import { getEvent, filterEvent } from "../services/services";
import { ScrollView } from "react-native";

import { Button, Card, Text } from "react-native-paper";
import TitleBar from "../components/TitleBar";
import { EventsStyles } from "../themes/default";

const EventsScreen = () => {
    const [filteredEvent, setFilteredEvent] = useState(null);
    useEffect(() => {
        setFilteredEvent(getEvent());
    }, []);

    const [activeButtonIndex, setActiveButtonIndex] = useState(null);

    function handleEvent(value, index) {
        let typeEvent = value;
        setActiveButtonIndex(index);
        typeEvent !== "all" ? setFilteredEvent(filterEvent(typeEvent)) : setFilteredEvent(getEvent());
    }
    return (
        <View style={EventsStyles.container}>
            <TitleBar title="Events" />
            <View style={EventsStyles.filterBadges}>
                {buttons &&
                    buttons.map((type, index) => (
                        <Button
                            mode="contained-tonal"
                            name={type.value}
                            key={type.value}
                            style={[
                                EventsStyles.filterBadgeButton,
                                index === activeButtonIndex && EventsStyles.filterBadgeButtonActive,
                            ]}
                            onPress={() => handleEvent(type.value, index)}>
                            <Text
                                style={[
                                    EventsStyles.filterBadgeText,
                                    index === activeButtonIndex && EventsStyles.filterBadgeTextActive,
                                ]}>
                                {type.name}
                            </Text>
                        </Button>
                    ))}
            </View>
            <ScrollView style={EventsStyles.eventsContainer}>
                {filteredEvent &&
                    filteredEvent.map((type) => {
                        return (
                            <View key={type.id}>
                                <Card
                                    mode="elevated"
                                    style={EventsStyles.eventsCard}
                                    contentStyle={EventsStyles.eventsCardContent}>
                                    <Card.Title
                                        title={type.name}
                                        subtitle={type.date}
                                        titleStyle={EventsStyles.eventsCardTitle}
                                        subtitleStyle={EventsStyles.eventsCardSubTitle}
                                    />
                                    <Card.Content>
                                        <Text variant="bodySmall" style={EventsStyles.eventsCardTitle}>
                                            X days to go
                                        </Text>
                                    </Card.Content>
                                </Card>
                            </View>
                        );
                    })}
            </ScrollView>
        </View>
    );
};



export { EventsScreen };
