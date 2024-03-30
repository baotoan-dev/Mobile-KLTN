import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { updatedDataMoney } from './data/data';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function MoneyComponent({
    showModalMoney,
    setShowModalMoney,
}) {

    const [idSelected, setIdSelected] = React.useState(1)
    const [slaryMin, setSlaryMin] = React.useState(0)
    const [slaryMax, setSlaryMax] = React.useState(0)

    return (
        <View>
            <Modal
                isVisible={showModalMoney}
                onBackdropPress={() => setShowModalMoney(false)}
                onSwipeComplete={() => setShowModalMoney(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.bottomModal}
            >
                <View style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '50%',
                    borderRadius: 10,
                }}>
                    <View style={{
                        padding: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>
                            Loại công việc
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setShowModalMoney(false)
                        }}>
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={updatedDataMoney}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setSlaryMin(item.slaryMin)
                                    setSlaryMax(item.slaryMax)
                                    setIdSelected(item.id)
                                    setShowModalMoney(false)
                                }}
                                style={{
                                    padding: 20,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#f0f0f0',
                                    backgroundColor: idSelected === item.id ? '#f0f0f0' : 'white',
                                }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text>
                                        {item.text}
                                    </Text>
                                    {
                                        +idSelected == +item.id && <AntDesign name="check" size={24} color="blue" />
                                    }
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
        width: '100%',
    },
});