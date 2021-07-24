import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
  Text,
  Button,
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import Gre from './grecards';

const Separator = () => <View style={styles.separator} />;

export default class Test2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExam: null,
    };
  }
  render() {
    if (!this.state.isExam) {
      return (
        <SafeAreaView style={styles.container}>
          <Text
            style={{fontFamily: 'Rancho-Regular', fontSize: 80, color: 'red'}}>
            Flashcards
          </Text>
          <Text style={styles.title}>SELECT EXAM TYPE</Text>
          <Separator />
          <View style={styles.cards}>
            <TouchableOpacity onPress={() => this.setState({isExam: 'IELTS'})}>
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
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({isExam: 'GRE'})}>
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
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
    if (this.state.isExam == 'IELTS') {
      return <Gre />;
    } else {
      return <Gre />;
    }
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
