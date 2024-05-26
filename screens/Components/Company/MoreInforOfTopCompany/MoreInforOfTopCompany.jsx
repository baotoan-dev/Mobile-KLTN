import { View, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import HeaderOfScreen from '../../HeaderOfScreen/HeaderOfScreen';
import { useDispatch, useSelector } from 'react-redux';
import HeaderFilterCompanyComponent from '../../FilterCompany/HeaderFilterCompanyComponent/HeaderFilterCompanyComponent';
import ListFilterCompany from '../../FilterCompany/ListFilterCompany/ListFilterCompany';
import { getAllFilterCompanyAction } from '../../../../redux/store/Company/FilterCompany/getFilterCompanySlice';

export default function MoreInforOfTopCompany() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [dataAllCompany, setDataAllCompany] = useState([]);
    const [dataAllCompanyFilter, setDataAllCompanyFilter] = useState([]);
    const allFilterCompany = useSelector((state) => state.allFilterCompany.filterCompany);
    const [companySize, setCompanySize] = useState({});
    const [keyword, setKeyword] = useState('');
    const [dataCategoryFilter, setDataCategoryFilter] = React.useState({});
    const [dataLocationFilter, setDataLocationFilter] = React.useState({});
    const [currentPage, setCurrentPage] = React.useState(0);
    const [isOver, setIsOver] = React.useState(false);
    const [total, setTotal] = React.useState(0);
    useEffect(() => {
        dispatch(getAllFilterCompanyAction(
            [],
            [],
            null,
            10,
            currentPage,
            'vi'
        ));
    }, [])

    useEffect(() => {
        if (allFilterCompany && allFilterCompany.data) {
            const { companies, total } = allFilterCompany.data;
            if (currentPage === 0) {
                setDataAllCompany(allFilterCompany.data.companies);
            } else {
                setDataAllCompany((prevData) => [...prevData, ...companies]);
            }
            setIsOver(allFilterCompany.data.is_over);
            setTotal(total);
            setDataAllCompanyFilter(dataAllCompany);
        }
    }, [allFilterCompany])

    useEffect(() => {
        dispatch(getAllFilterCompanyAction(
            dataLocationFilter.id ? [dataLocationFilter.id] : [],
            dataCategoryFilter.parent_category_id ? [dataCategoryFilter.parent_category_id + ""] : [],
            companySize.id,
            10,
            0,
            'vi'
        ));
    }, [dataCategoryFilter, dataLocationFilter, companySize])

    useEffect(() => {
        if (keyword) {
            const dataFilter = dataAllCompany.filter((item) => {
                return item.name.toLowerCase().includes(keyword.toLowerCase());
            })
            setDataAllCompanyFilter(dataFilter);
        }
        else {
            setDataAllCompanyFilter(dataAllCompany);
        }
    }, [keyword])

    const handleLoadMore = () => {
        if (!isOver) {
            setCurrentPage(currentPage + 1);
            dispatch(getAllFilterCompanyAction(
                dataLocationFilter.id ? [dataLocationFilter.id] : [],
                dataCategoryFilter.parent_category_id ? [dataCategoryFilter.parent_category_id + ""] : [],
                companySize.id,
                10,
                currentPage + 1,
                'vi'
            ));
        }
    }


    return (
        <View style={
            styles.container
        }>
            <HeaderOfScreen title='Thông tin Top Công ty hàng đầu' />
            <HeaderFilterCompanyComponent
                companySize={companySize}
                setCompanySize={setCompanySize}
                dataCategoryFilter={dataCategoryFilter}
                setDataCategoryFilter={setDataCategoryFilter}
                dataLocationFilter={dataLocationFilter}
                setDataLocationFilter={setDataLocationFilter}
                keyword={keyword}
                setKeyword={setKeyword}
            />
            <ListFilterCompany
                dataAllCompanyFilter={dataAllCompanyFilter}
                handleLoadMore={handleLoadMore}
                isOver={isOver}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFAF4'
    }
})