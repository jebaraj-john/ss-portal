import React from 'react';
import {
    SafeAreaView,
    View,
    Alert,
    FlatList,
    Text,
    Button,
    ActivityIndicator,
} from 'react-native';

//import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { StudentsStyles } from '../themes/default';

async function getStudentsAttendance(url) {
    let response = await fetch(url);
    let body = await response.json();
    return body;
}

const StudentsList = () => {
    const getData = async () => {
        data = await getStudentsAttendance("http://localhost:8000/stud.json")
        //console.log(data);
        return data;
    }
    //const [data, setData] = React.useState([]);

    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("https://64ca4578700d50e3c7049d46.mockapi.io/attendence")
            response = await response.json()
            console.log(response)
            setData(response)
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
            <ActivityIndicator size="large" color="#00ff00" />
            Alert.alert('', 'Attendance submitted!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        });

    };

    const Item = ({ title, att, itemData }) => (

        <View style={StudentsStyles.item}>
            <Text style={StudentsStyles.title}>{title}</Text>
            <RNPickerSelect
                style={StudentsStyles.att}
                onValueChange={(value) => { console.log(value); itemData.att = value }}
                value="A"
                items={[
                    { label: 'P', value: 'P' },
                    { label: 'A', value: 'A' },
                    { label: '', value: '' },
                ]}
            />
        </View>
    );

    return (
        <SafeAreaView style={StudentsStyles.container}>
            <ActivityIndicator size="large" color="#00ff00" animating="false"/>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item title={item.name} att={item.att} itemData={item} />}
                keyExtractor={item => item.id}
            />
            <Button title="Submit Attendance" onPress={submitAtt.bind(this)} />
        </SafeAreaView>
    );
};

export { StudentsList };