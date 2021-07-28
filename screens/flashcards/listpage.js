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

export default function List(props) {
  const [isData, setData] = useState(null);

  let FetchData = async () => {
    const events = await firestore().collection('test');
    events.get().then(querySnapshot => {
      const tempDoc = querySnapshot.docs.map(doc => {
        return {id: doc.id, ...doc.data()};
      });
      console.log(tempDoc);
      setData(tempDoc);
    });
  };

  useEffect(() => {
    FetchData();
  }, []);

  // if (isData) {
  //   let collection = isData.map(doc => {
  //     return {title: doc.collection};
  //   });
  //   collection = [...new Set(collection)];
  //   console.log(collection);
  // }
  console.log('props.route.params.data');
  console.log(props.route.params.data);
  let setsData = () => {
    let sets = null;
    if (isData) {
      let setObjects = isData.filter(
        set => set.collection == props.route.params.data,
      );
      console.log(setObjects);
      sets = setObjects.map(doc => {
        return {title: doc.set};
      });
      sets = Array.from(new Set(sets.map(d => d.title))).map(title => {
        return {
          title: title,
        };
      });
      console.log(sets);
    }
    return sets;
  };
  let SetsData = setsData();

  //   let ShowSets = isData.filter(set => set.set === props.route.params.data);

  // const set = isData.map(doc => {
  //   if (doc.collection == x) {
  //     return doc.set;
  //   }
  // // });

  // const sub = e;

  //   const DATA = [
  //     {
  //       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //       title: 'First Item',
  //     },
  //     {
  //       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //       title: 'Second Item',
  //     },
  //     {
  //       id: '58694a0f-3da1-471f-bd96-145571e29d72',
  //       title: 'Third Item',
  //     },
  //   ];

  const Item = ({title}) => (
    <TouchableHighlight
      style={{borderRadius: 10}}
      onPress={() => props.navigation.navigate('Flashcard', {data: title})}>
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
          data={SetsData}
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
