import React from 'react';
import {
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
  Text,
} from 'react-native';
import {Card} from 'react-native-shadow-cards';

const Separator = () => <View style={styles.separator} />;

export default class FlashCards extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text
          style={{fontFamily: 'Rancho-Regular', fontSize: 80, color: 'red'}}>
          Flashcards
        </Text>
        <Text style={styles.title}>SELECT EXAM TYPE</Text>
        <Separator />
        <View style={styles.cards}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="white"
            onPress={() => this.props.navigation.navigate('IELTSFlashcards')}>
            <Card
              style={{
                backgroundColor: '#219ebc',
                padding: 10,
                margin: 10,
                elevation: 5,
              }}>
              <View>
                <Text style={styles.ielts}>IELTS</Text>
              </View>
            </Card>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="white"
            onPress={() => this.props.navigation.navigate('GREFlashcards')}>
            <Card
              style={{
                backgroundColor: '#fb8500',
                padding: 10,
                margin: 10,
                elevation: 5,
              }}>
              <View>
                <Text style={styles.gre}>GRE</Text>
              </View>
            </Card>
          </TouchableHighlight>
        </View>
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
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'red',
  },
  ielts: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
  },
  gre: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
  },
  cards: {
    marginTop: 70,
  },

  separator: {
    marginVertical: 30,
  },
});
