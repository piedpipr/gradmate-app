import React from 'react';
import {
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
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
          style={{
            fontFamily: 'Rancho-Regular',
            fontSize: 80,
            color: 'white',
          }}>
          Flashcards
        </Text>
        <Text style={styles.title}>SELECT EXAM TYPE</Text>
        <Image
          source={require('../../assets/icons/screen2.png')}
          style={{
            width: 350,
            height: 350,
          }}
        />
        <Separator />
        <View style={styles.cards}>
          <TouchableHighlight
            underlayColor="#febe29"
            onPress={() =>
              this.props.navigation.navigate('Collection', {data: 'IELTS'})
            }>
            <Card
              cornerRadius={15}
              style={{
                backgroundColor: 'white',
                padding: 10,
                margin: 10,
                elevation: 0,
                opacity: 0.92,
              }}>
              <View>
                <Text style={styles.ielts}>IELTS</Text>
              </View>
            </Card>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#febe29"
            onPress={() =>
              this.props.navigation.navigate('Collection', {data: 'GRE'})
            }>
            <Card
              cornerRadius={15}
              style={{
                backgroundColor: 'white',
                padding: 10,
                margin: 10,
                elevation: 0,
                opacity: 0.92,
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
    backgroundColor: '#febe29',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  ielts: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#3395ff',
  },
  gre: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#3395ff',
  },
  cards: {
    marginTop: 5,
  },

  separator: {
    marginVertical: 30,
  },
});
