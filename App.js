import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';

import AppNavigator from './navigation/NewsNavigation';
import {useLinking, NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import {initLng} from './helpers/lngDB'; // New

initLng()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db fail.');
    console.log(err);
  });

const App = () => {
  LogBox.ignoreLogs([
    'Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.',
  ]);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',

    // This is related to mansoryList package
    'VirtualizedLists should never be nested',

    'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
    'Animated.event now requires a second argument for options',
    "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'",
  ]);

  // Deep linking

  // const linking = {
  //   prefixes: [
  //     'http://*.example.az/post.php?n=',
  //     'http://www.example.az/post.php?n=',
  //   ],
  //   config: {
  //     screens: {
  //       Home: {
  //         screens: {
  //           NewsScreen: {
  //             path: ':key',
  //             parse: {
  //               key: String,
  //             },
  //           },
  //         },
  //       },
  //       Settings: 'settings',
  //     },
  //   },
  // };

  // Add this code to AndroidManifest.xml

  //   <intent-filter>
  //   <action android:name="android.intent.action.VIEW" />
  //   <category android:name="android.intent.category.DEFAULT" />
  //   <category android:name="android.intent.category.BROWSABLE" />
  //   <data android:scheme="http"
  //     android:host="www.example.az"
  //     android:pathPattern=".*" />
  // </intent-filter>

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    // <NavigationContainer linking={linking}>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
