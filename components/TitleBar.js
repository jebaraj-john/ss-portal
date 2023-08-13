import { View, Text, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import React from 'react';

const TitleBar = (props) => {

  return (
    <Appbar.Header>
        <Appbar.Content title={props.title} />
        <Appbar.Action  icon="account-circle" onPress={()=>Alert.alert("Hello User!")}/>
    </Appbar.Header>
  )
}

export default TitleBar;
