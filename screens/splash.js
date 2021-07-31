import React, {useState} from 'react';
import {StyleSheet, StatusBar, Platform, View, Text, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './login';

const Splash = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const onDone = () => {
    const status = 'yes';
    AsyncStorage.setItem('isLoaded', status);
    setShowRealApp(true);
  };
  const onSkip = () => {
    const status = 'yes';
    AsyncStorage.setItem('isLoaded', status);
    setShowRealApp(true);
  };

  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      {showRealApp ? (
        <Login />
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
        />
      )}
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: '80%',
    height: '40%',
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 30,
    paddingTop: 40,
    fontWeight: 'bold',
  },
});

const slides = [
  {
    key: 's1',
    title: 'Complete Vocabulary Solution',
    text: 'Curated vocabulary flashcards with \nimages and mnemonics',
    image: require('../assets/icons/screen1.png'),
    backgroundColor: '#3395ff',
  },
  {
    key: 's2',
    title: 'Daily Driver For Test Prep ',
    text: 'Best collection of vocabulary for \nboth GRE & IELTS exam',
    image: require('../assets/icons/screen2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Dashboard',
    text: 'Track your progress\nMany new features are coming soon',
    image: require('../assets/icons/screen3.png'),
    backgroundColor: '#f75689',
  },
];
