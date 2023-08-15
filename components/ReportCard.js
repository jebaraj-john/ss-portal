import { Avatar, Button, Card, Text } from 'react-native-paper';
import React from 'react'
import AttendanceDate from './AttendanceDate';

const ReportCard = (props) => {
  const formatDate = (date) => {
    return date.split("/").slice(0, 2).join("/");
    console.log(props);
  };
  return (
    <Card>
        <Card.Title title={props.name}/>
        <Card.Content style={{flexDirection:"row",flexWrap:"wrap",}}>
          {
            props.att.map((ele)=>(
              <AttendanceDate status = {Object.values(ele)[0]} date = {formatDate(Object.keys(ele)[0])}/>
            ))
          }


          
        </Card.Content>

    </Card>
  )
}

export default ReportCard;