import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import TypeComponent from './TypeComponent/TypeComponent';
import MoneyComponent from './MoneyComponent/MoneyComponent';
import CatogoryComponent from './CatogoryComponent/CatogoryComponent';
import LocationComponent from './LocationComponent/LocationComponent';

export default function Filter() {
    const navigation = useNavigation();
    const [showModalType, setShowModalType] = React.useState(false)
    const [showModalMoney, setShowModalMoney] = React.useState(false)
    const [showModalCategory, setShowModalCategory] = React.useState(false)
    const [showModalLocation, setShowModalLocation] = React.useState(false)
    return (
        <View style={{
            height: '100%',
        }}>
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: 20,
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            marginRight: 10,
                        }}>
                        <MaterialIcons name="cancel" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                    }}>
                        Bộ lọc
                    </Text>
                </View>
                <View style={{
                    width: '100%',
                    height: '83%',
                }}>
                    <TouchableOpacity style={styles.content}
                        onPress={() => {
                            setShowModalLocation(true)
                        }}
                    >
                        <View style={styles.twoFlex}>
                            <View>
                                <Entypo name="address" size={24} color="black" />
                            </View>
                            <View style={{
                                marginLeft: 10
                            }}>
                                <Text>
                                    Khu vực
                                </Text>
                            </View>
                        </View>
                        <View>
                            <AntDesign name="right" size={24} color="gray" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content} onPress={() => {
                        setShowModalMoney(true)
                    }}>
                        <View style={styles.twoFlex}>
                            <View>
                                <FontAwesome5 name="money-bill-alt" size={24} color="black" />
                            </View>
                            <View style={{
                                marginLeft: 10
                            }}>
                                <Text>
                                    Mức lương
                                </Text>
                            </View>
                        </View>
                        <View>
                            <AntDesign name="right" size={24} color="gray" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content} onPress={() => {
                        setShowModalCategory(true)
                    }}>
                        <View style={styles.twoFlex}>
                            <View>
                                <MaterialIcons name="category" size={24} color="black" />
                            </View>
                            <View style={{
                                marginLeft: 10
                            }}>
                                <Text>
                                    Ngành nghề
                                </Text>
                            </View>
                        </View>
                        <View>
                            <AntDesign name="right" size={24} color="gray" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content} onPress={() => {
                        setShowModalType(true)
                    }}>
                        <View style={styles.twoFlex}>
                            <View>
                                <FontAwesome name="sticky-note" size={24} color="black" />
                            </View>
                            <View style={{
                                marginLeft: 10
                            }}>
                                <Text>
                                    Loại hình
                                </Text>
                            </View>
                        </View>
                        <View>
                            <AntDesign name="right" size={24} color="gray" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: '10%',
                width: '100%',
                borderTopWidth: 0.2,
                borderTopColor: 'gray',
                padding: 5,
            }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 0.2,
                    padding: 5,
                    width: '30%',
                    height: '50%',
                    justifyContent: 'center',
                    borderRadius: 5,
                }}>
                    <Text style={{
                        textAlign: 'center',
                    }}>
                        Xóa lọc
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 0.2,
                    padding: 5,
                    width: '65%',
                    height: '50%',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: '#337DFF',
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                    }}>
                        Áp dụng
                    </Text>
                </TouchableOpacity>
            </View>
            <TypeComponent showModalType={showModalType} setShowModalType={setShowModalType} />
            <MoneyComponent showModalMoney={showModalMoney} setShowModalMoney={setShowModalMoney} />
            <CatogoryComponent showModalCategory={showModalCategory} setShowModalCategory={setShowModalCategory} />
            <LocationComponent showModalLocation={showModalLocation} setShowModalLocation={setShowModalLocation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 20,
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        borderBottomWidth: 0.2,
        paddingVertical: 15,
        borderBottomColor: 'gray',
    },
    twoFlex: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})