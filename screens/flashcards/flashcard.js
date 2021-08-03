import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const FlashCard = props => {
  const [isData, setData] = useState(null);

  ///////////////////////////////////////////////////////////////////////////////////

  const LocalData = () => {
    if (isData == null) {
      const valuePromise = AsyncStorage.getItem('WORDS');
      valuePromise.then(value => {
        let val = JSON.parse(value);
        setData(val);
        console.log(val);
      });
    }
  };
  LocalData(); // LOAD WORD DATA FROM LOCAL ASYNCSTORAGE
  /////////////////////////////////////////////////////////////////////////////////
  let wordData = () => {
    let words = null;
    if (isData) {
      words = isData.filter(
        doc =>
          doc.set == props.route.params.prev &&
          doc.sub == props.route.params.data,
      ); //WORD OBJETS HAVING COLLECTIONS = ROUTE PARAMETER FROM PREVIOUS SCREEN
      console.log(words);
    }
    return words;
  };
  let DATA = wordData();
  ////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    LocalData();
  }, []);

  const onDone = () => {
    props.navigation.goBack();
  };
  const onSkip = () => {
    props.navigation.goBack();
  };

  let animatedValue = new Animated.Value(0);
  let val = 0;

  animatedValue.addListener(({value}) => {
    // console.log("before this",this.value)

    // console.log("before val",value)
    val = value;
    // console.log("after",this.value)
  });

  let frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  let backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  let frontOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  let backOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  let elevationFront = animatedValue.interpolate({
    inputRange: [0, 25],
    outputRange: [10, 0],
  });

  let elevationBack = animatedValue.interpolate({
    inputRange: [155, 175],
    outputRange: [0, 10],
  });

  const flipCard = () => {
    if (val >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };
  FlashCard.flipCard = flipCard;

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };
  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  const RenderItem = ({item}) => {
    var myColors = ['#febe29', '#3395ff', '#22bcb5', '#f75689'];
    const bgColor = myColors[Math.floor(Math.random() * myColors.length)];
    return (
      <TouchableWithoutFeedback onPress={() => flipCard()}>
        <View
          style={{
            flex: 1,
            backgroundColor: bgColor,
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: 100,
          }}>
          <StatusBar translucent backgroundColor="transparent" />
          <View style={styles.containerSm}>
            <Animated.View
              style={[
                frontAnimatedStyle,
                styles.paperFront,
                {elevation: elevationFront},
                {opacity: frontOpacity},
              ]}>
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: 8,
                  paddingLeft: 8,
                  color: 'black',
                  lineHeight: 20,
                }}>
                Given Word {item.title} - <Text style={{fontSize: 8}}>KPI</Text>
              </Text>

              <Text style={styles.introTextStyle}>{item.text}</Text>
            </Animated.View>

            <Animated.View
              style={[
                backAnimatedStyle,
                styles.paperBack,
                {elevation: elevationBack},
                {opacity: backOpacity},
              ]}>
              <Image style={styles.introImageStyle} source={item.image} />
              <ScrollView>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingTop: 8,
                    paddingLeft: 8,
                  }}>
                  Word Meaning {item.meaning} {'\n'}
                  {'\n'} Lorem ipsum dolor sit amet, {'\n'}consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. {'\n'}
                  {'\n'}Ut enim ad minim veniam, {'\n'}
                  {'\n'}quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. {'\n'}
                  {'\n'}Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. {'\n'}
                  {'\n'}Excepteur sint occaecat cupidatat non proident, {'\n'}
                  {'\n'}sunt in culpa qui officia deserunt mollit anim id est
                  laborum.{'\n'}Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur.{' '}
                  {'\n'}
                  {'\n'}Excepteur sint occaecat cupidatat non proident, {'\n'}
                  {'\n'}sunt in culpa qui officia deserunt mollit anim id est
                  laborum.{'\n'}Ut enim ad minim veniam, {'\n'}
                  {'\n'}quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. {'\n'}
                  {'\n'}Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. {'\n'}
                  {'\n'}Excepteur sint occaecat cupidatat non proident, {'\n'}
                  {'\n'}sunt in culpa qui officia deserunt mollit anim id est
                  laborum.{'\n'}Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur.{' '}
                  {'\n'}
                  {'\n'}Excepteur sint occaecat cupidatat non proident, {'\n'}
                  {'\n'}sunt in culpa qui officia deserunt mollit anim id est
                  laborum.{'\n'}Ut enim ad minim veniam, {'\n'}
                  {'\n'}quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. {'\n'}
                  {'\n'}Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. {'\n'}
                  {'\n'}Excepteur sint occaecat cupidatat non proident, {'\n'}
                  {'\n'}sunt in culpa qui officia deserunt mollit anim id est
                  laborum.{'\n'}Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur.{' '}
                  {'\n'}
                  {'\n'}Excepteur sint occaecat cupidatat non proident, {'\n'}
                  {'\n'}sunt in culpa qui officia deserunt mollit anim id est
                  laborum.{'\n'}Ut enim ad minim veniam, {'\n'}
                  {'\n'}quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. {'\n'}
                  {'\n'}Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. {'\n'}
                  {'\n'}Excepteur sint occaecat cupidatat non proident, {'\n'}
                  {'\n'}sunt in culpa qui officia deserunt mollit anim id est
                  laborum.{'\n'}Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur.{' '}
                  {'\n'}
                  {'\n'}Excepteur sint occaecat cupidatat non proident, {'\n'}
                  {'\n'}sunt in culpa qui officia deserunt mollit anim id est
                  laborum.{'\n'}Ut enim ad minim veniam, {'\n'}
                  {'\n'}quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. {'\n'}
                  {'\n'}Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. {'\n'}
                  {'\n'}Excepteur sint occaecat cupidatat non proident, {'\n'}
                  {'\n'}sunt in culpa qui officia deserunt mollit anim id est
                  laborum.{'\n'}Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur.{' '}
                  {'\n'}
                  {'\n'}Excepteur sint occaecat cupidatat non proident, {'\n'}
                  {'\n'}sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                  {val}
                </Text>
              </ScrollView>
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <AppIntroSlider
      // data={props.words}
      data={slides}
      renderItem={RenderItem}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onSkip}
    />
  );
};

export default FlashCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
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
    width: '100%',
    height: '40%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
    marginBottom: 16,
    fontWeight: 'bold',
  },

  containerSm: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperFront: {
    position: 'absolute',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
    backgroundColor: 'white',
    height: '80%',
    minWidth: '94%',
    borderRadius: 5,
    marginBottom: 15,
    zIndex: 2,
  },
  paperBack: {
    position: 'absolute',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
    backgroundColor: 'white',
    height: '80%',
    minWidth: '94%',
    borderRadius: 5,
    marginBottom: 15,
  },
});

const slides = [
  {
    key: 'w1',
    text: 'uCurated Vocabs',
    title: 'Best collections \n\n\nat the same place',
    meaning: 'Hello World1',
    image: {
      uri: 'https://avatars.githubusercontent.com/u/43669876?v=4',
    },
  },
  {
    key: 'w2',
    text: 'uCurated Vocabs',
    title: 'Best collections at the same place',
    meaning: 'Hello World',
    image: {
      uri: 'https://avatars.githubusercontent.com/u/43669876?v=4',
    },
  },
  {
    exam: 'GRE',
    collection: 'GregMat700',
    set: 'Group1',
    sub: '1',
    key: '1',
    word: 'abound',
    meaning: 'plenty',
    example: 'abound of money',
    image: {
      uri: 'https://avatars.githubusercontent.com/u/43669876?v=4',
    },
  },
];
