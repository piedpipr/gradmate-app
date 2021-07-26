import React, {useState} from 'react';
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
import FlashCard from './flashcard';

export default function Ielts({navigation}) {
  const [isData, setData] = useState(null);
  let FetchData = async () => {
    const events = await firestore().collection('test');
    events.get().then(querySnapshot => {
      const tempDoc = querySnapshot.docs.map(doc => {
        return {id: doc.id, ...doc.data()};
      });
      console.log(tempDoc);
      setData(tempDoc);
    });
  };

  if (isData) {
    return <FlashCard words={isData} />;
  } else {
    return (
      <SafeAreaView>
        <Text>Hello</Text>
        <Button
          marginRight="190px"
          color="#219ebc"
          title="Move"
          onPress={() => navigation.navigate('GREFlashcards')}
        />
      </SafeAreaView>
    );
  }
}
