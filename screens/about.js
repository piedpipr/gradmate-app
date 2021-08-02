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

const Separator = () => <View style={styles.separator} />;

export default class About extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text
            style={{
              fontFamily: 'Rancho-Regular',
              fontSize: 80,
              color: '#f75689',
            }}>
            Thank You
          </Text>
          <Image
            source={require('../assets/icons/thankyou.png')}
            style={{width: 300, height: 200}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#219ebc'}}>
            From the developer
          </Text>
        </View>
        <Separator />
        <Separator />
        <View style={{marginHorizontal: 25, marginBottom: -100}}>
          <Text style={{textAlign: 'center', fontSize: 16, color: '#219ebc'}}>
            This is my first ever app. This app was not meant to be professional
            rather educational for me, however I found that it could be useful
            for some people. There are tons of features still missing. I hope
            too integrate a fully functional Dashboard , Quiz and Challenge
            section in the upcoming updates if I get to work. Thank you for
            installing :D {'\n'}
            {'\n'}
            {'\n'}Contact :{'\n'}gradmate@googlegroups.com
          </Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
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
