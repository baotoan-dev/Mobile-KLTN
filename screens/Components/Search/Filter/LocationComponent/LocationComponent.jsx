import { View, Text } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import ListProvinceComponent from './ListProvinceComponent/ListProvinceComponent';
import ListWardComponent from './ListWardComponent/ListWardComponent';

export default function LocationComponent({
    showModalLocation,
    setShowModalLocation,
    dataLocationFilter,
    setDataLocationFilter,
}) {
    const [isCheckClickProvince, setIsCheckClickProvince] = React.useState(false)
    const [idProvince, setIdProvince] = React.useState('')
    return (
        <View>
            <Modal
                isVisible={showModalLocation}
                onBackdropPress={() => setShowModalLocation(false)}
                onSwipeComplete={() => setShowModalLocation(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.bottomModal}
            >
                <View style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '90%',
                    borderRadius: 10,
                }}>
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        {
                            !isCheckClickProvince ?
                                <ListProvinceComponent
                                    setIsCheckClickProvince={setIsCheckClickProvince}
                                    setShowModalLocation={setShowModalLocation}
                                    setIdProvince={setIdProvince}
                                /> : <ListWardComponent
                                    idProvince={idProvince}
                                    setIsCheckClickProvince={setIsCheckClickProvince}
                                    setShowModalLocation={setShowModalLocation}
                                    setDataLocationFilter={setDataLocationFilter}
                                    dataLocationFilter={dataLocationFilter}
                                />
                        }
                    </View>
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