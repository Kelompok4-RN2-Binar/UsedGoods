import { StyleSheet, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import {IconHome,IconHomeActive,IconAkun,IconAkunActive,IconDaftarJual,IconDaftarJualActive,IconJual,IconJualActive,IconNotif,IconNotifActive} from '../../Assets'
import { FONTS } from '../../Utils/Fonts'
const TabItem = ({isFocused,onPress,onLongPress,label}) => {
    const Icons = () => {
          if (label=== "Home") return isFocused ? <IconHomeActive/> : <IconHome />
          if (label=== "Notifikasi") return isFocused ? <IconNotifActive/> :<IconNotif/> 
          if (label=== "Jual") return isFocused ? <IconJualActive/> : <IconJual />
          if (label=== "DaftarJual") return isFocused ? <IconDaftarJualActive/> : <IconDaftarJual />
          if (label=== "Akun") return isFocused ? <IconAkunActive/> : <IconAkun />
          return <IconHome />
        }
  return (
    <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>

            <Icons/>
            <Text style={styles.text(isFocused)}>
            {label}
            </Text>
          </TouchableOpacity>
  )
}

export default TabItem;

const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        justifyContent: 'space-evenly',
    },
    text : (isFocused) => ({
        fontSize:12,
        color: isFocused ? '#7126B5' :'#222222',
        fontFamily:  isFocused ? FONTS.Bold :FONTS.Regular,
    })
})