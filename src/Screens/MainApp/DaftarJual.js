import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {FotoProduct} from '../../Assets/Images';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../Utils/Colors';


const DaftarJual = () => {
  return (
   
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.gambar} source={FotoProduct} />
        </View>
        <View style={{flexDirection: 'row', marginTop: -90}}>
          
        <TouchableOpacity>
        <Icon style={styles.back} name={"keyboard-backspace"} size={50} color={COLORS.dark} />
          
        </TouchableOpacity>
        </View>
        <View style={styles.container1}>
          <Text style={{left: 20, top: 10, fontWeight: 'bold', fontSize: 20}}>
            Jam Tangan Casio
          </Text>
          <Text style={{left: 20, top: 13}}> Aksesoris </Text>
          <Text style={{left: 20, top: 20, fontSize: 20}}> Rp.250.000 </Text>
        </View>

        <View style={styles.container2}>
         <Icon  style={{marginLeft: 20, top: 10}} name={"face-man"} size={50} color={COLORS.dark} />
    
          <View style={{flexDirection: 'column', top: 10, left: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              
              Nama Penjual
            </Text>
            <Text> Kota </Text>
          </View>
        </View>
        <View style={styles.container3}>
          <Text style={{fontWeight: 'bold', left: 20, fontSize: 20, top: 10}}>
            
            Deskripsi
          </Text>

          <Text style={{top: 20, fontSize: 20}}>
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
        
        
      </ScrollView>
   
  );
};

export default DaftarJual;

const styles = StyleSheet.create({
  containerUtama: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  gambar: {
    width: 490,
    height: 350,
    left: 0,
    top: 0,
  },
  back: {
    left: 20,
    top: -250,
  },
  container1: {
    left: 30,
    marginTop: -1,
    flexDirection: 'column',
    borderRadius: 10,
    width: 330,
    height: 100,
    backgroundColor: 'white',
  },
  container2: {
    left: 30,
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 25,
    width: 330,
    height: 70,
    backgroundColor: 'white',
  },
  container3: {
    left: 30,
    flexDirection: 'column',
    borderRadius: 10,
    marginTop: 25,
    width: 330,
    height: 280,
    flex: 1,
    backgroundColor: 'white',
  },
});
