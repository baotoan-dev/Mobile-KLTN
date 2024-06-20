import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCvProjectAction, getCvProjectAction } from '../../../../../redux/store/CvProject/cvProjectSlice';
import { createCvListProject } from '../helpers/CreateCvListProject';
import { createCvProject } from '../helpers/CreateCvProject';

export default function UpdateProject(prop) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cvProject = useSelector(state => state.cvProject.cvProject);
  const { cvIndexParent, nameParent, idParent, typeParent, timeParent, linkParent, participantParent, positionParent, functionalityParent, technologyParent } = prop.route.params;
  const [type, setType] = useState();
  const [listProject, setListProject] = useState([])
  const [position, setPosition] = useState();
  const [link, setLink] = useState();
  const [participant, setParticipant] = useState();
  const [functionality, setFunctionality] = useState();
  const [technology, setTechnology] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    dispatch(getCvProjectAction(cvIndexParent));
    setType(typeParent);
    setName(nameParent);
    setPosition(positionParent);
    setLink(linkParent);
    setParticipant(participantParent);
    setFunctionality(functionalityParent);
    setTechnology(technologyParent);
    setStartTime(timeParent.split(' - ')[0]);
    setEndTime(timeParent.split(' - ')[1]);
  }, [])

  useEffect(() => {
    if (cvProject) {
      const data = createCvListProject(cvProject);

      const newListProject = {
        col: data[0].col,
        cvIndex: data[0].cvIndex,
        part: data[0].part,
        row: data[0].row,
        type: data[0].type,
        moreCvProjects: data[0].moreCvProjects.filter(item => +item.id !== +idParent),
      }

      setListProject(newListProject);
    }
  }, [cvProject])

  const handleSaveProject = () => {
    const newListProject = {
      col: listProject.col,
      cvIndex: cvIndexParent,
      part: listProject.part,
      row: listProject.row,
      type: listProject.type,
      padIndex: listProject.padIndex,
      moreCvProjects: [
        ...listProject.moreCvProjects,
        {
          time: `${startTime} - ${endTime}`,
          link: link,
          participant: participant,
          position: position,
          functionality: functionality,
          technology: technology,
          name: name,
          padIndex: 0
        }
      ]
    }
    const newCreateProject = createCvProject(newListProject.type, newListProject.row, newListProject.col, newListProject.cvIndex, newListProject.part, newListProject.moreCvProjects, newListProject.padIndex);

    if (newCreateProject) {
      dispatch(createCvProjectAction([newCreateProject])).then(() => {
        dispatch(getCvProjectAction(cvIndexParent));
      });
    }
    navigation.goBack();
  }

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
          }}>Cập nhật dự án
        </Text>
        <TouchableOpacity
          onPress={() => {
            handleSaveProject();
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
      <ScrollView style={styles.content}>
        {/* company */}
        <View>
          <View style={{
            flexDirection: 'row',
          }}>
            <Text style={{
              fontWeight: 'bold',
            }}>Tên dự án</Text>
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
              placeholder="Tên dự án"
              onChangeText={(text) => setName(text)}
              value={name}
            >
            </TextInput>
          </View>
        </View>
        {/* position */}
        <View>
          <View style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
            <Text style={{
              fontWeight: 'bold',
            }}>Vị trí</Text>
            <FontAwesome name="asterisk" size={10} color="red" style={{
              marginLeft: 5,
            }} />
          </View>
          <View style={styles.input}>
            <AntDesign name="creditcard" size={24} color="black" />
            <TextInput
              style={{
                marginLeft: 5,
              }}
              placeholder="Vị trí"
              onChangeText={(text) => setPosition(text)}
              value={position}
            >
            </TextInput>
          </View>
        </View>
        {/* link */}
        <View>
          <View style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
            <View style={{
              flexDirection: 'row',
            }}>
              <Text style={{
                fontWeight: 'bold',
              }}>Link dự án</Text>
              <FontAwesome name="asterisk" size={10} color="red" style={{
                marginLeft: 5,
              }} />
            </View>
          </View>
          <View style={styles.input}>
            <Entypo name="back-in-time" size={24} color="black" />
            <TextInput
              style={{
                marginLeft: 5,
              }}
              placeholder="Link dự án"
              onChangeText={(text) => setLink(text)}
              value={link}
            >
            </TextInput>
          </View>
        </View>
        {/* participant */}
        <View>
          <View style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
            <View style={{
              flexDirection: 'row',
            }}>
              <Text style={{
                fontWeight: 'bold',
              }}>Thành viên</Text>
              <FontAwesome name="asterisk" size={10} color="red" style={{
                marginLeft: 5,
              }} />
            </View>
          </View>
          <View style={styles.input}>
            <AntDesign name="team" size={24} color="black" />
            <TextInput
              style={{
                marginLeft: 5,
              }}
              placeholder="Thành viên"
              onChangeText={(text) => setParticipant(text)}
              value={participant}
            >
            </TextInput>
          </View>
        </View>
        {/* functionality */}
        <View>
          <View style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
            <Text style={{
              fontWeight: 'bold',
            }}>Chức năng</Text>
            <FontAwesome name="asterisk" size={10} color="red" style={{
              marginLeft: 5,
            }} />
          </View>
          <View style={styles.input}>
            <MaterialCommunityIcons name="function" size={24} color="black" />
            <TextInput
              style={{
                marginLeft: 5,
              }}
              placeholder="Chức năng"
              onChangeText={(text) => setFunctionality(text)}
              value={functionality}
            >
            </TextInput>
          </View>
        </View>
        {/* technology */}
        <View>
          <View style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
            <Text style={{
              fontWeight: 'bold',
            }}>Công nghệ</Text>
            <FontAwesome name="asterisk" size={10} color="red" style={{
              marginLeft: 5,
            }} />
          </View>
          <View style={styles.input}>
            <MaterialIcons name="biotech" size={24} color="black" />
            <TextInput
              style={{
                marginLeft: 5,
              }}
              placeholder="Công nghệ"
              onChangeText={(text) => setTechnology(text)}
              value={technology}
            >
            </TextInput>
          </View>
        </View>
        {/* Start time */}
        <View>
          <View style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
            <Text style={{
              fontWeight: 'bold',
            }}>Thời gian bắt đầu</Text>
            <FontAwesome name="asterisk" size={10} color="red" style={{
              marginLeft: 5,
            }} />
          </View>
          <View style={styles.input}>
            <Entypo name="back-in-time" size={24} color="black" />
            <TextInput
              style={{
                marginLeft: 5,
              }}
              placeholder="Thời gian bắt đầu"
              onChangeText={(text) => setStartTime(text)}
              value={startTime}
            >
            </TextInput>
          </View>
        </View>
        {/* End time */}
        <View>
          <View style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
            <Text style={{
              fontWeight: 'bold',
            }}>Thời gian kết thúc</Text>
            <FontAwesome name="asterisk" size={10} color="red" style={{
              marginLeft: 5,
            }} />
          </View>
          <View style={styles.input}>
            <Entypo name="back-in-time" size={24} color="black" />
            <TextInput
              style={{
                marginLeft: 5,
              }}
              placeholder="Thời gian kết thúc"
              onChangeText={(text) => setEndTime(text)}
              value={endTime}
            >
            </TextInput>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: 'white'
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