'use strict';

import React from 'react';
import {
    SafeAreaView,
    View,
    Alert,
    FlatList,
} from 'react-native';

import { StudentsStyles } from '../themes/default';
import { Button, Text, SegmentedButtons } from 'react-native-paper';


const AttendanceButton = (props) => {
    const [value, setValue] = React.useState("");
    const attList = [
        {
            "label": "Present",
            "value": "P",
        },
        {
            "label": "Absent",
            "value": "A",
        }
    ];

    const onValueChange = (value) => {
        setValue(value);
        props.onValueChange(value);
    };

    return (
        <SegmentedButtons style={{width: 40, padding: 0}}
            value={value}
            onValueChange={onValueChange}
            buttons={attList}
        />
    );
};

const StudentsList = () => {
    const [data, setData] = React.useState([{"name": "test","att": 1, "id": "1"}])

    React.useEffect(() => {
        async function fetchMyAPI() {
            try {
                let response = await fetch("https://64ca4578700d50e3c7049d46.mockapi.io/attendence")
                let stud_list = await response.json();
                console.log(stud_list);
                setData(stud_list);
            }
            catch(error) {
                console.log(error);
            }
        }

        fetchMyAPI()
    }, [])


    const submitAtt = (e) => {
        console.log(data)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('https://64ca4578700d50e3c7049d46.mockapi.io/attendence', requestOptions)
          .then(response => response.json())
          .then(data =>  {
            Alert.alert('', 'Attendance submitted!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        });

    };


    const Item = ({item}) => (
        <View style={StudentsStyles.item}>
            <Text style={StudentsStyles.title}>{item.name}</Text>
            <AttendanceButton onValueChange={(value) => {item.att = value;}} />
        </View>
    );

    return (
        <SafeAreaView style={StudentsStyles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
            />
            <Button mode="contained-tonal" name="submit" key="submit" onPress={submitAtt.bind(this)} >
                <Text >Submit</Text>
            </Button>
        </SafeAreaView>
    );
};

export { StudentsList };