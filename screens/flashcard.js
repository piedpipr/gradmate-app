import React, {useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FlashCard = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const onDone = () => {
    AsyncStorage.setItem('isAppLoaded', 'yes');
    setShowRealApp(true);
  };
  const onSkip = () => {
    AsyncStorage.setItem('isAppLoaded', 'yes');
    setShowRealApp(true);
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
    var myColors = ['#febe29', '#3395ff', '#22bcb5', '#f6437b'];
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
              <Image style={styles.introImageStyle} source={item.image} />
              <Text style={styles.introTextStyle}>{item.text}</Text>
            </Animated.View>

            <Animated.View
              style={[
                backAnimatedStyle,
                styles.paperBack,
                {elevation: elevationBack},
                {opacity: backOpacity},
              ]}>
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: 8,
                  paddingLeft: 8,
                  color: 'black',
                  lineHeight: 20,
                }}>
                Word Meaning {item.meaning}
                {val} - <Text style={{fontSize: 8}}>KPI</Text>
              </Text>
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <AppIntroSlider
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
    width: 200,
    height: 200,
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
    height: '65%',
    minWidth: '90%',
    borderRadius: 5,
    marginBottom: 15,
    zIndex: 2,
  },
  paperBack: {
    position: 'absolute',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
    backgroundColor: 'white',
    height: '65%',
    minWidth: '90%',
    borderRadius: 5,
    marginBottom: 15,
  },
});

const slides = [
  {
    key: 'w1',
    text: 'Curated Vocabs',
    title: 'Best collections at the same place',
    meaning: 'Hello World',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
    },
  },
  {
    key: 'w2',
    title: 'Visualization',
    text: 'Added image to the vocabularies',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
  },
  {
    key: 'w3',
    title: 'Mnemonics',
    text: 'Remember easily',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
  },
  {
    key: 'w4',
    title: 'Your companion',
    text: ' GRE, IELTS, GMAT',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
    },
  },
  {
    key: 'w5',
    title: 'Dummy',
    text: 'Hello',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png',
    },
  },
  {
    key: 'w6',
    title: 'Last Page',
    text: ' Last',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
    },
  },
  {
    key: 'w7',
    title: 'Last Page',
    text: ' Last',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
    },
  },
  {
    key: 'w8',
    title: 'Last Page',
    text: ' Last',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
    },
  },
  {
    key: 'w9',
    title: 'Last Page',
    text: ' Last',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
    },
  },
  {
    key: 'w10',
    title: 'Last Page',
    text: ' Last',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
    },
  },
];
