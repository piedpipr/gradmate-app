import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
  Button,
  Alert,
  View,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddData() {
  function Add() {
    firestore()
      .collection('words2')
      .add({
        exam: 'GRE',
        example: '',
        image: '',
        meaning: '',
        mnemonic: '',
        parent_a: '',
        parent_b: '',
        parent_c: '',
        synonyms: null,
        word: null,
      })
      .then(() => {
        console.log('User added!');
      });
  }
  function ShowCurrentUser() {
    const valuePromise = AsyncStorage.getItem('currentUser');
    valuePromise.then(value => {
      console.log(JSON.parse(value).uid);
    });
  } //SHOWS CURRENT USER OBJECT FROM ASYNCSTORAGE
  function ShowUserData() {
    const valuePromise = AsyncStorage.getItem('userOrigin');
    valuePromise.then(value => {
      console.log(JSON.parse(value));
      let userdata = JSON.parse(value);
      let Learned = userdata.learned.split(',');
      let Learning = userdata.learning.split(',');
      if (Learning.find(element => element == 'a')) {
        console.log('ok');
      }
      let Arr = [Learning, Learned];
      return Arr;
    });
  }
  return (
    <View style={styles.container}>
      <Button title="AddWord" onPress={() => Add()} />
      <Button title="Show Current User" onPress={() => ShowCurrentUser()} />
      <Button title="Show User Data" onPress={() => ShowUserData()} />
      <Button title="Check and Push" onPress={() => CheckData()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  separator: {
    marginVertical: 10,
  },
});
