import React from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  Dimensions,
} from 'react-native';

import MasonryList from '@appandflow/masonry-list';
import NewsCart from './NewsCart';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import { layoutNewsCartContainer } from '../Constants/layouts';



class SkeletonComponent extends React.Component {
  render() {
    return (
      <SkeletonContent
        containerStyle={{
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}
        layout={[...layoutNewsCartContainer(), ...layoutNewsCartContainer()]}
      />
    );
  }
}

export default class NewsCartContainer extends React.Component {

  render() {
    const newsAPIData = this.props.newsAPIData;
    const loadMoreHandler = this.props.loadMoreHandler;
    const isSearchBarVisible = this.props.isSearchBarVisible;

    const isReachEnd = this.props.isReachEnd;
    const refreshHandler = this.props.refreshHandler;


    return (
      <View style={styles.container}>
        <MasonryList
          data={newsAPIData}
          // extraData={newsAPIData}
          renderItem={({item, index}) => {
            return (
              <View>
                <NewsCart newsLng={this.props.newsLng} item={item} />
              </View>
            );
          }}
          initialNumToRender={2}
          animationDirection="horizontalLeft"
          getHeightForItem={({item}) => 400}
          numColumns={2}
          keyExtractor={item => Math.random().toString()}
          onEndReached={loadMoreHandler}
          onEndReachedThreshold={0.2}
          ListHeaderComponent={() => (
            <View
              style={{
                marginTop: isSearchBarVisible
                  ? (Dimensions.get('window').height * 11) / 100
                  : 0,
              }}></View>
          )}
          ListFooterComponent={() => (
            <View>
              {isReachEnd ? <SkeletonComponent /> : <View></View>}
              <View style={{height: 60}}></View>
            </View>
          )}
          refreshControl={
            <RefreshControl
              onRefresh={refreshHandler}
              title="Pull to refresh"
              colors={['blue', 'red', 'green']}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
