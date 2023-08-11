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
import {urls} from "../config";


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
            value={value ? value : props.defaultValue}
            onValueChange={onValueChange}
            buttons={attList}
        />
    );
};

const StudentsList = (props) => {
    const [data, setData] = React.useState([])

    const get_attendance_url = `${urls.attendance_url}?type=get_attendance&email=${props.teacherEmail}`
    console.log(get_attendance_url)
    React.useEffect(() => {
        async function fetchMyAPI() {
            try {
                let response = await fetch(get_attendance_url)
                let stud_list = await response.json();
                console.log(stud_list);
                setData(stud_list);
            }
            catch(error) {
                console.log(error);
            }
        }

        fetchMyAPI()
    }, []);

    const createAttendanceData = (attRecords, teacherEmail, date=null) => {
        let attendanceData = {
            "type": "update_attendance",
            "teacher_email": teacherEmail,
            "att_data": [],
        };

        if(date) {
            attendanceData["date"] = date;
        }

        attRecords.forEach(attRecord => {
            attendanceData.att_data.push({
                "id": attRecord.id,
                "att": attRecord.att,
                "name": attRecord.name,
            });
        });

        return attendanceData;
    };

    const submitAtt = (e) => {
        const attRecords = createAttendanceData(data, props.teacherEmail)
        console.log(attRecords)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attRecords)
        };
        const update_attendance_url = `${urls.attendance_url}`
        fetch(update_attendance_url, requestOptions)
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
            <AttendanceButton defaultValue={item.att} onValueChange={(value) => {item.att = value;}} />
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