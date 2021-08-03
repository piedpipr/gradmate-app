import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function List(props) {
  const [isData, setData] = useState(null);

  ///////////////////////////////////////////////////////////////////////////////////

  const LocalData = () => {
    if (isData == null) {
      const valuePromise = AsyncStorage.getItem('WORDS');
      valuePromise.then(value => {
        let val = JSON.parse(value);
        setData(val);
      });
    }
  }; // LOAD WORD DATA FROM LOCAL ASYNCSTORAGE

  /////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    LocalData();
  }, []);

  let previous = props.route.params.data; //DATA FROM PREVIOUS SCREEN

  let setsData = () => {
    let sets = null;
    if (isData) {
      let setObjects = isData.filter(
        set => set.collection == props.route.params.data,
      ); //WORD OBJETS HAVING COLLECTIONS = ROUTE PARAMETER FROM PREVIOUS SCREEN

      sets = setObjects.map(doc => {
        return {title: doc.set};
      }); // RETURN ARRAY OF SET PROPERTY OF DOSC WITH MATCHING COLLECTION
      sets = Array.from(new Set(sets.map(d => d.title))).map(title => {
        return {
          title: title,
        };
      }); // REMOVES REDUNDANT ELEMENT PAIRS
      console.log(sets);
    }
    return sets;
  };
  let SetsData = setsData();

  const Item = ({title}) => (
    <TouchableHighlight
      underlayColor="#febe29"
      style={{borderRadius: 10}}
      onPress={() =>
        props.navigation.navigate('Details', {data: title, prev: previous})
      }>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
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

        <FlatList
          data={SetsData}
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
    backgroundColor: '#febe29',
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
});
