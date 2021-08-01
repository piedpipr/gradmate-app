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

export default function Details(props) {
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
  let subsetsData = () => {
    let subsets = null;
    if (isData) {
      let subsetObjects = isData.filter(
        set =>
          set.collection == props.route.params.prev &&
          set.set == props.route.params.data,
      );
      console.log(subsetObjects);
      subsets = subsetObjects.map(doc => {
        return {title: doc.sub};
      });
      subsets = Array.from(new Set(subsets.map(d => d.title))).map(title => {
        return {
          title: title,
        };
      });
      console.log(subsets);
    }
    return subsets;
  };
  let SubSetsData = subsetsData();

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
        <Text style={styles.heading}>SELECT STATUS</Text>
        <SwitchSelector
          style={styles.switch}
          textColor={'#3395ff'}
          selectedColor={'white'}
          buttonColor={'#f7cf79'}
          bold={true}
          options={options}
          initial={1}
          onPress={value => console.log(`Call onPress with value: ${value}`)}
        />
        <Text style={styles.heading}>CARD SETS</Text>
        <FlatList
          data={SubSetsData}
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
