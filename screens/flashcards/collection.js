import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Gre(props) {
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

  let collectionData = () => {
    let collection = null;
    if (isData) {
      let Objects = isData.filter(doc => doc.exam == props.route.params.data); //WORD OBJETS HAVING EXAM = ROUTE PARAMETER FROM PREVIOUS SCREEN
      collection = Objects.map(doc => {
        return {title: doc.collection};
      });
      collection = Array.from(new Set(collection.map(d => d.title))).map(
        title => {
          return {
            title: title,
          };
        },
      );
      console.log(collection);
    }
    return collection;
  };
  let CollData = collectionData();

  const Item = ({title}) => (
    <TouchableHighlight
      style={{borderRadius: 10}}
      underlayColor="#3395ff"
      onPress={() => props.navigation.navigate('ListSets', {data: title})}>
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
          }}>
          {props.route.params.data} Collections
        </Text>
        <FlatList
          data={CollData}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          contentContainerStyle={styles.listcontainer}
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
    backgroundColor: '#3395ff',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  listcontainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
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
