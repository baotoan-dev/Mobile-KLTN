import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ContentEditForCv } from './constant/constant'
import { useNavigation } from '@react-navigation/native';
import HeaderOfScreen from '../../Components/HeaderOfScreen/HeaderOfScreen';
import * as Animatable from 'react-native-animatable';

export default function InforContentForCV(prop) {
    const { typeAction, cvIndex } = prop.route.params;
    const navigation = useNavigation()

    console.log('cvContent Index', cvIndex);
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <HeaderOfScreen title='Thông tin cơ bản' />
            <View style={styles.container}>
                {
                    ContentEditForCv.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(item.screen, {
                                        typeAction: typeAction,
                                        cvIndexParent: cvIndex,
                                    })
                                }}
                                style={styles.item} key={index}>
                                {
                                    item.icon
                                }
                                <Text style={{
                                    marginLeft: 5,
                                    fontWeight: 'bold',
                                }}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <Animatable.View animation="fadeInUp" iterationCount="infinite" duration={3000} style={{ alignItems: 'center' }}>
                <Animatable.Image
                    animation="bounceIn"
                    iterationCount="infinite"
                    duration={3000}
                    source={require('../../../images/laptop.png')}
                    style={{ width: 128, height: 128 }}
                />
                <Animatable.Text
                    animation="fadeIn"
                    iterationCount="infinite"
                    duration={3500}
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: 10
                    }}
                >
                    Nhập thông tin để tăng cơ hội việc làm
                </Animatable.Text>
            </Animatable.View>

        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        margin: 10,
        width: '44%',
        alignItems: 'center',
        backgroundColor: '#E2DFD0',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        height: '40%',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingBottom: 10,
    }
})