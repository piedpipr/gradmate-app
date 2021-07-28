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
import firestore from '@react-native-firebase/firestore';

export default function Gre({navigation}) {
  const [isData, setData] = useState(null);

  let FetchData = async () => {
    const events = await firestore().collection('test');
    events.get().then(querySnapshot => {
      const greDoc = querySnapshot.docs.map(doc => {
        return {id: doc.id, ...doc.data()};
      });
      console.log(greDoc);
      setData(greDoc);
    });
  };

  useEffect(() => {
    FetchData();
  }, []);

  let collectionData = () => {
    let collection = null;
    if (isData) {
      collection = isData.map(doc => {
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
      onPress={() => navigation.navigate('ListSets', {data: title})}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderItem = ({item}) => <Item title={item.title} />;
  if (isData) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={CollData}
          renderItem={renderItem}
          keyExtractor={item => item.title}
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
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#219ebc',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
  },
});
