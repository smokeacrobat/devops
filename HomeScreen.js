import * as React from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';

export default function HomeScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    LobsterTwo: require('./LobsterTwo.otf'),
  });

  // All States
  const [getorigPrice, settorigPrice] = useState('');
  const [getdiscountPrc, setdiscountPrc] = useState('');
  const [getsavedAmount, setSavedAmount] = useState('0.00');
  const [getfinalPrice, setFinalPrice] = useState('0.00');
  const [getCalError, setCalError] = useState('');
  const [geHistory, setHistory] = useState([]);
  const [getmodalVisibility, setmodalVisibility] = useState(false);
  const [getsaveBtnState, settsaveBtnState] = useState(true);

  const calculateDiscount = () => {
    if (getorigPrice != '' && getdiscountPrc != '') {
      if (getdiscountPrc <= 100 && getorigPrice >= 0 && getdiscountPrc >= 0) {
        var saved = (getorigPrice * getdiscountPrc) / 100;
        var final_Price = getorigPrice - saved;
        setSavedAmount(saved.toFixed(2));
        setFinalPrice(final_Price.toFixed(2));
        setCalError('');
      } else if (getdiscountPrc > 100) {
        setCalError('Discount must be less than 100%');
      } else if (getorigPrice < 0) {
        setCalError('Original Price must be Greater than 0');
      } else if (getdiscountPrc < 0) {
        setCalError('Discount% must be Greater than 0');
      }
    } else {
      setCalError('Empty Field(s) Found!');
    }
  };

  const saveResult = () => {
    if (getorigPrice != '' || getdiscountPrc != '') {
      const resultObj = {
        id: Math.random().toString(),
        original_Price: getorigPrice,
        discount_Percentage: getdiscountPrc,
        final_Price_Var: getfinalPrice,
      };

      setHistory((oldHistory) => [...oldHistory, resultObj]);
      settorigPrice('');
      setdiscountPrc('');
      settsaveBtnState(true);
      setFinalPrice('0.00');
      setSavedAmount('0.00');
      setmodalVisibility(true);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 100 }} />
        <Text style={[styles.heading, { fontFamily: 'Arial' }]}>
          Discount-Calculator
        </Text>
        <View style={{ marginTop: 60 }} />

        {/* Output Results */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.resultBtnText}>Final Amount :</Text>
          <Text style={styles.getfinalPriceText}> Rs {getfinalPrice}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.resultBtnText}>Savings :</Text>
          <Text style={[styles.getfinalPriceText, { color: '#ffffff' }]}>
            {' '}
            Rs {getsavedAmount}
          </Text>
        </View>

        

        <View style={{ marginTop: 10 }} />
        <Text style={{ fontSize: 15, color: '#E74C3C' }}>{getCalError}</Text>
        <View style={{ marginTop: 10 }} />

        {/* Text Fields */}
        <TextInput
          keyboardType={'number-pad'}
          value={getorigPrice}
          onChangeText={(orgPrice) => {
            orgPrice == '' || getdiscountPrc == ''
              ? settsaveBtnState(true)
              : settsaveBtnState(false);
            settorigPrice(orgPrice);
          }}
          style={styles.textFields}
          placeholder={'Original Price'}
          placeholderTextColor="#b5c1c6"
        />
        <View style={{ paddingTop: 10 }} />
        <TextInput
          value={getdiscountPrc}
          keyboardType={'number-pad'}
          onChangeText={(discountPercentage) => {
            discountPercentage == '' || getorigPrice == ''
              ? settsaveBtnState(true)
              : settsaveBtnState(false);
            setdiscountPrc(discountPercentage);
          }}
          style={styles.textFields}
          placeholder={'Discount %'}
          placeholderTextColor="#b5c1c6"
        />
        <View style={{ paddingTop: 20 }} />

        <TouchableOpacity
          onPress={() => calculateDiscount()}
          style={styles.calculateBtn}>
          <Text style={styles.calculateBtnText}>Calculate</Text>
        </TouchableOpacity>

        <View style={{ paddingTop: 20 }} />

        <TouchableOpacity
          disabled={getsaveBtnState}
          onPress={() => saveResult()}
          style={[
            styles.saveBtn,
            getsaveBtnState == true
              ? {
                  borderColor: '#305746',
                }
              : {
                  borderColor: '#33bf5c',
                },
          ]}>
          <Text
            style={[
              styles.saveBtnText,
              getsaveBtnState == true
                ? {
                    color: '#ffffff',
                  }
                : {
                    color: '#b5c1c6',
                  },
            ]}>
            Save
          </Text>
        </TouchableOpacity>

        <View style={{ paddingTop: 80 }} />

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('History', {
              geHistoryObject: geHistory,
            })
          }
          style={styles.geHistoryBtn}>
          <Text style={styles.geHistoryBtnText}>History</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  heading: {
    color: 'white',
    fontSize: 28,
    fontWeight: '100',
    letterSpacing: 2,
    fontFamily: 'Montserrat',
  },
  textFields: {
    height: 50,
    width: 280,
    borderColor: '#b5c1c6',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 15,
    borderRadius: 10,
    color: 'white',
  },
  calculateBtn: {
    height: 50,
    width: 200,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 2,
  },
  calculateBtnText: {
    fontSize: 20,
    color: 'white',
  },
  saveBtn: {
    height: 50,
    width: 200,
    backgroundColor: 'grey',
    alignItems: 'center',
    color: 'white',
    justifyContent: 'center',
    borderRadius: 5,
  },
  saveBtnText: {
    fontSize: 18,
    color: 'white',
  },
  geHistoryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    color: 'black',
    height: 50,
    width: 200,
    borderRadius: 5,
  },
  geHistoryBtnText: {
    fontSize: 14,
    color: '#ffffff',
  },
  resultBtnText: {
    fontSize: 30,
    color: '#b5c1c6',
  },
  getfinalPriceText: {
    marginTop: 5,
    fontSize: 25,
    color: 'white',
  },
});
