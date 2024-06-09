import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from '../../redux/store/Profile/profileSilce';
import { WebView } from 'react-native-webview';
import HeaderOfScreen from '../Components/HeaderOfScreen/HeaderOfScreen';

export default function SeenPDFScreen(props) {
    const dispatch = useDispatch();
    const id = props.route.params.id;
    const profile = useSelector(state => state.profile.profile);
    const [linkPDF, setLinkPDF] = React.useState('');

    useEffect(() => {
        dispatch(getProfileAction('vi'));
    }, []);

    useEffect(() => {
        if (profile) {
            const listCV = profile.profilesCvs;
            const cv = listCV.find(cv => cv.id === id);
            if (cv) {
                setLinkPDF(cv.pdfURL);
            }
        }
    }, [profile]);

    return (
        <View style={styles.container}>
            <HeaderOfScreen title="Xem CV" />
            {linkPDF ? (
                <WebView
                    source={{ uri: `https://docs.google.com/viewer?url=${linkPDF}&embedded=true` }}
                    style={styles.pdf}
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
