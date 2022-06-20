import { StyleSheet, Text, View } from 'react-native'
import React ,{useEffect}from 'react'
import { useSelector } from 'react-redux';

const Home = ({navigation}) => {
  const isLogin = useSelector(state => state.appData.isLogin)
  const data = useSelector(state => state.appData.data)
  console.log(data)
  useEffect(() => {
        if(isLogin==false){
          navigation.navigate("Auth")
        }
    }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})