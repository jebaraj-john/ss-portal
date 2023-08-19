import { Avatar, Button, Card, Text, } from 'react-native-paper';
import React from 'react'
import AttendanceDate from './AttendanceDate';
import { View } from 'react-native';

const ReportCard = (props) => {
  const AttendanceCount = ({present, absent}) =>{
    return(
      <View  style={{justifyContent:"space-evenly" ,flexDirection:"row"}}>
        <Text >Total no of Days : {props.att.length}</Text>
        <Text>Present :{present}</Text>
        <Text>Absent :{absent}</Text>
      </View>
    );
  }
  const formatDate = (date) => {
    return date.split("/").slice(0, 2).join("/");
  };
  return (
    <Card>
        <Card.Title title={props.name}/>
        <Card.Content style={{flexDirection:"row",flexWrap:"wrap"}}>
          <View style={{flexDirection:"row",flexWrap:"wrap"}}>
          {
            props.att.map((ele, index)=>(
              <AttendanceDate status = {Object.values(ele)[0]}  key={"attdate-"+index+props.name} date = {formatDate(Object.keys(ele)[0])}/>
              ))
              
            }
          </View>
          <AttendanceCount present={props.present_count} absent={props.absent_count}/>


          
        </Card.Content>

    </Card>
  )
}

export default ReportCard;