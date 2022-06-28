import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableNativeFeedback,
  FlatList,
} from 'react-native';

import LngCard from './LngCard';

import defaultNumber from '../../Constants/defaultNumber';
import Modal from 'react-native-modal';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {updateLng, fetchLng} from '../../helpers/lngDB';

const ListOfLngs = [
  'Azərbaycanca',
  'English',
  'Russian',
  'Türkçe',
  'Hindi',
  'Telugu',
  'Bengali',
];

const LngModal = props => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const [checkedCart, setCheckedCart] = useState();

  useEffect(() => {
    const getCurrentLng = async () => {
      const dbResult = await fetchLng();
      const data = dbResult.rows.item(0);

      if (dbResult.rows.length == 0) {
        // if (data.length) {
        setCheckedCart(data['language']);
      } else {
        setCheckedCart('en');
      }
    };
    getCurrentLng();
  }, []);

  const lngHandler = async (lng, selectedLng) => {
    setCheckedCart(lng);
    props.callNewsHandler(lng);
    await updateLng(lng);
  };

  return (
    <Modal
      isVisible={props.isModalVisible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      onBackdropPress={props.toggleModal}
      onBackButtonPress={props.toggleModal}
      onSwipeComplete={props.toggleModal}
      style={styles.ModalConatiner}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: '#3366FF',
        }}>
        <View style={styles.iconContainer}>
          <View style={styles.iconView}>
            <TouchableNativeFeedback onPress={props.toggleModal}>
              <View style={{padding: defaultNumber * 2.5}}>
                <MaterialIcons
                  name="cancel"
                  size={defaultNumber * 7.5}
                  color="white"
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={styles.modalHeaderTitle}>
          <Text style={styles.modalTitle}>Languages</Text>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.iconView}>
            <TouchableNativeFeedback>
              <View style={{padding: defaultNumber * 2.5}}>
                <Ionicons
                  name="language"
                  size={defaultNumber * 7.5}
                  color="white"
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>

      <View style={{maxHeight: '70%'}}>
        <FlatList
          data={ListOfLngs}
          renderItem={({item, index}) => (
            <LngCard
              item={item}
              index={index}
              lngHandler={lngHandler}
              checkedCart={checkedCart}
            />
          )}
          keyExtractor={item => item}
        />
      </View>

      <TouchableNativeFeedback onPress={props.toggleModal}>
        <View
          style={{
            ...styles.buttonView,
            // backgroundColor: "#EA480B",
            backgroundColor: '#3366FF',
          }}>
          <Text style={{color: 'white', fontSize: defaultNumber * 3.5}}>
            OK
          </Text>
        </View>
      </TouchableNativeFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalConatiner: {},

  buttonView: {
    height: defaultNumber * 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: defaultNumber * 5,
    borderBottomRightRadius: defaultNumber * 5,
  },
  headerContainer: {
    width: '100%',
    height: defaultNumber * 17,
    alignItems: 'center',
    borderTopLeftRadius: defaultNumber * 5,
    borderTopRightRadius: defaultNumber * 5,
    flexDirection: 'row',
  },
  iconContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView: {
    borderRadius: defaultNumber * 7.5,
    overflow: 'hidden',
  },
  modalHeaderTitle: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    color: 'white',
    fontSize: defaultNumber * 5,
    fontWeight: 'bold',
  },
});

export default LngModal;
