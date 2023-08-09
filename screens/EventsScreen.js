import { EventsStyles } from '../themes/default';
import { Button, Text, View, TouchableOpacity} from "react-native";
import React, { useState, useEffect } from "react";

import { buttons } from "../data/events_data";
import { getEvent, filterEvent } from "../services/services";


import { ScrollView, StyleSheet } from "react-native";

const EventsScreen = () => {
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
    //console.log(value);
    setActiveButtonIndex(index)
    typeEvent !== "all" ? setFilteredEvent(filterEvent(typeEvent)) : setFilteredEvent(getEvent());
  }
  return (
    <>
      <View style={EventsStyles.filterBadges}>
        {
          buttons && buttons.map((type, index) => (
            <TouchableOpacity name={type.value}
              style={[
                EventsStyles.filterBadgeButton,
                index === activeButtonIndex && EventsStyles.filterBadgeButtonActive,
              ]}
              onPress={() => handleEvent(type.value, index)}>
              <Text style={EventsStyles.filterBadgeText}>{type.name}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
        <ScrollView style={EventsStyles.tableContainer}>
      {filteredEvent &&
        filteredEvent.map(type => {
          return (
                <View key={type.id}>
                    <Text style={styles.item}>{type.name}</Text>
                </View>
                );
        })}
        </ScrollView>
    </>
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


