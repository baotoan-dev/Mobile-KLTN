import { View, Text, ImageBackground, Image, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import jobApi from '../../../../api/job/jobApi'
import { Ionicons } from '@expo/vector-icons';
import MoreInforComponent from './MoreInforComponent/MoreInforComponent';
import TabPostComponent from './TabPostComponent.jsx/TabPostComponent';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PostDetail(prop) {
    const id = prop.route.params.id;
    const navigation = useNavigation();
    const [fitOfPost, setFitOfPost] = useState('');
    const [post, setPost] = useState({});
    const [scrollY, setScrollY] = useState(false);

    const fetchDetailPost = async () => {
        const response = await jobApi.getPostbyId(id, 'vi');

        if (response && response.data.code === 200) {
            setPost(response.data.data);
            setFitOfPost(response.data.data.fit);
        }
    }

    const handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y > 300) {
            setScrollY(true);
        }
        else {
            setScrollY(true);
        }
    }

    useEffect(() => {
        fetchDetailPost();
    }, [id])

    return (
        post ? (
            <View style={styles.container}>
                <ScrollView onScroll={(e) => {
                    handleScroll(e)
                }}>
                    <View style={{
                        height: 300,
                        width: '100%'
                    }}>
                        <ImageBackground style={styles.image} source={{ uri: 'https://quangcaonhat.com/wp-content/uploads/2020/08/Untitled-1-scaled.jpg' }} >
                            <View style={styles.wrapper}>
                                <View style={styles.componentLogo}>
                                    <Image
                                        source={{ uri: post.image }}
                                        style={styles.imageLogo}
                                    ></Image>
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>{post.title}</Text>
                                </View>
                                <View style={styles.companyContainer}>
                                    <Text style={styles.companyName}>{post.company_name}</Text>
                                </View>

                                <MoreInforComponent post={post} fitOfPost={fitOfPost} />
                            </View>
                            <TouchableOpacity style={{
                                position: 'absolute',
                                left: 10,
                                top: 10,
                                backgroundColor: 'gray',
                                borderRadius: 20,
                                padding: 5
                            }}
                                onPress={() => prop.navigation.goBack()}
                            >
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={{
                        height: '85%',
                        width: '100%',
                    }}>
                        <TabPostComponent post={post} />
                    </View>
                </ScrollView>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        height: '10%',
                        width: '100%',
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        zIndex: 100,
                    }}
                >
                    <View style={{
                        width: '15%',
                        height: '70%',
                        marginLeft: 10,
                    }}>
                        <View style={{
                            borderWidth: 1,
                            padding: 10,
                            borderColor: 'blue',
                            borderRadius: 10,
                            width: '80%'
                        }}>
                            <Feather style={{
                                textAlign: 'center'
                            }}

                                name="bookmark" size={24} color="black" />
                        </View>
                    </View>
                    <View style={{
                        width: '85%',
                        height: '70%',
                        marginLeft: 10,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Application', {
                                    id: post.id
                                })
                            }}
                            style={{
                                width: '90%',
                                borderWidth: 0.5,
                                padding: 13,
                                backgroundColor: 'blue',
                                borderRadius: 10,
                            }}>
                            <Text style={{
                                textAlign: 'center',
                                color: 'white'
                            }}> Ứng tuyển ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        ) : (
            <></>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    image: {
        height: 200,
    },
    wrapper: {
        width: 300,
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        bottom: '-30%',
        left: 50,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    componentLogo: {
        width: 100,
        height: 100,
        borderRadius: 20,
        top: -40,
        left: 110,
        position: 'absolute'
    },
    imageLogo: {
        width: 80,
        height: 80,
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: 'blue',
        shadowColor: "blue",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleContainer: {
        marginTop: 50,
        marginLeft: 10,
        paddingHorizontal: 10,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    companyContainer: {
        marginTop: 10,
        marginLeft: 10,
        paddingHorizontal: 10,
    },
    companyName: {
        textAlign: 'center',
        color: 'gray',
    }
});
