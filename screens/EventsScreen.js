import { EventsStyles } from '../themes/default';
import { View, TouchableOpacity} from "react-native";
import React, { useState, useEffect } from "react";

import { buttons } from "../data/events_data";
import { getEvent, filterEvent } from "../services/services";
import { ScrollView, StyleSheet } from "react-native";

import { useTheme } from 'react-native-paper';
import { Button, Card, Text } from 'react-native-paper';

const EventsScreen = () => {
  const theme = useTheme();
  const [filteredEvent, setFilteredEvent] = useState(null);
  useEffect(() => {
    setFilteredEvent(getEvent());
  }, []);

  function handleEvent(e) {
    let typeEvent = e;
    console.log(e);
    typeEvent !== "all" ? setFilteredEvent(filterEvent(typeEvent)) : setFilteredEvent(getEvent());
  }

  const [activeButtonIndex, setActiveButtonIndex] = useState(null);

  function handleEvent(value, index) {
    let typeEvent = value;
    setActiveButtonIndex(index)
    typeEvent !== "all" ? setFilteredEvent(filterEvent(typeEvent)) : setFilteredEvent(getEvent());
  }
  return (
    <View style={EventsStyles.container}>
      <View style={EventsStyles.filterBadges}>
        {
          buttons && buttons.map((type, index) => (
            <Button mode="contained-tonal" name={type.value} key={type.value}
              style={[
                EventsStyles.filterBadgeButton,
                index === activeButtonIndex && EventsStyles.filterBadgeButtonActive,
              ]}
              onPress={() => handleEvent(type.value, index)}>
              <Text style={[
                EventsStyles.filterBadgeText,
                index === activeButtonIndex && EventsStyles.filterBadgeTextActive,
              ]}>{type.name}</Text>
            </Button>
          ))
        }
      </View>
        <ScrollView style={EventsStyles.eventsContainer}>
      {filteredEvent &&
        filteredEvent.map(type => {
          return (
                <View key={type.id}>                
                <Card mode = "elevated" style={EventsStyles.eventsCard} contentStyle={EventsStyles.eventsCardContent}>
                  <Card.Title title={type.name} subtitle={type.date} titleStyle={EventsStyles.eventsCardTitle} subtitleStyle={EventsStyles.eventsCardSubTitle}/>
                  <Card.Content>
                    <Text variant="bodySmall" style={EventsStyles.eventsCardTitle}>X days to go</Text>
                  </Card.Content>
                </Card>
              </View>

                );
        })}
        </ScrollView>
        </View>
  );
}

//styles to see the data more clearly

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 50,
    },
    item: {
      padding: 20,
      fontSize: 15,
      marginTop: 5,
    }
  });

export {EventsScreen};


