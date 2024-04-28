import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HeaderFIlterAllPostNewest from './HeaderFIlterAllPostNewest/HeaderFIlterAllPostNewest';
import { useDispatch, useSelector } from 'react-redux';
import { getNewPostAction } from '../../../../redux/store/NewPost/newPostSlice';
import ListJobOfAllNewest from './ListJobOfAllNewest/ListJobOfAllNewest';

export default function AllPostNewest() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const newPost = useSelector(state => state.newPost.newPost);
    const [currentPage, setCurrentPage] = React.useState(0)
    const [listJob, setListJob] = React.useState([])
    const [totalPage, setTotalPage] = React.useState(0)
    const [isOver, setIsOver] = React.useState(false)


    useEffect(() => {
        dispatch(getNewPostAction(
            null,
            null,
            null,
            null,
            10,
            0,
            'vi',
            0
        ))
    }, [])

    useEffect(() => {
        if (newPost) {
            setListJob(newPost.data);
            if (currentPage === 0) {
                setListJob(newPost.data);
            } else {
                setListJob(prevListJob => [...prevListJob, ...newPost.data]);
            }
            setTotalPage(newPost.totalPage);
            setIsOver(newPost.is_over);
        }
    }, [newPost, currentPage]);

    const handleLoadMore = () => {
        if (!isOver && currentPage < totalPage - 1) {
            setCurrentPage(currentPage + 1);
        }
        dispatch(getNewPostAction(
            null,
            null,
            null,
            null,
            10,
            0,
            'vi',
            currentPage
        ))
    };

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{
                    marginLeft: 5,
                    fontWeight: 'bold',
                }}>
                    Việc làm tốt nhất
                </Text>
            </View>
            <HeaderFIlterAllPostNewest />
            <ListJobOfAllNewest isOver={isOver} listJob={listJob} handleLoadMore={handleLoadMore} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: 'white',
    }
})