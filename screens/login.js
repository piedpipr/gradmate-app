import * as React from 'react';
import { Button, StyleSheet, StatusBar, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';
import { firebaseConfig } from '../config/keys';

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


WebBrowser.maybeCompleteAuthSession();




export default function Login() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      behavior: 'web',
      clientId: '649180399183-eet93ekgq2ae6alkhpf8gl6hgonn411n.apps.googleusercontent.com',
      },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  return (
    <Button
      styles={ styles.container}
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
