import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import Input from '../Others/Input';
import Button from '../Others/Button';
import {COLORS, FONTS} from '../../Utils';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {updateProduct} from '../../Redux/actions';
import {useNavigation} from '@react-navigation/native';
const jualValidation = yup.object().shape({
  name: yup.string().required('Product Name is Required!'),
  location: yup.string().required('City is Required!'),
  base_price: yup.string().required('Price is Required!'),
  description: yup.string().required('Description is Required!'),
});

const EditForm = ({data}) => {
  console.log("data : ",data)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  console.log('data akun :', userData);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Elektronik', value: 96},
    {label: 'Aksesoris Fashion', value: 102},
    {label: 'Hobi dan Koleksi', value: 104},
    {label: 'Perlengkapan rumah', value: 107},
  ]);
  const array = [];
    data.Categories.map(item=>{
        array.push(item.id)
    })
  const categoryProduct = array.toString();
  const imagePicker = async handleChange => {
    ImagePicker.openPicker({
      width: 450,
      height: 450,
      cropping: true,
    }).then(image => {
      console.log(image);
      const uploadUri =
        Platform.OS === 'IOS' ? image.path.replace('file://', '') : image.path;
      handleChange(uploadUri);
    });
  };
  const goUpdate = (values, resetForm) => {

    dispatch(updateProduct(values, loginUser.access_token, categoryProduct,data.id)).then(
      () => {
        navigation.navigate('DaftarJual');
        resetForm();
        setValue([]);
      },
    );
  };

  const goPreview = (values,resetForm) => {
    navigation.navigate("Preview",{
      data:values,
      categoryProduct:categoryProduct,
      resetForm:resetForm,
      arrayProduct : value,
      screen:"edit",
      id:data.id,
      dataCategory:data.Categories
    })

  }
  return (
    <Formik
      initialValues={{
        name: data.name,
        description: data.description,
        base_price: data.base_price.toString(),
        location: userData?.city,
        image: data.image_url,
      }}
      validationSchema={jualValidation}
      onSubmit={(values, {resetForm}) => {
        goUpdate(values, resetForm);
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        setFieldValue,
        resetForm
      }) => (
        <View>
          <Text style={styles.Text}>Product Name</Text>
          <Input
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder={'Product Name'}
            error={errors.name}
            screen={'jual'}
          />
          <Text style={styles.Text}>Price</Text>
          <Input
            onChangeText={handleChange('base_price')}
            onBlur={handleBlur('base_price')}
            value={values.base_price}
            placeholder={'Rp 0.00'}
            error={errors.base_price}
            screen={'jual'}
          />
          <Text style={styles.Text}>Location</Text>
          <Input
            onChangeText={handleChange('location')}
            onBlur={handleBlur('location')}
            value={values.location}
            placeholder={'Location'}
            error={errors.location}
            screen={'jual'}
          />
          <Text style={styles.Text}>Description</Text>
          <Input
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            placeholder={'Description'}
            error={errors.description}
            screen={'jual'}
          />
          <Text style={styles.Text}>Product Image</Text>
          <View style={{width: window.width * 0.8, alignSelf: 'center'}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {values.image == '' ? (
                <TouchableOpacity
                  style={styles.Category}
                  onPress={() => {
                    imagePicker(handleChange('image'));
                  }}>
                  <Icon
                    style={styles.Icon}
                    name={'plus'}
                    size={50}
                    color={COLORS.grey}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.Category}
                  onPress={() => {
                    setFieldValue('image', '');
                  }}>
                  <ImageBackground
                    style={styles.Image}
                    source={{uri: values.image}}>
                    <Icon
                      style={styles.Icon}
                      name={'minus'}
                      size={50}
                      color={COLORS.grey}
                    />
                  </ImageBackground>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <Button caption={'Preview'} onPress={()=>{goPreview(values,resetForm)}}/>
            <Button caption={'Posting'} onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default EditForm;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Text: {
    paddingLeft: 40,
    color: COLORS.black,
    fontFamily: FONTS.Regular,
  },
  Dropdown: {
    width: window.width * 0.8,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 25,
    borderColor: COLORS.grey,
  },
  Icon: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Category: {
    width: window.width * 0.3,
    height: 110,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: 'center',
  },
  Image: {
    width: window.width * 0.3,
    height: 110,
    justifyContent: 'center',
    borderRadius: 5,
  },
});
