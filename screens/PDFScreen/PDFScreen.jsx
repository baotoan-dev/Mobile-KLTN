import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileAction } from '../../redux/store/Profile/profileSilce';
import ContentBottomPDFScreen from './ContentBottomPDFScreen/ContentBottomPDFScreen';
import ContentHeaderPDFScreen from './ContentHeaderPDFScreen/ContentHeaderPDFScreen';
import { useNavigation } from '@react-navigation/native';
import ContentCenterPDFScreen from './ContentCenterPDFScreen/ContentCenterPDFScreen';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { getCvProjectAction } from '../../redux/store/CvProject/cvProjectSlice';
import { getCvExtraInformationAction } from '../../redux/store/CvExtraInformation/CvExtraInformationSlice';

export default function PDFScreen() {
    const navigation = useNavigation();
    const profile = useSelector((state) => state.profile.profile);
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState(null);
    const cvProject = useSelector(state => state.cvProject.cvProject);
    const cvExtraInformation = useSelector(state => state.cvExtraInformation.cvExtraInformation);
    const [listProject, setListProject] = useState([]);
    const [listSkill, setListSkill] = useState([]);
    const [listAward, setListAward] = useState([]);
    const [listEducation, setListEducation] = useState([]);

    useEffect(() => {
        dispatch(getProfileAction('vi'));
        dispatch(getCvProjectAction(0))
        dispatch(getCvExtraInformationAction(0))
    }, [])

    useEffect(() => {
        if (cvProject) {
            setListProject(cvProject[0]?.moreCvProjects);
        }
        if (cvExtraInformation && cvExtraInformation.length > 0) {
            const skills = cvExtraInformation && cvExtraInformation.filter((item) => item.type === 'info_skill');
            const awards = cvExtraInformation && cvExtraInformation.filter((item) => item.type === 'info_award');
            const educations = cvExtraInformation && cvExtraInformation.filter((item) => item.type === 'info_study');
            setListSkill(skills[0].moreCvExtraInformations);
            setListAward(awards[0].moreCvExtraInformations);
            setListEducation(educations[0].moreCvExtraInformations)
        }
    }, [profile])


    const html = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>CV</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        </head>
        <body style="height: fit-content; margin: 0;">
            <div style="display: flex; flex-direction: row; width: 100%; height: 100%">
                <div style="overflow: hidden;width: 45%; height: auto; flex-direction: column; background-color: #c1e8e4;">
                    <div>
                        <div>
                            <div style="text-align: center; margin-top: 10px;">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqgL3Hd08E6ZEepKPn1kNZnBLnWugLvplig&usqp=CAU" style="width: 90%; height: 400px; border: 1px solid black; border-radius: 10px;" />
                            </div>
                            <div style="padding: 30px;">
                                <div style="font-size: 30px; margin-top: 10px; color: gray; font-weight: 700;">
                                    PERSONAL INFORMATION 
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 20px;">
                                    <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                                        <i class="fas fa-envelope" style="font-size: 30px"></i>
                                        <div style="font-size: 25px; word-wrap: break-word;">baotoandd2016@gmail.com</div>
                                    </div>
                                    <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                                        <i class="fas fa-phone" style="font-size: 30px"></i>
                                        <div style="font-size: 25px;word-wrap: break-word;">0765969802</div>
                                    </div>
                                    <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                                        <i class="fas fa-address-book" style="font-size: 30px"></i>
                                        <div style="font-size: 25px;word-wrap: break-word;">Dĩ An District, Bình Dương Province, Vietnam </div>
                                    </div>
                                    <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                                        <i class="fas fa-link" style="font-size: 30px"></i>
                                        <div style="font-size: 25px;word-wrap: break-word;">link@ssssss.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="padding: 30px;">
                            <div style="font-size: 30px; margin-top: 10px; color: gray; font-weight: 700;">
                                SKILL
                            </div>
                            <div>
                                ${listSkill?.map((item, index) => {
        return `
                                    <div style="margin-top: 10px; padding: 30px; flex-direction: column; gap: 10px;" key="${index}">
                                        <div style="font-size: 25px;margin-bottom: 5px">${item.company}</div>
                                        <div style="font-size: 25px;text-align: justify;">${item.description}</div>
                                    </div>`;
    }).join('')}
                            </div>
                        </div> 
                        <div style="padding: 30px;">
                            <div style="font-size: 30px; margin-top: 10px; color: gray; font-weight: 700;">
                                AWARDS
                            </div>
                            <div>
                                ${listAward?.map((item, index) => {
        return `
                                    <div style="margin-top: 10px; padding: 30px; flex-direction: column; gap: 10px;" key="${index}">
                                        <div style="font-size: 25px;margin-bottom: 5px">${item.company}</div>
                                        <div style="font-size: 25px;margin-bottom: 5px;text-align: justify;">${item.description}</div>
                                    </div>`;
    }).join('')}
                            </div>
                        </div> 
                    </div>
                </div>
                <div style="width: 55%; height: 100%">
                    <div style="margin: 40px; font-size: 30px; font-weight: 700;">HUYNH NGOC HIEU</div>
                    <div>
                        <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
                            <hr style="width: 20px; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                            <span style="font-size: 30px; border: 1px solid #c1e8e4; border-radius: 10px; font-weight: 700;">CAREER OBJECTIVE</span>
                            <hr style="flex: 1; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                        </div> 
                        <div style="font-size: 20px; margin-top: 20px; padding: 30px; text-align: justify; line-height: 1.5;">
                            Chiều cao của phần tử cha không được đặt cố định: Trong trường hợp này, phần tử cha của các phần tử con có chiều cao không cố định, nên không thể thiết lập chiều cao của các phần tử con là 100%. Để giải quyết vấn đề này, hãy đảm bảo rằng phần tử cha có chiều cao được đặt cố định hoặc sử dụng các giải pháp linh hoạt như sử dụng các đơn vị đo lường linh hoạt như viewport height (vh).
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
                            <hr style="width: 20px; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                            <span style=" font-weight: 700;font-size: 30px; border: 1px solid #c1e8e4; border-radius: 10px;">EDUCATION</span>
                            <hr style="flex: 1; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                        </div>   
                        <div>
                            ${listProject?.map((item, index) => {
        return `
                                <div style="margin-top: 10px; padding: 30px; flex-direction: column; gap: 10px;" key="${index}">
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Name: </b>
                                            <div>${item.position}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Link: </b>
                                            <div>${item.functionality}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Technologies: </b>
                                            <div>${item.technology}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Number of participants: : </b>
                                            <div>${item.participant}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Link: </b>
                                            <div>${item.link}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Time: </b>
                                            <div>2022-2023</div>
                                        </div>
                                    </div>
                                </div>`;
    }).join('')}
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
                            <hr style="width: 20px; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                            <span style=" font-weight: 700;font-size: 30px; border: 1px solid #c1e8e4; border-radius: 10px;">EDUCATION</span>
                            <hr style="flex: 1; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                        </div>   
                        <div>
                            ${listEducation?.map((item, index) => {
        return `
                                <div style="margin-top: 10px; padding: 30px; flex-direction: column; gap: 10px;" key="${index}">
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Name: </b>
                                            <div>${item.position}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Link: </b>
                                            <div>${item.functionality}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Technologies: </b>
                                            <div>${item.technology}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Number of participants: : </b>
                                            <div>${item.participant}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Link: </b>
                                            <div>${item.link}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Time: </b>
                                            <div>2022-2023</div>
                                        </div>
                                    </div>
                                </div>`;
    }).join('')}
                        </div>
                        <div>
                        ${listEducation?.map((item, index) => {
        return `
                            <div style="margin-top: 10px; padding: 30px; flex-direction: column; gap: 10px;" key="${index}">
                                <div style="font-size: 25px;margin-bottom: 10px">
                                    <div style="display: flex; flex-direction: row; gap: 5px;">
                                        <b style="">Name: </b>
                                        <div>${item.position}</div>
                                    </div>
                                </div>
                                <div style="font-size: 25px;margin-bottom: 10px">
                                    <div style="display: flex; flex-direction: row; gap: 5px;">
                                        <b style="">Link: </b>
                                        <div>${item.functionality}</div>
                                    </div>
                                </div>
                                <div style="font-size: 25px;margin-bottom: 10px">
                                    <div style="display: flex; flex-direction: row; gap: 5px;">
                                        <b style="">Technologies: </b>
                                        <div>${item.technology}</div>
                                    </div>
                                </div>
                                <div style="font-size: 25px;margin-bottom: 10px">
                                    <div style="display: flex; flex-direction: row; gap: 5px;">
                                        <b style="">Number of participants: : </b>
                                        <div>${item.participant}</div>
                                    </div>
                                </div>
                                <div style="font-size: 25px;margin-bottom: 10px">
                                    <div style="display: flex; flex-direction: row; gap: 5px;">
                                        <b style="">Link: </b>
                                        <div>${item.link}</div>
                                    </div>
                                </div>
                                <div style="font-size: 25px;">
                                    <div style="display: flex; flex-direction: row; gap: 5px;">
                                        <b style="">Time: </b>
                                        <div>2022-2023</div>
                                    </div>
                                </div>
                            </div>`;
    }).join('')}
                    </div>
                    </div>
                </div>
            </div>
        </body>
    </html>
    `;


    const print = async () => {

        await Print.printAsync({
            html,
        });
    };

    const printToFile = async () => {
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    useEffect(() => {
        dispatch(getProfileAction('vi'));
    }, [])

    useEffect(() => {
        if (profile) {
            setAvatar(profile.avatarPath);
        }
    }, [profile])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>
                            Hủy
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        placeholder="Tên file"
                        style={{
                            borderWidth: 0.5,
                            borderColor: 'gray',
                            borderRadius: 5,
                            padding: 3,
                            width: 100,
                        }}
                    />
                </View>
                <TouchableOpacity onPress={print} >
                    <Text style={{
                        fontWeight: 'bold',
                    }}>
                        Lưu
                    </Text>
                </TouchableOpacity>
            </View>
            <ContentHeaderPDFScreen />
            <ContentCenterPDFScreen avatar={avatar} />
            <ContentBottomPDFScreen />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        justifyContent: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 10,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacer: {
        marginVertical: 10,
    },
    printer: {
        fontSize: 16,
    },
    a4Paper: {
        width: '90%',
        height: '90%',
        borderWidth: 0.5,
        borderColor: 'black',
    },
});
