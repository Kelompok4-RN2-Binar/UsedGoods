import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {FONTS} from '../../Utils/Fonts';
import {COLORS} from '../../Utils/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const Notifikasi = () => {
  const token = useSelector(state => state.appData.token);
  console.log('token  :', token);
  const arr = [1, 2, 3, 4, 5];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <ScrollView>
        <View
          style={{
            margin: 16,
            marginTop: 46,
          }}>
          <Text style={styles.textBold}>Notifikasi</Text>
          {arr.map(a => {
            return (
              <TouchableOpacity
                key={a}
                style={{flexDirection: 'row', marginTop: 24}}>
                <View style={styles.image}>
                  <Image />
                </View>
                <View style={{flexDirection: 'column', marginLeft: 16}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 30,
                    }}>
                    <Text style={styles.textGrey}>Penawaran produk</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.textGrey, {}]}>20 Apr 14:04</Text>
                      <View style={styles.dot} />
                    </View>
                  </View>
                  <Text style={styles.textBlack}>Jam Tangan Casio</Text>
                  <Text style={styles.textBlack}>Rp 250.000</Text>
                  <Text style={styles.textBlack}>
                    Berhasil Ditawar Rp. 200.000
                  </Text>
                  <View
                    style={{
                      flexWrap: 'wrap',
                      width: window.width * 0.82,
                      flexDirection: 'row',
                    }}>
                    <Text style={[styles.textGrey]}>
                      Kamu akan segera dihubungi penjual via whatsapp
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifikasi;
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width * 1,
    backgroundColor: COLORS.white,
    paddingBottom: 80,
  },
  textBold: {
    color: COLORS.black,
    fontFamily: FONTS.Bold,
    fontSize: 24,
  },
  text: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 22,
  },
  textGrey: {
    color: COLORS.grey,
    fontFamily: FONTS.Regular,
    fontSize: 12,
    paddingBottom: 4,
  },
  textBlack: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 14,
    paddingBottom: 4,
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 12,
  },
  dot: {
    backgroundColor: '#FA2C5A',
    width: 8,
    height: 8,
    borderRadius: 10,
    marginTop: 4,
    marginLeft: 8,
  },
});
