import React, {useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  Share,
  Linking,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {WebView} from 'react-native-webview';
import Lightbox from 'react-native-lightbox';
import {AdMobBanner} from 'react-native-admob';

const NewsScreen = (props, {navigator}) => {
  const imgSrc = props.route.params.imgSrc && props.route.params.imgSrc;

  const source = props.route.params.source && props.route.params.source;

  const title = props.route.params.newsTitle && props.route.params.newsTitle;

  const text = props.route.params.newsText && props.route.params.newsText;

  const newsVideoSrc =
    props.route.params.newsVideoSrc && props.route.params.newsVideoSrc;

  const newsTag = props.route.params.newsTag && props.route.params.newsTag;

  const newsSourceLink =
    props.route.params.newsSourceLink && props.route.params.newsSourceLink;

  useEffect(() => {
    props.navigation.setOptions({
      title: '#' + newsTag,
    });
  }, [newsTag]);

  const onShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message:
          // "React Native | A framework for building native apps using React",
          `${newsSourceLink}`,
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
  }, []);

  useEffect(() => {
    props.navigation.setParams({onShare: onShare});
  }, [onShare]);



  // You can handle deep linking here
  // useEffect(() => {
  //   if (props.route.params.key) {

  //   }
  // }, [props.route.params.key]);


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#BB1919" />

      <ScrollView>
        <Lightbox navigator={navigator}>
          <Image source={{uri: imgSrc && imgSrc}} style={styles.img} />
        </Lightbox>
        <View style={styles.sourceContainer}>
          <TouchableNativeFeedback
            onPress={() => Linking.openURL(newsSourceLink && newsSourceLink)}>
            <Text style={styles.sourceText}> View Original Source </Text>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() => Linking.openURL(newsSourceLink && newsSourceLink)}>
            <Image
              style={styles.littleIconSource}
              source={{
                uri: source,
              }}
            />
          </TouchableNativeFeedback>
        </View>

        <View style={styles.title_text_container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} selectable={true}>
              {title}
            </Text>
          </View>
          {newsVideoSrc !== '' && (
            <WebView
              javaScriptEnabled={true}
              scrollEnabled={false}
              domStorageEnabled={true}
              source={{
                uri: `https://www.youtube.com/embed/${newsVideoSrc}?rel=0&autoplay=0&controls=1&showinfo=0`,
              }}
              allowsFullscreenVideo={true}
              style={{width: '100%', height: 300}}
            />
          )}

          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18}} selectable={true}>
              {text}
            </Text>
          </View>
        </View>
        {/* <View style={styles.sourceImgContainer}>
          <TouchableNativeFeedback
            onPress={() => Linking.openURL(newsSourceLink && newsSourceLink)}>
            <Image
              style={styles.sourceImg}
              source={{
                uri: source,
              }}
            />
          </TouchableNativeFeedback>
        </View> */}
        <View style={{height: 60}}></View>
      </ScrollView>
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
  const onShare = navData.route.params ? navData.route.params.onShare : null;

  return {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? '#BB1919' : '',
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          IconComponent={Ionicons}
          iconName={'ios-share-social-sharp'}
          onPress={onShare}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sourceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    width: '96%',
    alignSelf: 'center',
  },
  littleIconSource: {width: 80, height: 50, resizeMode: 'contain'},
  sourceText: {
    fontSize: 17,
    color: 'blue',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  img: {
    width: '100%',
    height: 300,
  },
  video: {
    width: '100%',
    height: 200,
  },
  title_text_container: {width: '95%', alignSelf: 'center'},
  titleContainer: {marginVertical: 10, justifyContent: 'center'},
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  sourceImgContainer: {
    alignItems: 'center',
  },
  sourceImg: {width: 100, height: 100, resizeMode: 'contain'},
  adsContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
});

export default NewsScreen;
