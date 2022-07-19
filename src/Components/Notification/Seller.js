import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ScrollView
} from 'react-native';
import React ,{useState,useCallback} from 'react';
import {useSelector} from 'react-redux';
import {getDetailNotification, readNotif, rupiah, timeDate} from '../../Redux/actions';
import {COLORS, FONTS} from '../../Utils';
import { getNotificationSeller } from '../../Redux/actions';
import { useDispatch } from 'react-redux';
import BottomModal from '../Others/BottomModal';
const Seller = () => {
  const notifDataSeller = useSelector(state => state.appData.notifDataSeller);
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.appData.loginUser);
  const [refreshing, setRefreshing] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [component,setComponent] = useState(null);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    dispatch(getNotificationSeller(loginUser.access_token)).then(()=>{setRefreshing(true)})
    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);
  const loadData = useCallback(() => {
    dispatch(getNotificationSeller(loginUser.access_token))
   }, []);

  const onDismiss = () => {
      setopenModal(false);
      var dataDetail = null;
    };
  var dataDetail =  useSelector(state => state.appData.notifDataDetail);

  
  const onOpenAccepted = (id) => {
    
    if(dataDetail.id==id){
      setopenModal(true);
      setRefreshing(true)
      dispatch(readNotif(loginUser.access_token,dataDetail.id)).then(()=>{
        loadData()
        wait(500).then(() => {
          setRefreshing(false);
        });
        setComponent(
        <View style={{width:window.width}}>
          {dataDetail.id==id &&
          <View style={{justifyContent:'center',alignItems:'center',width:window.width*0.9,alignSelf:'center'}}>
            {dataDetail.status=="bid" && 
              <>
              <Text style={[styles.Text,{alignSelf:'center',fontSize:14,paddingTop:10,fontFamily:FONTS.SemiBold,color:COLORS.green}]}>Yeay you managed to get a suitable price :)</Text>
              <Text style={[styles.Text,{alignSelf:'center',fontSize:16,paddingTop:10,fontFamily:FONTS.SemiBold}]}>Product Bid</Text>
              <View style={{flexDirection: 'row',paddingVertical:20,width:window.width*0.9,marginLeft:20,}}>
                <Image
                  style={styles.imageUser}
                />
                <View style={{flexDirection: 'column'}}>
                  <Text style={[styles.Text,{fontSize:18}]}>{dataDetail.buyer_name}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row',paddingVertical:20,width:window.width*0.9,marginLeft:20}}>
                <Image
                  style={styles.imageUser}
                  source={{uri:dataDetail.Product.image_url}}
                />
                <View style={{flexDirection: 'column'}}>
                  <Text style={[styles.Text,{fontSize:14}]}>{dataDetail.Product.name}</Text>
                  <Text style={[styles.Text,{fontSize:14}]}>{`Rp. ${rupiah(dataDetail.Product.base_price)}`}</Text>
                  <Text style={[styles.Text,{fontSize:14}]}>Ditawar {`Rp. ${rupiah(dataDetail.bid_price)}`}</Text>
                </View>
              </View>
              
              </>
            }{dataDetail.status=="create" && 
              <>
              <Text style={[styles.Text,{alignSelf:'center',fontSize:14,paddingTop:10,fontFamily:FONTS.SemiBold,color:COLORS.green}]}>Yeay you managed to publised product!</Text>
              <Text style={[styles.textGrey,{alignSelf:'center',fontSize:14}]}>Hope you get best price with the buyer!</Text>    

              <View style={{flexDirection: 'row',paddingTop:20,width:window.width*0.9,marginLeft:20}}>
                <Image
                  style={{width:60,height:60,borderRadius:10,marginRight:20}}
                  source={{uri:dataDetail.image_url}}
                />
                <View style={{flexDirection: 'column',marginBottom:10}}>
                  <Text style={[styles.Text,{fontSize:16,fontFamily:FONTS.SemiBold}]}>{dataDetail.product_name}</Text>
                  <Text style={[styles.Text,{fontSize:14}]}>{`Rp. ${rupiah(dataDetail.base_price)}`}</Text>
                  <Text style={[styles.textGrey]}>{`${timeDate(dataDetail.updatedAt)}`}</Text>
                </View>
              </View>  
              </>
            }
          </View>
          }
        </View>
      )  
      })
      
    }
  };
  return (
    <View>
    <ScrollView
        contentContainerStyle={styles.Box}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="green"
            colors={['green']}
          />
    }>
      {notifDataSeller &&
        notifDataSeller.map(item => {
          return (
            <TouchableOpacity
              style={{flexDirection: 'row', marginTop: 20,}}
              key={item.id}
              onPress={()=>{
                dispatch(getDetailNotification(loginUser.access_token,item.id)).then(()=>{
                  onOpenAccepted(item.id)
                })
              }}>
              {item.Product!=null ?
              <>
              <Image source={{uri: item.Product.image_url}} style={styles.image} />
                <View style={{flexDirection: 'column', marginLeft: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 30,
                      width:window.width*0.8
                    }}>
                  
                    {item.status == 'bid' ? (
                      <Text style={styles.textGrey}>Product Offer</Text>
                    ) : (
                      <Text style={styles.textGrey}>Successfully published</Text>
                    )}
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.textGrey]}>{`${timeDate(
                        item.Product.updatedAt,
                      )}`}</Text>
                      {item.read == false && <View style={styles.dot} />}
                    </View>
                  </View>
                  <Text style={styles.textBlack}>{item.Product.name}</Text>
                  <Text style={styles.textBlack}>{`Rp. ${rupiah(
                    item.Product.base_price,
                  )}`}</Text>
                  {item.bid_price != null && (
                    <Text style={styles.textBlack}>
                      Ditawar {`Rp. ${rupiah(item.bid_price)}`}
                    </Text>
                  )}
                </View>
                </>
                :
                <>
                <Image source={{uri: item.image_url}} style={styles.image} />
                <View style={{flexDirection: 'column', marginLeft: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 30,
                      width:window.width*0.8
                    }}>
                  
                    {item.status == 'bid' ? (
                      <Text style={styles.textGrey}>Product Offer</Text>
                    ) : (
                      <Text style={styles.textGrey}>Successfully published</Text>
                    )}
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.textGrey]}>{`${timeDate(
                        item.updatedAt,
                      )}`}</Text>
                      {item.read == false && <View style={styles.dot} />}
                    </View>
                  </View>
                  <Text style={styles.textBlack}>{item.product_name}</Text>
                  <Text style={styles.textBlack}>{`Rp. ${rupiah(
                    item.base_price,
                  )}`}</Text>
                  {item.bid_price != null && (
                    <Text style={styles.textBlack}>
                      Ditawar {`Rp. ${rupiah(item.bid_price)}`}
                    </Text>
                  )}
                </View>
                </>
                }
              
            </TouchableOpacity>
            
          );
        })}
       {openModal && (
          <BottomModal  onDismiss={onDismiss}>
                    {component}
          </BottomModal>
        )}     
    </ScrollView>
    </View>
  );
};

export default Seller;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
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
  Box: {
    width: window.width * 0.9,
  },
  
  textBlack: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 14,
    paddingBottom: 4,
  },
 
  imageUser:{
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 20,
    backgroundColor: 'black',
  },
  Text: {
    fontSize: 12,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
  },
});
