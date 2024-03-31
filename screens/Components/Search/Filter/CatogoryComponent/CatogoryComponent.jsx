import { View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import ListCategoryComponent from './ListCategoryComponent/ListCategoryComponent';

export default function CatogoryComponent({
    showModalCategory,
    setShowModalCategory
}) {
    return (
        <View>
            <Modal
                isVisible={showModalCategory}
                onBackdropPress={() => setShowModalCategory(false)}
                onSwipeComplete={() => setShowModalCategory(false)}
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
                        <ListCategoryComponent setShowModalCategory={setShowModalCategory}/>
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