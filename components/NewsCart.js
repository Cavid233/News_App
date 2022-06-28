import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
} from 'react-native';

import moment from 'moment';
import 'moment/locale/az'; // without this line it didn't work
import 'moment/locale/ru'; // without this line it didn't work
import 'moment/locale/tr'; // without this line it didn't work
import 'moment/locale/hi'; // without this line it didn't work
import 'moment/locale/te'; // without this line it didn't work
import 'moment/locale/bn'; // without this line it didn't work
import 'moment/locale/en-gb'; // without this line it didn't work
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

let date;

const NewsCart = props => {
  const {item, newsLng} = props;
  const navigation = useNavigation();

  const title = item.title;

  const tag = item.tag;

  const createdAt = item.createdAt;


  if (createdAt) {
    date = new Date(createdAt);
  } else {
    date = new Date();
  }

  if (newsLng == 'az') {
    moment.locale('az');
  } else if (newsLng == 'ru') {
    moment.locale('ru');
  } else if (newsLng == 'tr') {
    moment.locale('tr');
  } else if (newsLng == 'hi') {
    moment.locale('hi');
  } else if (newsLng == 'te') {
    moment.locale('te');
  } else if (newsLng == 'bn') {
    moment.locale('bn');
  } else {
    moment.locale('en');
  }

  const timeAgo = moment(date).fromNow();

  const navigationHandler = (
    news_id,
    imgSrc,
    source,
    newsVideoSrc,
    newsTitle,
    newsText,
    newsTag,
    newsSourceLink,
  ) => {
    navigation.navigate('NewsScreen', {
      news_id,
      imgSrc,
      source,
      newsVideoSrc,
      newsTitle,
      newsText,
      newsTag,
      newsSourceLink,
      key: null,
    });
  };

  return (
    <TouchableNativeFeedback
      activeOpacity={0.85}
      onPress={() => {
        navigationHandler(
          item.id,
          item.img,
          item.source,
          item.video,
          item.title,
          item.text,
          item.tag,
          item.link,
        );
      }}
      useForeground={true}
      background={TouchableNativeFeedback.Ripple('rgba(238, 238, 238, 0.5)')}>
      <View style={styles.newsCardContainer}>
        <View style={styles.subContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.cartImg}
              source={{
                uri: item.img,
              }}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.tag}>#{tag}</Text>
            {item.video !== '' && <Entypo name="video" size={24} color="red" />}
          </View>
          <View style={{padding: 10}}>
            <Text style={styles.newsTitle}>{title}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <Text style={{fontSize: 14}}>{timeAgo}</Text>
            </View>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logoImg}
                source={{
                  uri: item.source,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  newsCardContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  subContainer: {
    width: '95%',
    backgroundColor: 'white',
  },
  imgContainer: {
    width: '100%',
    height: 200,
  },
  cartImg: {
    width: '100%',
    height: '100%',
  },
  labelContainer: {
    paddingHorizontal: 10,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {fontStyle: 'italic', color: 'red'},
  newsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bottomContainer: {
    height: 40,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: '50%',
    alignItems: 'flex-end',
  },
  logoImg: {
    width: '80%',
    height: 10,
    resizeMode: 'contain',
  },
});

export default React.memo(NewsCart);
