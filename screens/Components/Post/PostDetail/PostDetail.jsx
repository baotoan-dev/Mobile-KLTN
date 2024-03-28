import { View, Text, ImageBackground, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import jobApi from '../../../../api/job/jobApi'
import { Ionicons } from '@expo/vector-icons';
import MoreInforComponent from './MoreInforComponent/MoreInforComponent';
import TabPostComponent from './TabPostComponent.jsx/TabPostComponent';

export default function PostDetail(prop) {
    const id = prop.route.params.id;
    const [post, setPost] = useState({});

    const fetchDetailPost = async () => {
        const response = await jobApi.getPostbyId(id, 'vi');
        if (response && response.data.code === 200) {
            setPost(response.data.data);
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

                                <MoreInforComponent post={post}/>
                            </View>
                            <TouchableOpacity style={{
                                position: 'absolute',
                                left: 10,
                                top: 10,
                                backgroundColor: 'gray',
                                borderRadius: 20,
                                padding: 5
                            }}
                            >
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <TabPostComponent post={post}/>
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
