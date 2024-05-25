import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderOfScreen from '../Components/HeaderOfScreen/HeaderOfScreen'
import { getAllThemeCompanyAction } from '../../redux/store/ThemeCompany/themeCompanySlice'
import { useDispatch, useSelector } from 'react-redux'
import ListThemeCompanyComponent from '../Components/ThemeCompany/ListThemeCompanyComponent/ListThemeCompanyComponent'

export default function HotCompanyScreen() {
    const dispatch = useDispatch()
    const themeCompany = useSelector(state => state.themeCompany.allThemeCompany)
    const [dataAllThemeCompany, setDataAllThemeCompany] = useState([])

    useEffect(() => {
        dispatch(getAllThemeCompanyAction())
    }, [])

    useEffect(() => {
        if (themeCompany) {
            setDataAllThemeCompany(themeCompany)
        }
    }, [themeCompany])

    return (
        <View>
            <HeaderOfScreen title="Công ty hot" />
            <ListThemeCompanyComponent data={dataAllThemeCompany} />
        </View>
    )
}