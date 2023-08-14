import React, {useState} from 'react';
import { Text, View, SafeAreaView, Button } from "react-native";

class DateWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            show: true,
            mode: "date",
        };
    }

    render () {
        const onChange = (event, selectedDate) => {
          const currentDate = selectedDate;
          this.setState({
            date: currentDate,
            show: true,
            mode: "date",
          });
          this.props.onChange(currentDate)
        };

        return (
            <View>
                <SafeAreaView>
                    <Text>selected: </Text>
                </SafeAreaView>
            </View>
        );
    }
}



export {DateWidget};