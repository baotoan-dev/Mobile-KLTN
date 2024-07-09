import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createCvExtraInformationAction, deleteCvExtraInformationAction, getCvExtraInformationAction } from '../../../../redux/store/CvExtraInformation/CvExtraInformationSlice';
import { createCvListExtraInformaion } from './helpers/CreateCvListExtraInformation';
import { CreateCvExtraInformation, CreateMoreCvExtraInformation } from './helpers/CreateCvExtraInformation';
import { TYPE_SKILL } from '../constant/constantContentCv';
import HeaderOfScreen from '../../../Components/HeaderOfScreen/HeaderOfScreen';

export default function Skill(prop) {
  const { cvIndexParent } = prop.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [listSkill, setListSkill] = useState([]);
  const [listOtherInformation, setListOtherInformation] = useState([]);
  const [loading, setLoading] = useState(false);
  const cvExtraInformation = useSelector(state => state.cvExtraInformation.cvExtraInformation);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(getCvExtraInformationAction(cvIndexParent));
      setLoading(false);
    };
    fetchData();
  }, [cvIndexParent, dispatch]);

  useEffect(() => {
    console.log('cvExtraInformation', cvExtraInformation);
    if (cvExtraInformation) {
      const data = createCvListExtraInformaion(cvExtraInformation);

      const newData = data && data.filter(item => item.type === TYPE_SKILL);

      const otherData = data && data.filter(item => item.type !== TYPE_SKILL);

      setListOtherInformation(otherData);

      setListSkill(newData ? newData[0] : {});
    }
  }, [cvExtraInformation]);

  const handleDeleteExtraInformation = async (id) => {
    let arrayMore = [];

    const newListExtraInformation = listSkill?.moreCvExtraInformations?.filter(item => +item.id !== +id);

    newListExtraInformation?.map((item) => {
      const createMoreCvExtraInformationData = CreateMoreCvExtraInformation(item.position, item.time, item.company, item.description, item.index, item.padIndex);
      arrayMore.push(createMoreCvExtraInformationData);
    });

    const newCreateCvExtraInformation = CreateCvExtraInformation(listSkill.type, listSkill.row, listSkill.col, listSkill.cvIndex, listSkill.part, arrayMore, listSkill.padIndex);

    const updatedListOtherInformation = [...listOtherInformation, newCreateCvExtraInformation];

    if (newCreateCvExtraInformation) {
      setLoading(true);
      dispatch(createCvExtraInformationAction(updatedListOtherInformation));
      dispatch(getCvExtraInformationAction(cvIndexParent));
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderOfScreen title="Kỹ năng" />
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <ScrollView>
          {listSkill?.moreCvExtraInformations?.map((item, index) => (
            <View style={styles.item} key={index}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('UpdateSkill', {
                      idParent: index,
                      typeParent: item.type,
                      positionParent: item.position,
                      companyParent: item.company,
                      descriptionParent: item.description,
                      timeParent: item.time,
                      cvIndexParent: cvIndexParent,
                    });
                  }}
                >
                  <Entypo name="dial-pad" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                  <Text numberOfLines={1} style={{ fontSize: 12, marginTop: 5, textTransform: 'uppercase' }}>
                    {`Tên chứng chỉ: ${item.company}`}
                  </Text>
                  <Text numberOfLines={1} style={{ fontSize: 12, marginTop: 2, color: 'gray' }}>
                    {`Mô tả: ${item.description}`}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteExtraInformation(item.id);
                }}
              >
                <MaterialCommunityIcons name="delete-empty-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddSkill', {
              cvIndexParent: cvIndexParent
            });
          }}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Thêm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: 'white'
  },
  item: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#E2DFD0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButton: {
    margin: 20,
    borderWidth: 0.2,
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
