import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const AttendanceDate = (props) => {
    const styles =StyleSheet.create({
        present:{
            backgroundColor:"#84f6ae",
            borderRadius:50,
            width:50,
            height:30,
            alignItems:"center",
            justifyContent:"center",
            margin:5
        },
        absent:{
            backgroundColor:"#f98e8e",
            borderRadius:50,
            width:50,
            height:25,
        }
    })
  return (
    <View style={props.status=="P" ?styles.present:styles.absent}>
      <Text >{props.date}</Text>
    </View>
  )
}

export default AttendanceDate