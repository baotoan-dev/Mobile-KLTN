import { View } from 'react-native'
import React, { useEffect } from 'react'
import HeaderOfScreen from '../Components/HeaderOfScreen/HeaderOfScreen'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../redux/store/Profile/profileSilce';
import Buffer from 'buffer';
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

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

    // fetch base64 pdf

    const fetchBase64 = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            console.log(base64data)
        }
    }
    
    useEffect(() => {
        fetchBase64(linkPDF)
    }, [linkPDF])

    return (
        <View>
            <HeaderOfScreen title="Xem CV" />
            {/* show pdf from base64 */}
            
        </View>
    )
}
