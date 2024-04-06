import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

export default function MoreInforComponent({ post, fitOfPost }) {
    return (
        <View style={styles.container}>
            <Text style={styles.line}></Text>
            <View style={styles.content}>
                <View style={styles.salary}>
                    <FontAwesome name="money" size={24} color="black" style={{
                        textAlign: 'center',
                        color: 'blue'
                    }} />
                    <Text style={styles.textCenterGray}>Mức lương</Text>
                    <Text style={{
                        textAlign: 'center',
                    }}>
                        <Text
                            numberOfLines={1}
                            style={styles.item}>
                            {
                                post.salary_min === 0 && post.salary_max === 0 ? 'Thỏa thuận' :
                                    post.salary_min >= 0 && post.salary_max >= 1000000 ? (post.salary_min / 1000000 + 'tr' + ' - ' + post.salary_max / 1000000 + 'tr') : (post.salary_min + ' - ' + post.salary_max)
                            }
                        </Text>
                    </Text>
                </View>
                <View style={styles.address}>
                    <FontAwesome name="map-marker" size={24} color="black" style={{
                        textAlign: 'center',
                        color: 'blue'
                    }} />
                    <Text style={styles.textCenterGray}>Địa chỉ</Text>
                    <Text style={styles.item}>{post.province_name}</Text>
                </View>
                <View style={styles.compare}>
                    <FontAwesome name="check" size={24} color="black" style={{
                        textAlign: 'center',
                        color: 'blue'
                    }} />
                    <Text style={styles.textCenterGray}>Phù hợp</Text>
                    <Text style={styles.item}>{fitOfPost + '%'}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    line: {
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 0.7,
    },
    content: {
        flexDirection: 'row',
    },
    salary: {
        flex: 1,
        padding: 10,
    },
    address: {
        flex: 1,
        padding: 10,
        borderLeftColor: '#d3d3d3',
        borderLeftWidth: 0.7,
    },
    compare: {
        flex: 1,
        padding: 10,
        borderLeftColor: '#d3d3d3',
        borderLeftWidth: 0.7,
    },
    textCenterGray: {
        textAlign: 'center',
        fontSize: 11,
        color: 'gray',
        marginTop: 5,
    },
    item: {
        fontSize: 12,
        color: 'blue',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})