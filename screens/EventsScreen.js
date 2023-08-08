import { EventsStyles } from '../themes/default';
import { Button, Text, View} from "react-native";
import React, { useState, useEffect } from "react";

import { buttons } from "../data/events_data";
import { getEvent, filterEvent } from "../services/services";

import { ScrollView, StyleSheet } from "react-native";

const EventsScreen = () => {
  const [filteredEvent, setFiltredEvent] = useState(null);
  useEffect(() => {
    setFiltredEvent(getEvent());
  }, []);

  function handleEvent(e, ) {
    let typeEvent = e;
    console.log(e);
    typeEvent !== "all"
      ? setFiltredEvent(filterEvent(typeEvent))
      : setFiltredEvent(getEvent());
  }

  return (
    <>
      {buttons &&
        buttons.map((type) => (

            <Button key={type.name} value={type.value} onPress={() => handleEvent(type.value)}
            title={type.name}>
              
            </Button>

        ))}
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


