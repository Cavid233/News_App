import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View, Image, Dimensions, StatusBar} from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

import {layoutNewsListScreen} from '../Constants/layouts';

import {insertLng, fetchLng} from '../helpers/lngDB';
import {useIsFocused} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'react-native-store-review';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import LngModal from '../components/newsList/LngModal';
import NewsCartContainer from '../components/NewsCartContainer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {AdMobBanner} from 'react-native-admob';

import dummy_data from '../data/dummy_data';



let number = 3;

const NewsListScreen = props => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isReachEnd, setIsReachEnd] = useState(false);
  const [newsAPIData, setNewsAPIData] = useState([]);
  const [minId, setMinId] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const [newsLng, setNewsLng] = useState();

  const refreshHandler = () => {
    setIsLoaded(true);
    const newArray = [...dummy_data[newsLng]['data'].slice(0, 3)];
    setNewsAPIData(() => [...newArray]);

    setTimeout(() => {
      setIsLoaded(false);
    }, 2000);
  };

  const callNewsHandler = async lng => {
    setNewsAPIData([]);
    sendedNumArray = [];
    setNewsLng(() => lng);
    const newArray = [...dummy_data[lng]['data'].slice(0, 3)];
    setNewsAPIData(() => [...newArray]);
    setMinId(() => null);
  };

  const dataFromApiHandler = useCallback((num, lng) => {
    setTimeout(() => {
      setNewsAPIData(prev => [
        ...prev,
        ...dummy_data[lng]['data'].slice(number, number + 3),
      ]);

      number = number + 3;


      setIsReachEnd(() => false);
    }, 3000);

  }, []);

  const loadMoreHandler = async () => {
    if (newsAPIData.length == dummy_data[newsLng]['data'].length) {
      return;
    }
    setIsReachEnd(true);

    dataFromApiHandler(minId - 2, newsLng);
  };

  const toggleModal = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);



  useEffect(() => {
    props.navigation.setParams({toggleModal: toggleModal});
  }, []);

  useEffect(() => {
    const modalShowHandler = async () => {
      const dbResult = await fetchLng();
      if (dbResult.rows.length == 0) {
        await insertLng('tr');
        callNewsHandler('tr');
        setNewsLng(() => 'tr');
        toggleModal();
      } else {
        const data = dbResult.rows.item(0);
        callNewsHandler(data['language']);
        setNewsLng(() => data['language']);
      }
    };
    modalShowHandler();

    setTimeout(() => {
      setIsLoaded(false);
    }, 5000);
  }, []);


  const FocusAwareStatusBar = props => {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />

      <LngModal
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        callNewsHandler={callNewsHandler}
      />

      {isLoaded ? (
        <SkeletonContent
          containerStyle={{
            flex: 1,
            marginTop: isSearchBarVisible
              ? (Dimensions.get('window').height * 11) / 100 + 10
              : 10,
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}
          isLoading={isLoaded}
          layout={[...layoutNewsListScreen(), ...layoutNewsListScreen()]}
        />
      ) : (
        <View style={{flex: 1}}>
          <NewsCartContainer
            isReachEnd={isReachEnd}
            newsAPIData={newsAPIData}
            // newsAPIData={dummy_data}
            loadMoreHandler={loadMoreHandler}
            isSearchBarVisible={isSearchBarVisible}
            refreshHandler={refreshHandler}
            newsLng={newsLng}
          />
        </View>
      )}

      <View style={styles.adsContainer}>
        <AdMobBanner
          adSize="banner"
          // adUnitID= {__DEV__ ? "ca-app-pub-3940256099942544/6300978111" : "your admob id"}
          adUnitID={'ca-app-pub-3940256099942544/6300978111'}
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />
      </View>
    </View>
  );
};

export const screenOptions = navData => {
  const toggleModal = navData.route.params
    ? navData.route.params.toggleModal
    : null;

  return {
    headerTitle: (
      props, // App Logo
    ) => (
      <Image
        style={{width: 250, aspectRatio: 2 / 5, marginTop: 13}}
        source={require('../assets/splash.png')}
        resizeMode="contain"
      />
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          color={'#EB3343'}
          IconComponent={Ionicons}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          IconComponent={Ionicons}
          iconName={'language'}
          color={'#EB3343'}
          onPress={() => {
            toggleModal();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(238, 238, 238, 0.7)',
  },
  adsContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
});

export default NewsListScreen;
