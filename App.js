'use strict';

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen} from "./screens/HomeScreen.js";
import {Reports} from "./screens/ReportsScreen.js";
import {EventsScreen} from "./screens/EventsScreen.js";
import { AppRegistry, Platform, SafeAreaView } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { BottomNavigation ,} from 'react-native-paper';

const Tab = createBottomTabNavigator()


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function Main() {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'reports', title: 'Reports', focusedIcon: 'file-document-multiple',unfocusedIcon:"file-document-multiple-outline"},
    { key: 'events', title: 'Events', focusedIcon: 'calendar-month',unfocusedIcon:"calendar-month-outline" },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: () => <HomeScreen centers={["NLAG"]}
      services={["1st Service", "2nd Service"]} departments={["Beginner", "Primary"]} role="leader"
      teachers={[{"name": "Sam", "email": "mailx@gmail.com"},{"name": "Daniel", "email": "jsx@live.com"}]}
      userInfo={{"email": "xyz@gmail.com", "name": "Dave Jones"}}
    />,
    reports: Reports,
    events: EventsScreen,
  });
  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      />
    </PaperProvider>
  );
}



AppRegistry.registerComponent(appName, () => Main);