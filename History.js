import * as React from 'react';
import { useState } from 'react';
import { DataTable } from 'react-native-paper';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Modal,
} from 'react-native';

export default function History({ navigation, route }) {
  const [getdata, setdata] = useState(route.params.historyObject);
  const [getmodalVisibilty, setModalVisibility] = useState(false);

  const clearHistory = () => {
    for (let i = 0; i < getdata.length; i++) {
      setdata(delete getdata[i]);
    }
  };

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor="purple" />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Original Price</DataTable.Title>
          <DataTable.Title numeric>Discount %</DataTable.Title>
          <DataTable.Title numeric>Final Price</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={getdata}
          renderItem={({ item, index }) => {
            if (item != undefined) {
              return (
                
                  <DataTable.Row>
                    <DataTable.Cell>Rs {item.original_Price}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {item.discount_Percentage}%
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      Rs {item.final_Price_Var}
                    </DataTable.Cell>
                  </DataTable.Row>
                
              );
            }
          }}
          keyExtractor={(index) => {
            return index;
          }}
        />
      </DataTable>

     
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
    // backgroundColor: 'black',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 280,
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 13,
  },
  modalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    width: 80,
    height: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textStyle: {
    color: 'white',
  },
});
