import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import React from 'react'
import HeadingContentProfile from '../HeadingContentProfile/HeadingContentProfile'
import ModalUpdateJobExpect from './ModalUpdateJobExpect/ModalUpdateJobExpect'
import { useNavigation } from '@react-navigation/native'
export default function JobExpect({ profile }) {
    const navigation = useNavigation()
    const [isOpenModalUpdateJobExpect, setIsOpenModalUpdateJobExpect] = React.useState(false)
    
    const handleOpenModal = () => {
        if (profile.isActive === 0) {
            ToastAndroid.showWithGravity(
                "Tài khoản chưa được kích hoạt",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              setTimeout(() => {
                navigation.navigate("ActiveAccount", {
                  email: profile.email,
                });
              }, 2000);
            return  
        }
        setIsOpenModalUpdateJobExpect(!isOpenModalUpdateJobExpect)
    }

    return (
        
        <View style={styles.container}>
            <View style={{
                paddingHorizontal: 10,
            }}>
                <HeadingContentProfile left='Mong muốn công việc' right='Sửa' handleOpenModal={handleOpenModal}/>
                <View style={styles.wapper}>
                    {
                        profile && profile?.profileCategories?.length > 0 ? profile?.profileCategories?.map((item, index) => {
                            return (
                                <View style={styles.item}>
                                    <Text>{item.fullName}</Text>
                                </View>
                            )
                        }
                        ) : <View>
                            <Text style={{
                                fontWeight: 'bold',
                                color: 'black',
                            }}>Chưa cập nhật</Text>
                        </View>
                    }
                </View>
                <ModalUpdateJobExpect profile={profile} isOpenModal={isOpenModalUpdateJobExpect} handleOpenModal={handleOpenModal} /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopColor: 'gray',
        borderTopWidth: 0.5,
        paddingVertical: 20,
    },
    wapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    item: {
        borderWidth: 0.5,
        alignSelf: 'flex-start',
        borderColor: '#242670',
        marginLeft: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#FFEFEF',
        marginTop: 5,
    }
})