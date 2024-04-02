import { View, Text, ImageBackground, Image, ScrollView, SafeAreaView, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import jobApi from '../../../../api/job/jobApi'
import { Ionicons } from '@expo/vector-icons';
import MoreInforComponent from './MoreInforComponent/MoreInforComponent';
import TabPostComponent from './TabPostComponent.jsx/TabPostComponent';
import { Feather } from '@expo/vector-icons';

export default function PostDetail(prop) {
    const id = prop.route.params.id;
    const [fitOfPost, setFitOfPost] = useState(''); 
    const [post, setPost] = useState({});

    const fetchDetailPost = async () => {
        const response = await jobApi.getPostbyId(id, 'vi');

        if (response && response.data.code === 200) {
            setPost(response.data.data);
            setFitOfPost(response.data.data.fit);
        }
    }

    useEffect(() => {
        fetchDetailPost();
    }, [id])

    return (
        post ? (
            <SafeAreaView>
                <ScrollView style={styles.container}>
                    <View style={{
                        height: 350,
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
                    <TabPostComponent post={post}/>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -12,
                            height: 70,
                            width: '100%',
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 5,
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
                            <View style={{
                                width: '90%',
                                borderWidth: 0.5,
                                padding: 10,
                                backgroundColor: 'blue',
                                borderRadius: 10,
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: 'white'
                                }}> Ứng tuyển ngay</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        ) : (
            <></>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        marginBottom: 100,
    },
    image: {
        height: 200,
        position: 'relative',
    },
    wrapper: {
        position: 'absolute',
        width: 300,
        height: 260,
        backgroundColor: 'white',
        bottom: -120,
        left: 50,
        borderRadius: 10,
        // shadow
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
        top: -50,
        left: 110,
        position: 'absolute'
    },
    imageLogo: {
        width: 80,
        height: 80,
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: 'blue',
        // shadow
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
        marginTop: 60,
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
