import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

async function getStudentsAttendance(url) {
    let response = await fetch(url);
    let body = await response.json();
    return body;
}

//const data = await fetchJSONAsync('https://dog.ceo/api/breeds/list/all');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Alwin',
    att: 'Present',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Ebinezer',
    att: 'Present',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Stains',
    att: 'Absent',
  },
];


const StudentsList = () => {
    const getData = async () => {
        data = await getStudentsAttendance("http://localhost:8000/stud.json")
        console.log(data);
        return data;
    }
    //const [data, setData] = React.useState([]);

    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://192.168.18.210:8000/stud.json")
            response = await response.json()
            console.log(response)
            setData(response)
        }

        fetchMyAPI()
    }, [])


    const Item = ({title, att}) => (

      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.att}>{att}</Text>
      </View>
    );

    return (
        <SafeAreaView style={styles.container}>
        <FlatList
            data={data}
            renderItem={({item}) => <Item title={item.title} att={item.att} />}
            keyExtractor={item => item.id}
        />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    //backgroundColor: '#fff',
    padding: 2,
    marginVertical: 4,
    marginHorizontal: 4,
    flex: 1,
    fontSize: 16,
    flexDirection: "row"
  },
  title: {
    height: "100%",
    width: "50%",
    paddingRight: 5,
  },
  att: {
    width: "30%",
    height: "100%",
  },
});

export { StudentsList };