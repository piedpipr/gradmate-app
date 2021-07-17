import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, SafeAreaView, StyleSheet, Animated, Button, Platform, TouchableWithoutFeedback, Text } from 'react-native';

export function FlashCard () {

        let animatedValue = new Animated.Value(0);
        let val = 0;

        animatedValue.addListener(({ value }) => {
          // console.log("before this",this.value)
         
          // console.log("before val",value)
            val = value;
          // console.log("after",this.value)
       
        })

        let frontInterpolate = animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        let backInterpolate = animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        let frontOpacity = animatedValue.interpolate({
        inputRange: [89, 90],
        outputRange: [1, 0]
        });

        let backOpacity = animatedValue.interpolate({
        inputRange: [89, 90],
        outputRange: [0, 1]
        });

        let elevationFront = animatedValue.interpolate({
          inputRange: [0, 25],
          outputRange: [10, 0]
          })

        let elevationBack = animatedValue.interpolate({
          inputRange: [155, 175],
          outputRange: [0, 10]
          })

          const flipCard = () => {
            if (val >= 90) {
              Animated.spring(animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
              }).start();
            } else {
              Animated.spring(animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
              }).start();
            }
          }
          FlashCard.flipCard = flipCard;


        const frontAnimatedStyle = {
        transform: [{ rotateY: frontInterpolate }]
        }
        const backAnimatedStyle = {
        transform: [{ rotateY: backInterpolate }]
        }


    return (
      <TouchableWithoutFeedback onPress={() =>flipCard()} >
          <View style={ styles.container }>
                <Animated.View style={[frontAnimatedStyle, styles.paperFront, {elevation: elevationFront}, {opacity: frontOpacity}]}>
                  <Text style={{fontSize: 20,paddingTop: 8, paddingLeft: 8, color: 'black',lineHeight: 20}}>
                    Given Word {val} - <Text style={{fontSize: 8}}>KPI</Text>
                  </Text>
                </Animated.View>

                <Animated.View style={[backAnimatedStyle, styles.paperBack, {elevation: elevationBack}, {opacity: backOpacity}]}>
                  <Text style={{fontSize: 20,paddingTop: 8, paddingLeft: 8, color: 'black',lineHeight: 20}}>
                    Word Meaning {val} - <Text style={{fontSize: 8}}>KPI</Text>
                  </Text>
                </Animated.View>
            </View>
      </TouchableWithoutFeedback>
    );
}


export default class Flashcard extends React.Component {
render(){
  return(
    <><FlashCard />
    <View style={ styles.buttons }>
    <Button title='Previous' onPress={() => FlashCard.flipCard()}/>
    <Button title='Flip' onPress={() => FlashCard.flipCard()}/>
    <Button title='Next' onPress={() => FlashCard.flipCard()}/>
    </View>
    </>
    );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    paperFront : {
      position: 'absolute',
      justifyContent: 'flex-start',
      marginHorizontal: 15,
      backgroundColor: "white",
      height: '65%',
      minWidth: '90%',
      borderRadius: 5,
      marginBottom: 15,
      zIndex: 2,
    },
    paperBack : {
      position: 'absolute',
      justifyContent: 'flex-start',
      marginHorizontal: 15,
      backgroundColor: "white",
      height: '65%',
      minWidth: '90%',
      borderRadius: 5,
      marginBottom: 15,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: "white",
    }
});

