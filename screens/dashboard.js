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

export default class Dashboard extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text
            style={{fontFamily: 'Rancho-Regular', fontSize: 80, color: 'red'}}>
            Dashboard
          </Text>
          <Image
            source={require('../assets/home.gif')}
            style={{width: 350, height: 350}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#219ebc'}}>
            Welcome to Gradmate
          </Text>
        </View>
        <Separator />
        <View style={styles.buttons}>
          <Button
            marginRight="190px"
            color="#219ebc"
            title="Login with Google"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
          <Separator />
          <Button
            color="#fb8500"
            title="Continue Without Login"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
        <Separator />
        <View style={{marginHorizontal: 25, marginBottom: -100}}>
          <Text style={{textAlign: 'center', fontSize: 13, color: '#219ebc'}}>
            Please login with Gmail to save your progress.{'\n'}Otherwise select
            continue without log in to use the app
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
