import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function InforModifyUI({
  clickUpdateUI,
  setClickUpdateUI,
  dataModify,
  setDataModify
}) {
  const [clickColor, setClickColor] = React.useState(false)
  const [clickLine, setClickLine] = React.useState(true)

  return (
    <View style={{
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: 'white',
    }}>
      {
        clickUpdateUI ? (
          <View>
            <View style={{
              paddingVertical: 10,
            }}>
              {
                clickLine ? (
                  <View>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <TouchableOpacity
                        onPress={() => {
                          setDataModify({
                            ...dataModify,
                            size: 'small'
                          })
                        }}
                      >
                        <Text style={{
                          borderWidth: 1,
                          borderRadius: 5,
                          padding: 5,
                          borderColor: dataModify.size === 'small' ? '#76885B' : 'gray',
                          fontWeight: 'bold',
                          color: dataModify.size === 'small' ? '#76885B' : 'black',
                        }}>
                          Nhỏ
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setDataModify({
                            ...dataModify,
                            size: 'large'
                          })
                        }}
                      >
                        <Text style={{
                          borderWidth: 1,
                          borderRadius: 5,
                          padding: 5,
                          borderColor: dataModify.size === 'large' ? '#76885B' : 'gray',
                          marginLeft: 10,
                          fontWeight: 'bold',
                          color: dataModify.size === 'large' ? '#76885B' : 'black',
                        }}>
                          Lớn
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={{
                    paddingVertical: 10,
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <TouchableOpacity
                        onPress={() => {
                          setDataModify({
                            ...dataModify,
                            color: '#529300'
                          })
                        }}
                        style={{
                          backgroundColor: '#529300',
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          borderColor: dataModify.color === '#529300' ? 'red' : 'gray',
                          borderWidth: 2,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setDataModify({
                            ...dataModify,
                            color: '#3B82F6'
                          })
                        }}
                        style={{
                          backgroundColor: '#3B82F6',
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          borderColor: dataModify.color === '#3B82F6' ? 'red' : 'gray',
                          borderWidth: 2,
                          marginLeft: 10,
                        }}
                      />
                    </View>
                  </View>
                )
              }
            </View>
            <View style={{
              flexDirection: 'row',
              borderTopColor: 'gray',
              borderTopWidth: 0.5,
              paddingVertical: 10,
            }}>
              <TouchableOpacity
                onPress={() => {
                  setClickLine(!clickLine)
                  setClickColor(false)
                }}
                style={{
                  marginRight: 20,
                  alignItems: 'center',
                  backgroundColor: clickLine ? '#76885B' : 'white',
                  padding: clickLine ? 5 : 0,
                }}>
                <Ionicons name="color-palette-outline" size={24} color={clickLine ? 'white' : 'black'} />
                <Text
                  style={{
                    color: clickLine ? 'white' : 'black',
                    fontWeight: 'bold',
                  }}
                >
                  Giãn dòng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setClickColor(!clickColor)
                  setClickLine(false)
                }}
                style={{
                  alignItems: 'center',
                  backgroundColor: clickColor ? '#76885B' : 'white',
                  padding: clickColor ? 5 : 0,
                }}>
                <MaterialCommunityIcons name="menu-open" size={24} color={clickColor ? 'white' : 'black'} />
                <Text style={{
                  color: clickColor ? 'white' : 'black',
                  fontWeight: 'bold',
                }}>
                  Màu sắc
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>

          </View>
        )
      }
    </View>
  )
}