import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Platform,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler} from 'react-native';

export default function Details(props) {
  const [isUserID, setUserID] = useState(null);
  const [isUserData, setUserData] = useState(null);
  const [isData, setData] = useState(null);
  const [isSwitch, setSwitch] = useState(1);
  ///////////////////////////////////////////////////////////////////
  function handleBackButtonClick() {
    props.navigation.navigate('Flashcards');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []); //EVENT LISTENER TO LISTEN NATIVE ANDROID BACK BUTTON PRESS THUS RETURNING TO LIST HOME
  ////////////////////////////////////////////////////////////////////////////////
  const CurrentUserID = () => {
    AsyncStorage.getItem('currentUserID').then(val => {
      if (isUserID === null) {
        console.log(val);
        setUserID(val);
      }
    });
  }; //SHOWS CURRENT USER ID FROM ASYNCSTORAGE

  ///////////////////////////////////////////////////////////////////////////////////

  const LocalData = () => {
    if (isData == null) {
      const valuePromise = AsyncStorage.getItem('GRE');
      valuePromise.then(value => {
        let val = JSON.parse(value);
        setData(val);
        console.log(val);
      });
    }
  };
  LocalData(); // LOAD WORD DATA FROM LOCAL ASYNCSTORAGE

  /////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    CurrentUserID();
  }, []);

  console.log('props.route.params.data');
  console.log(props.route.params.data);
  ////////////////////////////////////////////////////////////////////////////////
  const SwitchSelect = () => {
    if (isSwitch === 1) {
      console.log('Working22222');
      let userdata = isUserData;
      let Learned = userdata.learned.split(',');
      let Learning = userdata.learning.split(',');
      if (Learned.find(element => element === props.route.params.data)) {
        setSwitch(2);
      }
      if (Learning.find(element => element === props.route.params.data)) {
        setSwitch(0);
      }
    }
  };

  ///////////////////////////////////////////////////////////////////////////////
  let subsetsData = () => {
    let subsets = null;
    if (isData) {
      let subsetObjects = isData.filter(
        set => set.set == props.route.params.data,
      ); //FILTER JSON OBJECTS ARRAY BY PROPERTIES
      console.log(subsetObjects);
      subsets = subsetObjects.map(doc => {
        return {title: doc.sub};
      }); // RETURNS ARRAY OF ONLY 'TITLE:'SUB' PAIRS FOR ALL DOCS/OBJECTS
      subsets = Array.from(new Set(subsets.map(d => d.title))).map(title => {
        return {
          title: title,
        };
      }); //REMOVES REDUNDANT DATA AND GIVES UNIQUE VALUES IN ARRAY
      console.log(subsets);
    }
    return subsets;
  };
  let SubSetsData = subsetsData();
  ////////////////////////////////////////////////////////////////////////////////

  const Item = ({title}) => (
    <TouchableHighlight
      underlayColor="#f75689"
      style={{borderRadius: 10, minWidth: '100%'}}
      onPress={() => props.navigation.navigate('Flashcard', {data: title})}>
      <View style={styles.item}>
        <Text style={styles.title}>Words From {title}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderItem = ({item}) => <Item title={item.title} />;
  if (isData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            paddingTop: 30,
            paddingBottom: 30,
          }}>
          {props.route.params.data}
        </Text>
        <Text style={styles.heading}>SET STATUS</Text>
        <SwitchSelector
          style={styles.switch}
          textColor={'#3395ff'}
          selectedColor={'white'}
          buttonColor={'#f7cf79'}
          bold={true}
          options={options}
          initial={isSwitch}
          onPress={value => console.log(`Call onPress with value: ${value}`)}
        />
        <Text style={styles.heading}>CARD SETS</Text>
        <FlatList
          data={SubSetsData}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  } else {
    return <ActivityIndicator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f75689',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: '#3395ff',
    fontWeight: 'bold',
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 10,
  },
  switch: {
    maxWidth: '93%',
    marginBottom: 20,
    marginTop: 5,
  },
});

// if (isData) {
//   return <FlashCard words={isData} />;
// } else {
//   return (
//     <SafeAreaView>
//       <Text>Hello</Text>
//       <Button
//         marginRight="190px"
//         color="#219ebc"
//         title="Read"
//         onPress={() => FetchData()}
//       />
//     </SafeAreaView>
//   );
// }
const options = [
  {label: 'Learning', value: '1'},
  {label: 'Auditing', value: '1.5'},
  {label: 'Learned', value: '2'},
];
