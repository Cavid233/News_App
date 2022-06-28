import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'; // NEW

import {createDrawerNavigator } from '@react-navigation/drawer'; // New

import {Platform} from 'react-native';
import NewsListScreen, {
  screenOptions as newsListScreenOptions,
} from '../screens/NewsListScreen';
import defaultNumber from '../Constants/defaultNumber';
import NewsScreen, {
  screenOptions as newScreenOptions,
} from '../screens/NewsScreen';

import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from '../screens/SettingsScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const defaultNavOptions = {

  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: defaultNumber * 7,
  },
  headerTitleAlign: 'center',

  headerTintColor: Platform.OS === 'android' ? 'white' : 'pink',
};

const NewsStackNavigator = createStackNavigator();

const NewsListNavigator = props => {
  return (
    <NewsStackNavigator.Navigator
      screenOptions={defaultNavOptions}>
      <NewsStackNavigator.Screen
        name="NewsListScreen"
        component={NewsListScreen}
        options={newsListScreenOptions}
      />
      <NewsStackNavigator.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={newScreenOptions}
      />
    </NewsStackNavigator.Navigator>
  );
};

const SettingsStackNavigator = createStackNavigator();

const SettingsNavigator = props => {
  return (
    <SettingsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SettingsStackNavigator.Screen
        name="SettingsScreenOverview"
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
    </SettingsStackNavigator.Navigator>
  );
};

const NewsDrawerNavigator = createDrawerNavigator();

const NewsNavigator = () => {
  return (
    <NewsDrawerNavigator.Navigator
      screenOptions={{
        activeTintColor: '#3366FF',
        activeBackgroundColor: '#F4F4F4',
        inactiveTintColor: 'grey',
        labelStyle: {fontWeight: 'bold'},
        headerShown: false,
      }}>
      <NewsDrawerNavigator.Screen
        name="Home"
        component={NewsListNavigator}
        options={{
          drawerIcon: props => (
            <FontAwesome name="newspaper-o" size={24} color="#3366FF" />
          ),
        }}
      />
      <NewsDrawerNavigator.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons name="settings" size={24} color="#3366FF" />
          ),
        }}
      />
    </NewsDrawerNavigator.Navigator>
  );
};

export default NewsNavigator;
