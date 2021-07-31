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
  const anonymousLogin = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.title}>
        <Text
          style={{fontFamily: 'Rancho-Regular', fontSize: 80, color: 'white'}}>
          GradMate
        </Text>
      </View>
      <Image
        style={styles.image}
        source={require('../assets/icons/login.png')}
      />
      <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
        Welcome to Gradmate
      </Text>

      <Separator />
      <View style={styles.buttons}>
        <Button
          marginRight="190px"
          color="#febe29"
          title="Login with Google"
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        />
        <Separator />
        <Button
          style={styles.buttonText}
          color="#96BAFF"
          title="Continue Anonymous Login"
          onPress={() => anonymousLogin()}
        />
      </View>
      <Separator />
      <View style={{marginHorizontal: 25}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 13,
            color: 'white',
            paddingBottom: 20,
          }}>
          Please login with Google to save your progress and use dashboard.
          {'\n'}Otherwise select continue anonymous log in to use the app
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3395ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: '15%',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
  },
  image: {
    width: '90%',
    height: '40%',
    marginTop: '10%',
    marginBottom: '10%',
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  buttonText: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  separator: {
    marginVertical: 10,
  },
});
