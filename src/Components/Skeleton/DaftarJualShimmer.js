import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  NativeModules,
} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {COLORS} from '../../Utils';

const DaftarJualShimmer = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <SkeletonPlaceholder>
        <View style={{width: window.width * 0.85, alignSelf: 'center'}}>
          <View style={{width: ms(250), height: ms(30)}} />
          <View
            style={{
              width: ms(280),
              height: ms(70),
              alignSelf: 'center',
              borderRadius: ms(10),
              marginVertical: ms(20),
            }}
          />
          <View style={{flexDirection: 'row'}}>
            {[1, 2, 3].map(() => (
              <View
                key={i => i}
                style={{
                  width: ms(90),
                  height: ms(40),
                  alignSelf: 'center',
                  borderRadius: ms(5),
                  marginHorizontal: ms(6),
                }}
              />
            ))}
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          {[1, 2, 3, 4, 5].map(() => (
            <View style={{flexDirection: 'row'}} key={i => i}>
              <View
                style={{
                  width: window.width * 0.4,
                  height: ms(160),
                  alignItems: 'center',
                  margin: ms(10),
                  borderRadius: ms(10),
                }}
              />
              <View
                style={{
                  width: window.width * 0.4,
                  height: ms(160),
                  alignItems: 'center',
                  margin: ms(10),
                  padding: ms(10),

                  borderRadius: ms(10),
                }}
              />
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default DaftarJualShimmer;

const {StatusBarManager} = NativeModules;
const window = Dimensions.get('window');
