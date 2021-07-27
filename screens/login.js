import * as React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '649180399183-c9tjjhg6m1m8h5higmkrfto8uub9gmv8.apps.googleusercontent.com',
});

const Separator = () => <View style={styles.separator} />;

export default function Dashboard() {
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.title}>
        <Text
          style={{fontFamily: 'Rancho-Regular', fontSize: 80, color: 'red'}}>
          GradMate
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
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
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
