import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-shadow-cards';

const Separator = () => <View style={styles.separator} />;
const screenWidth = Dimensions.get('window').width / 1.1;

export default function Dashboard() {
  const [isUser, setUser] = useState(null);

  const CurrentUser = () => {
    if (isUser == null) {
      const valuePromise = AsyncStorage.getItem('currentUser');
      valuePromise.then(value => {
        let val = JSON.parse(value);
        setUser(val);
        console.log(val);
      });
    }
  };

  useEffect(() => {
    CurrentUser();
  }, []);

  console.log(isUser);

  if (isUser) {
    if (isUser.isAnonymous) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.title}>
            <Text
              style={{
                fontFamily: 'Rancho-Regular',
                fontSize: 80,
                color: 'white',
                paddingBottom: 30,
                paddingTop: 40,
              }}>
              Dashboard
            </Text>
            <Card
              cornerRadius={15}
              style={{
                elevation: 0,
                backgroundColor: 'white',
                ...styles.containercard,
              }}>
              <Image
                source={require('../assets/icons/user.png')}
                style={{width: 140, height: 140, borderRadius: 70}}
              />
              <Text
                style={{
                  fontSize: 30,
                  color: '#3395ff',
                  paddingTop: 10,
                  paddingBottom: 0,
                  fontWeight: 'bold',
                }}>
                Anonymous
              </Text>
            </Card>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'white',
                paddingTop: 60,
                paddingHorizontal: 25,
              }}>
              Please login with Google to access your dashboard. In the current
              build we are unable to provide dashboard functionality to the
              anonymous user. {'\n'}
              {'\n'}To login with Google clear the app data from Android setting
              and re-run the app. Current data will be erased.
            </Text>
          </View>
        </SafeAreaView>
      );
    } else {
      const userphoto = isUser.photoURL;
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.title}>
            <Text
              style={{
                fontFamily: 'Rancho-Regular',
                fontSize: 80,
                color: 'white',
                paddingBottom: 30,
                paddingTop: 10,
              }}>
              Dashboard
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Card
                cornerRadius={15}
                style={{
                  elevation: 0,
                  backgroundColor: 'rgba(52, 52, 52, 0.1)',
                  paddingTop: 70,
                  paddingBottom: 70,
                  ...styles.containercard,
                }}>
                <View>
                  {userphoto == null ? (
                    <Image
                      source={require('../assets/icons/user.png')}
                      style={{width: 140, height: 140, borderRadius: 70}}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: userphoto,
                      }}
                      style={{width: 140, height: 140, borderRadius: 70}}
                    />
                  )}
                </View>
                <Text
                  style={{
                    fontSize: 30,
                    color: 'white',
                    paddingTop: 10,
                    paddingBottom: 0,
                    fontWeight: 'bold',
                  }}>
                  {isUser.displayName}
                </Text>
              </Card>
              <Card
                cornerRadius={20}
                style={{
                  marginTop: 10,
                  paddingBottom: 80,
                  elevation: 0,
                  backgroundColor: 'rgba(52, 52, 52, 0.1)',
                }}>
                <Text style={styles.heading}>STATS</Text>
                <PieChart
                  data={data}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  accessor={'population'}
                  backgroundColor={'transparent'}
                  paddingLeft={'0'}
                  center={[10, -10]}
                  absolute
                />
                <Text style={styles.heading}>COMPLETED</Text>
                <Text style={styles.heading}>INCOMPLETE</Text>
              </Card>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    }
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3395ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  containercard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '35%',
  },
  containercardSm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 10,
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  separator: {
    marginVertical: 10,
  },
});

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const data = [
  {
    name: 'Completed',
    population: 280,
    color: '#febe29',
    legendFontColor: 'white',
    legendFontSize: 15,
  },
  {
    name: 'Uncompleted',
    population: 900,
    color: '#f75689',
    legendFontColor: 'white',
    legendFontSize: 15,
  },
  {
    name: 'Unopened',
    population: 1500,
    color: 'white',
    legendFontColor: 'white',
    legendFontSize: 15,
  },
];
