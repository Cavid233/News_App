import React, {useCallback, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  Share,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';

import defaultNumber from '../Constants/defaultNumber';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import SettingsCartItem from '../components/settings/SettingsCartItem';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Tts from 'react-native-tts';
import Mailer from 'react-native-mail';
var DeviceInfo = require('react-native-device-info');

const androidPackageName = 'com.deirvlon.ton';

const iconSize = defaultNumber * 6.5;

const SettingScreen = props => {
  const speak = () => {
    const thingToSay =
      'Times of News is one of the best news aggregator on the market. It has 7 different languages and more cool features. It was created by Deirvlon Technologies';
    Tts.speak(thingToSay);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://play.google.com/store/apps/details?id=${androidPackageName}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEmail = () => {
    Mailer.mail(
      {
        recipients: ['support@deirvlon.com"'],
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {cancelable: true},
        );
      },
    );
  };

  const FocusAwareStatusBar = props => {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={'blue'}
        barStyle={'light-content'}
      />

      <ScrollView>
        <SettingsCartItem
          actionHandler={() =>
            Linking.openURL(
              `market://details?id=${androidPackageName}&showAllReviews=true`,
            )
          }
          firstPartElement={
            <Ionicons
              name="logo-google-playstore"
              size={iconSize}
              color="#43C7A3"
            />
          }
          secondPartElement={'Rate on Google Play'}
          thirdPartElement={
            <AntDesign name="star" size={iconSize} color={'#F1C40F'} />
          }
        />
        <SettingsCartItem
          actionHandler={() => {
            handleEmail();
          }}
          firstPartElement={
            <MaterialCommunityIcons
              name="email"
              size={iconSize}
              color="#F0603C"
            />
          }
          secondPartElement={'Send Feedback'}
          thirdPartElement={
            <MaterialIcons name="feedback" size={iconSize} color="#C3D82C" />
          }
        />
        <SettingsCartItem
          actionHandler={() => onShare()}
          firstPartElement={
            <Ionicons name="infinite" size={iconSize} color="#9513DF" />
          }
          secondPartElement={'Share App'}
          thirdPartElement={
            <FontAwesome
              name="share-alt-square"
              size={iconSize}
              color="#13AEDF"
            />
          }
        />

        <SettingsCartItem
          actionHandler={() => speak()}
          firstPartElement={
            <FontAwesome name="newspaper-o" size={iconSize} color="#838383" />
          }
          secondPartElement={'About App'}
          thirdPartElement={
            <Ionicons
              name="information-circle"
              size={defaultNumber * 8}
              color="#DF1348"
            />
          }
        />
      </ScrollView>
      <View style={styles.infoContainer}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          App Version - {DeviceInfo.getVersion()}
        </Text>

        <View style={styles.copyrightContainer}>
          <AntDesign name="copyright" size={20} color="black" />

          <Text style={{fontSize: 18, fontStyle: 'italic'}}>
            {' '}
            2021 Deirvlon Technologies
          </Text>
        </View>
      </View>
    </View>
  );
};

export const screenOptions = navData => {
  return {
    title: 'Settings',
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? 'blue' : '',
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          IconComponent={Ionicons}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="settings" IconComponent={Ionicons} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'backgroundColor: "rgba(238, 238, 238, 0.7)',
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: defaultNumber * 37.25,
    backgroundColor: 'white',
    borderTopLeftRadius: defaultNumber * 10,
    borderTopRightRadius: defaultNumber * 10,
  },
  copyrightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default SettingScreen;
