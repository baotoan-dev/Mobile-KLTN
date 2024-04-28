import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { CreateCvExtraInformation, CreateMoreCvExtraInformation } from '../helpers/CreateCvExtraInformation';
import { createCvExtraInformationAction, getCvExtraInformationAction } from '../../../../../redux/store/CvExtraInformation/CvExtraInformationSlice';
import { createCvListExtraInformaion } from '../helpers/CreateCvListExtraInformation';
import { useDispatch, useSelector } from 'react-redux';
import { TYPE_AWARD } from '../../constant/constantContentCv';

export default function AddAward(prop) {
  const navigation = useNavigation();
  const { cvIndexParent } = prop.route.params;
  const [listExtraInformation, setListExtraInformation] = useState([]);
  const [listOtherInformation, setListOtherInformation] = useState([]);
  const dispatch = useDispatch();
  const cvExtraInformation = useSelector(state => state.cvExtraInformation.cvExtraInformation);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [startTime, setStartTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (cvExtraInformation) {
      const data = createCvListExtraInformaion(cvExtraInformation);

      const newData = data && data.filter(item => item.type === TYPE_AWARD);

      const otherData = data && data.filter(item => item.type !== TYPE_AWARD);

      setListOtherInformation(otherData);

      setListExtraInformation(newData ? newData[0] : {});
    }
  }, [cvExtraInformation])



  const handleSaveExtraInformation = async () => {
    let col = listExtraInformation && listExtraInformation.col ? listExtraInformation.col : 0;
    let cvIndex = cvIndexParent;
    let part = listExtraInformation && listExtraInformation.part ? listExtraInformation.part : 0;
    let row = listExtraInformation && listExtraInformation.row ? listExtraInformation.row : 0;
    let type = listExtraInformation && listExtraInformation.type ? listExtraInformation.type : TYPE_AWARD;

    const newListExtraInformation = {
      col: col,
      cvIndex: cvIndex,
      part: part,
      row: row,
      type: type,
      moreCvExtraInformations: [
        ...(listExtraInformation && listExtraInformation.moreCvExtraInformations) ? listExtraInformation.moreCvExtraInformations : [],
        {
          position: position,
          time: startTime,
          company: company,
          description: description,
          index: listExtraInformation ? listExtraInformation.moreCvExtraInformations.length: 0,
        }
      ]
    };

    const newDataCvExtraInformation = CreateCvExtraInformation(type, row, col, cvIndex, part, newListExtraInformation.moreCvExtraInformations);

    listOtherInformation.push(newDataCvExtraInformation);

    if (newDataCvExtraInformation) {
      dispatch(createCvExtraInformationAction(listOtherInformation)).then(() => {
        dispatch(getCvExtraInformationAction(cvIndexParent));
      });
    }

    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginLeft: 5,
          }}>Thêm giải thưởng
        </Text>
        <TouchableOpacity
          onPress={() => {
            handleSaveExtraInformation();
          }}
        >
          <Text style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: 'blue',
          }}>
            Lưu
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {/* name skill */}
        <View>
          <View style={{
            flexDirection: 'row',
          }}>
            <Text style={{
              fontWeight: 'bold',
            }}>
              Tên giải thưởng
            </Text>
            <FontAwesome name="asterisk" size={10} color="red" style={{
              marginLeft: 5,
            }} />
          </View>
          <View style={styles.input}>
            <Ionicons name="school-outline" size={24} color="black" />
            <TextInput
              style={{
                marginLeft: 5,
              }}
              placeholder="Tên giải thưởng"
              onChangeText={(text) => {
                setCompany(text)
              }}
            >
            </TextInput>
          </View>
        </View>
        {/* description */}
        <View>
          <View style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
            <Text style={{
              fontWeight: 'bold',
            }}>Mô tả</Text>
          </View>
          <View style={styles.input}>
            <AntDesign name="folderopen" size={24} color="black" />
            <TextInput
              style={{
                marginLeft: 5,
              }}
              placeholder="Mô tả"
              onChangeText={(text) => {
                setDescription(text)
              }}
            >
            </TextInput>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    paddingHorizontal: 10,
    height: 70,
    justifyContent: 'space-between',
  },
  content: {
    padding: 10
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  }
})