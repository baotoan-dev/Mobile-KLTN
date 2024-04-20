import { View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import HeaderOfScreen from '../Components/HeaderOfScreen/HeaderOfScreen'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../redux/store/Profile/profileSilce';

export default function SeenPDFScreen(prop) {
    const dispatch = useDispatch();
    const id = prop.route.params.id;
    const profile = useSelector(state => state.profile.profile);
    const [linkPDF, setLinkPDF] = React.useState('')

    useEffect(() => {
        dispatch(getProfileAction('vi'))
    }, [])

    useEffect(() => {
        if (profile) {
            const listCV = profile.profilesCvs;
            const cv = listCV.find(cv => cv.id === id);
            setLinkPDF(cv.pdfURL)
        }
    }, [profile])

    return (
        <View>
            <HeaderOfScreen title="CV đã xem" />
            {
                
            }
        </View>
    )
}