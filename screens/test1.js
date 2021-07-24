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
        synonyms: '',
        word: '',
      })
      .then(() => {
        console.log('User added!');
      });
  }
  return <Button title="Add" onPress={() => Add()} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
