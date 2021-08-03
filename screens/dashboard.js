import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Card} from 'react-native-shadow-cards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const screenWidth = Dimensions.get('window').width / 1.1;

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: null,
      isUserData: null,
    }; // ISUSER = LOGGED IN USER DATA FROM AUTH, ISUSERDATA = USER APP USAGE DATA
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  CurrentUser = () => {
    if (this.state.isUser == null) {
      const valuePromise = AsyncStorage.getItem('currentUser');
      valuePromise.then(value => {
        let val = JSON.parse(value);
        console.log('val.uid');
        console.log(val.uid);
        this.setState({isUser: val});
      });
    }
  }; // GET LOGGED IN USER DETAILS DOCUMENTSNAPSHOT SAVED IN ASYNCH FROM APP.JS

  ///////////////////////////////////////////////////////////////////////////////
  UserDATA = () => {
    if (this.state.isUser && !this.state.isUserData) {
      if (!this.state.isUser.isAnonymous) {
        let GetUserData = async () => {
          const events = await firestore()
            .collection('testusers') //CHANGE TO ORIGINSL USER COLLECTION
            .doc(this.state.isUser.uid);
          events
            .get()
            .then(documentSnapshot => {
              console.log(documentSnapshot.data());
              if (!this.state.isUserData) {
                console.log('Howdy Man');
                AsyncStorage.setItem(
                  'userOrigin',
                  JSON.stringify(documentSnapshot.data()),
                ); // SAVE DATA IN ASYNC FOR ORIGIN DATA
                console.log('FETCHED ORIGIN USER DATA');
                // AsyncStorage.getItem('userLocal').then(item => {
                //   if (!item) {
                //     AsyncStorage.setItem(
                //       'userLocal',
                //       JSON.stringify(documentSnapshot.data()),
                //     );
                //     console.log('CREATED AND SAVED LOCAL USER DATA');
                //   }
                // }); // SAVE DATA IN ASYNC FOR 1st TIME USE IN LOCAL (IF LOCAL DOESN'T EXIST YET)
                this.setState({isUserData: documentSnapshot.data()});
              }
            })
            .catch(error => {
              console.log(error);
              console.log('Error Showed');
            });
        };
        GetUserData();
      }
    }
  }; //CHECKS IF THE LOGGED IN USER IS NON ANONYMOUS, THEN SAVE DATA FROM DB TO LOCAL AND UPDATE IN EACH RENDER

  ///////////////////////////////////////////////////////////////////////////////////////////
  ChartDATA = () => {
    if (this.state.isUserData) {
      if (!this.state.isUser.isAnonymous) {
        let userdata = this.state.isUserData;
        let Learned = userdata.learned.split(',');
        let Learning = userdata.learning.split(',');
        let Arr = [Learning, Learned];
        return Arr;
      }
    } else {
      let Arr = [['Example Set'], ['Example Set']];
      return Arr;
    }
  }; //EXTRACTED USAGE DATA FOR CHART AND LIST
  componentDidMount() {
    this.CurrentUser();
  }

  render() {
    this.UserDATA();
    let PieData = this.ChartDATA();
    console.log(this.state.isUser);
    console.log(this.state.isUserData);
    if (this.state.isUser) {
      if (this.state.isUser.isAnonymous) {
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
                Please login with Google to access your dashboard. In the
                current build we are unable to provide dashboard functionality
                to the anonymous user. {'\n'}
                {'\n'}To login with Google clear the app data from Android
                setting and re-run the app. Current data will be erased.
              </Text>
            </View>
          </SafeAreaView>
        );
      } else {
        ////////////////////////////////////////////////////////////////////////////////
        const Item = ({title}) => (
          <TouchableHighlight
            style={{borderRadius: 10}}
            underlayColor="#3395ff"
            onPress={() => {
              this.props.navigation.navigate('FlashscardNav', {
                screen: 'Details',
                params: {data: title},
              });
            }}>
            <View style={styles.item}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </TouchableHighlight>
        );

        const renderItem = ({item}) => <Item title={item} />;
        /////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        const data = [
          {
            name: 'Learning',
            population: PieData[0].length - 1,
            color: '#febe29',
            legendFontColor: '#3395ff',
            legendFontSize: 15,
          },
          {
            name: 'Learned',
            population: PieData[1].length - 1,
            color: '#f75689',
            legendFontColor: '#3395ff',
            legendFontSize: 15,
          },
        ];
        ////////////////////////////////////////////////////////////
        const userphoto = this.state.isUser.photoURL;
        const Header = () => {
          return (
            <View>
              <Card
                cornerRadius={20}
                style={{
                  elevation: 0,
                  paddingTop: 30,
                  paddingBottom: 30,
                  marginTop: 20,
                  backgroundColor: 'rgba(511, 349, 255, 0.85)',
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
                    color: '#3395ff',
                    paddingTop: 10,
                    paddingBottom: 0,
                    fontWeight: 'bold',
                  }}>
                  {this.state.isUser.displayName}
                </Text>
              </Card>
              <Card
                cornerRadius={20}
                style={{
                  marginTop: 10,
                  marginBottom: 80,
                  paddingBottom: 10,
                  elevation: 0,
                  backgroundColor: 'rgba(251, 255, 255, 0.9)',
                }}>
                <Text style={styles.stats}>STATS</Text>
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
              </Card>

              <Text style={styles.heading}>Currrently Learning</Text>
            </View>
          );
        };
        const Footer = () => {
          return (
            <SafeAreaView>
              <Text style={styles.heading}>Already Learned</Text>
              <FlatList
                data={PieData[1]}
                renderItem={renderItem}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </SafeAreaView>
          );
        };
        return (
          <SafeAreaView style={styles.container}>
            <Text
              style={{
                fontFamily: 'Rancho-Regular',
                fontSize: 80,
                textAlign: 'center',
                color: 'white',
                paddingBottom: 0,
                marginBottom: 0,
                paddingTop: 30,
              }}>
              Dashboard
            </Text>
            <FlatList
              data={PieData[0]}
              renderItem={renderItem}
              keyExtractor={item => item}
              ListHeaderComponent={Header}
              ListFooterComponent={Footer}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
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
  listcontainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  stats: {
    color: '#3395ff',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: '#3395ff',
    fontWeight: 'bold',
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
