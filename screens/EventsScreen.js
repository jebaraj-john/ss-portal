import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { getEvent, filterEvent } from "../services/services";
import { ScrollView } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import TitleBar from "../components/TitleBar";
import { EventsStyles } from "../themes/default";
import Background from "../components/Background.js";
import { HomeScreenStyles } from "../themes/default.js";
let allEventDetails = [];

const EventsScreen = () => {
    const [filteredEvent, setFilteredEvent] = useState([]);
    const [eventBtn, setEventBtn] = useState(null);

    const [activeButtonIndex, setActiveButtonIndex] = useState(null);

    useEffect(() => {
        async function fetchMyAPI() {
            try {
                const userDet = await getEvent();
                setFilteredEvent(userDet.events);
                allEventDetails = userDet.events;
                let allEvent = userDet.events_types;
                let eventBtn = [];
                allEvent.forEach((val, index) => {
                    eventBtn[index] = {
                        name: val,
                        value: val,
                    };
                });
                eventBtn.unshift({
                    name: "All",
                    value: "All",
                });
                setEventBtn(eventBtn);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMyAPI();
    }, []);

    function handleEvent(value, index) {
        let typeEvent = value;
        setActiveButtonIndex(index);
        typeEvent !== "All"
            ? setFilteredEvent(filterEvent(typeEvent, allEventDetails))
            : setFilteredEvent(allEventDetails);
    }

    return (
        <Background style={HomeScreenStyles.container}>
            <View style={EventsStyles.container}>
                <TitleBar title="Events" />
                <View style={EventsStyles.filterBadges}>
                    {eventBtn &&
                        eventBtn.map((type, index) => (
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
                                <View key={`${type.Name}${type.StartDate}`}>
                                    <Card
                                        mode="elevated"
                                        style={EventsStyles.eventsCard}
                                        contentStyle={EventsStyles.eventsCardContent}>
                                        <Card.Title
                                            title={type.Name}
                                            subtitle={type.StartDate}
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
        </Background>
    );
};

export { EventsScreen };
