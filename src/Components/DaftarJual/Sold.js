import {View, Text,Dimensions,Image,StyleSheet} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { COLORS,FONTS } from '../../Utils';
import {  rupiah,timeDate } from '../../Redux/actions';

const Sold = () => {
  const soldSeller = useSelector(state => state.appData.soldSeller);
  console.log("sold : ",soldSeller)
  return (
    <View>
      {soldSeller!=null ?
          <View style={{width:window.width*0.9,flexDirection:'row',flexWrap:'wrap',marginBottom:80,justifyContent:'flex-start'}}>    
          {soldSeller && soldSeller.map(item=>{
            return(
            <>
            <View 
                key={item}
                style={{flexDirection: 'row',marginTop: 24,}}>
                <View >
                  <Image style={styles.image} source={{uri:item.Product.image_url}} />
                </View>
                <View style={{flexDirection: 'column', marginLeft: 16}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 30,
                      width:window.width*0.8
                    }}>
                    <Text style={[styles.textGrey,{color:COLORS.green}]}>Product Sold</Text>
                    <Text style={[styles.textGrey, {}]}>{`${timeDate(item.Product.updatedAt)}`}</Text>
                  </View>
                  <Text style={[styles.textBlack,{marginTop:5}]}>{item.Product.name}</Text>
                  <Text style={styles.textBlack}>{`Rp. ${rupiah(item.Product.base_price)}`}</Text>
                  <Text style={styles.textBlack}>
                    Sold {`Rp. ${rupiah(item.price)}`}
                  </Text>
                </View>
              </View>
            
            </>
            )})
          }
          
          </View>
          :
          <>
            <View style={{width:window.width*0.95,flexDirection:'row',flexWrap:'wrap',marginBottom:80,justifyContent:'center'}}>
                <Text style={[styles.Text,{alignSelf:'center',fontSize:18}]}>Theres no Sold Product yet</Text>
            </View>    
          </>
          }
    </View>
  )
}

export default Sold

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Text: {
    fontSize:12,
    fontFamily:FONTS.SemiBold,
    color:COLORS.black
  },
  Kategori2:{
    flexDirection:'row',
    backgroundColor: COLORS.softDark,
    marginHorizontal: 8,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius:10,
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 12,
  },
  textBlack: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 14,
    paddingBottom: 4,
  },
    textGrey: {
    color: COLORS.grey,
    fontFamily: FONTS.Regular,
    fontSize: 12,
  },
})