import { StyleSheet, Text, View ,SafeAreaView,Image,TouchableOpacity,Dimensions} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { COLORS ,FONTS} from '../../Utils';
import { rupiah,timeDate } from '../../Redux/actions';
const Seller = () => {

  const notifDataSeller = useSelector(state => state.appData.notifDataSeller); 
  console.log("notif seller : ",notifDataSeller)
  return (
    <View>
    {notifDataSeller && notifDataSeller.map(item => {
            return (
                <TouchableOpacity  style={{flexDirection: 'row', marginTop: 24}}>
                <View >
                    <Image source={{uri:item.image_url}} style={styles.image} />
                </View>
                <View style={{flexDirection: 'column', marginLeft: 16}}>
                    <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingRight: 30,
                    }}>
                    {item.status=="bid"? <Text style={styles.textGrey}>Penawaran produk</Text> : 
                    <Text style={styles.textGrey}>Berhasil Diterbitkan</Text>
                    }  
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.textGrey, {}]}>{`${timeDate(item.updatedAt)}`}</Text>
                        {item.read==false && <View style={styles.dot} />}
                    </View>
                    </View>
                    <Text style={styles.textBlack}>{item.product_name}</Text>
                    <Text style={styles.textBlack}>{`Rp. ${rupiah(item.base_price)}`}</Text>
                    {item.bid_price!=null && 
                    <Text style={styles.textBlack}>
                    Ditawar {`Rp. ${rupiah(item.bid_price)}`}
                    </Text>
                    }
                    

                    <View
                    style={{
                        flexWrap: 'wrap',
                        width: window.width * 0.82,
                        flexDirection: 'row',
                    }}>
                    
                    {/* <Text style={[styles.textGrey]}>
                        Kamu akan segera dihubungi penjual via whatsapp
                    </Text> */}
                    
                    </View>
                </View>
                </TouchableOpacity>
    );
    })}
  </View>  
  )
}

export default Seller
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
})