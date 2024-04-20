import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Tab } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import HeaderOfScreen from '../../../../Components/HeaderOfScreen/HeaderOfScreen';
import { getAllSubmitedAppliedAction } from '../../../../../redux/store/SubmitAppy/submitApplySlice';
import { useDispatch, useSelector } from 'react-redux';
import ListJobComponent from '../../../../Components/ListJobComponent/ListJobComponent';
import { FunctionFilterByCreateAtText } from '../../../../../utils/FuntionFilterByCreateAtText';
import Animated from 'react-native-reanimated';
import { bookmarksApi } from '../../../../../api/bookmarks/bookmarksApi';

export default function ManageJobApplication() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const submitApply = useSelector(state => state.submitApply.submitApply);
    const [index, setIndex] = React.useState(0);
    const [isOver, setIsOver] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [listApply, setListApply] = React.useState([]);

    useEffect(() => {
        dispatch(getAllSubmitedAppliedAction(10, currentPage, 'vi'))
    }, [])

    useEffect(() => {
        if (submitApply && currentPage === 0) {
            setListApply(submitApply.data);
        }
        if (submitApply && currentPage > 0) {
            setListApply([...listApply, ...submitApply.data]);
        }
        setIsOver(submitApply.is_over);

        const newList = listApply.filter(item => {
            const number = FunctionFilterByCreateAtText(item.created_at_text);

            if (number < 7) {
                return item;
            }
        })

        setListApply(newList);

    }, [submitApply])

    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
        dispatch(getAllSubmitedAppliedAction(10, currentPage + 1, 'vi'))
    }

    useEffect(() => {
        if (index === 0) {
            const newList = listApply.filter(item => {
                const number = FunctionFilterByCreateAtText(item.created_at_text);

                if (number < 7) {
                    return item;
                }
            })
            setListApply(newList);
            return;
        }
        if (index === 1) {
            const newList = listApply.filter(item => {
                const number = FunctionFilterByCreateAtText(item.created_at_text);

                if (number < 30) {
                    return item;
                }
            })
            setListApply(newList);
            return;
        }
        if (index === 2) {
            setListApply(submitApply.data);
            return;
        }
    }, [index])

    return (
        <View>
            <HeaderOfScreen title="Quản lý ứng tuyển" />
            <Tab
                value={index}
                onChange={setIndex} dense
                style={{ backgroundColor: 'white' }}
            >
                <Tab.Item title="7 ngày">
                    <Text>7 ngày</Text>
                </Tab.Item>
                <Tab.Item title="30 ngày">
                    <Text>30 ngày</Text>
                </Tab.Item>
                <Tab.Item title="Tất cả">
                    <Text>Tất cả</Text>
                </Tab.Item>
            </Tab>

            {
                listApply.length === 0 ?
                    (
                        <View>
                            <Animated.Image
                                source={require('../../../../../images/no-data.png')}
                                style={{
                                    width: 200,
                                    height: 200,
                                    alignSelf: 'center',
                                    marginTop: 100
                                }}
                            >
                            </Animated.Image>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 16,
                                color: 'black',
                                marginTop: 10
                            }}>
                                Không có dữ liệu
                            </Text>
                        </View>
                    )
                    : (
                        <View>
                            {
                                listApply.length > 0 && <Text style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: 'black',
                                    marginTop: 10,
                                    paddingHorizontal: 10
                                }}>
                                    Tổng cộng {listApply.length} việc làm
                                </Text>

                            }
                            <ListJobComponent isApply={true} isShow={false} listJob={listApply} isOver={isOver} loadMore={() => handleLoadMore()} />
                        </View>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({

})