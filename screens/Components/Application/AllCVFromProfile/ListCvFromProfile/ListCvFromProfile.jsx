import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import moment from 'moment'
import { RadioButton } from 'react-native-paper'
export default function ListCvFromProfile({
    profile
}) {
    const [listCv, setListCv] = React.useState({})
    useEffect(() => {
        if (profile && profile.profilesCvs && profile.profilesCvs.length > 0) {
            setListCv(profile.profilesCvs)
        }
    }, [])
    return (
        <ScrollView>
            <FlatList
                data={listCv}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={{
                            width: '10%'
                        }}>
                            <RadioButton
                                value="first"
                                status={'unchecked'}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'column',
                            width: '70%',
                            marginLeft: 10
                        }}>
                            <View>
                                <Text style={{
                                    fontWeight: 'bold'
                                }}>{item.name}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    marginTop: 5,
                                    color: 'gray'
                                }}>
                                    {`Cập nhật lần cuối: ${moment(item.updatedAt).format('DD/MM/YYYY')}`}
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            width: '20%'
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#5755FE',
                                fontWeight: 'bold'
                            }}>Xem CV</Text>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    item: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    }
})