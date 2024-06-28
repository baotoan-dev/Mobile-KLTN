import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileAction } from '../../redux/store/Profile/profileSilce';
import ContentBottomPDFScreen from './ContentBottomPDFScreen/ContentBottomPDFScreen';
import { useNavigation } from '@react-navigation/native';
import ContentCenterPDFScreen from './ContentCenterPDFScreen/ContentCenterPDFScreen';
import * as Print from 'expo-print';
import { getCvProjectAction } from '../../redux/store/CvProject/cvProjectSlice';
import { getCvExtraInformationAction } from '../../redux/store/CvExtraInformation/CvExtraInformationSlice';
import { getCvInformationAction } from '../../redux/store/CvInFormation/cvInformationSlice';
import ModalActionSave from './ModalActionSave/ModalActionSave';
import { cvProfileApi } from '../../api/cv-profile/cvProfileApi';
import InforModifyUI from './InforModifyUI/InforModifyUI';
import { createCvLayoutAction, getCvLayoutAction } from '../../redux/store/CvLayout/cvLayoutSlice';
import ModalConfirmCreate from '../CVScreen/ModalComfirmCreate/ModalConfirmCreate';

export default function PDFScreen(prop) {
    const navigation = useNavigation();
    const viewShotRef = useRef(null);
    const [imageUri, setImageUri] = useState(null);
    const [showModalConfirmCreate, setShowModalConfirmCreate] = React.useState(false)
    const profile = useSelector((state) => state.profile.profile);
    const { typeAction, templateId, cvIndexParent } = prop.route.params;
    const dispatch = useDispatch();
    const [clickUpdateUI, setClickUpdateUI] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [showModalAction, setShowModalAction] = useState(false);
    const cvProject = useSelector(state => state.cvProject.cvProject);
    const cvExtraInformation = useSelector(state => state.cvExtraInformation.cvExtraInformation);
    const cvInformation = useSelector(state => state.cvInformation.cvInformation);
    const cvLayout = useSelector(state => state.cvLayout.cvLayout);
    const [listPersonalInformation, setListPersonalInformation] = useState({});
    const [listProject, setListProject] = useState([]);
    const [listSkill, setListSkill] = useState([]);
    const [listAward, setListAward] = useState([]);
    const [listEducation, setListEducation] = useState([]);
    const [nameCv, setNameCv] = useState('');
    const [dataModify, setDataModify] = useState({
        color: '#529300',
        size: 'small',
    })

    useEffect(() => {
        dispatch(getProfileAction('vi'));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCvProjectAction(cvIndexParent));
        dispatch(getCvExtraInformationAction(cvIndexParent));
        dispatch(getCvInformationAction(cvIndexParent));
        dispatch(getCvLayoutAction(cvIndexParent));
    }, [cvIndexParent]);

    useEffect(() => {
        if (cvInformation && cvInformation.data) {
            setListPersonalInformation(cvInformation.data);
        }
    }, [cvInformation]);

    useEffect(() => {
        if (cvProject && cvProject.length > 0) {
            setListProject(cvProject[0]?.moreCvProjects);
        }
        else {
            setListProject([]);
        }
    }, [cvProject]);

    useEffect(() => {
        if (cvLayout && cvLayout?.layout?.length > 0) {
            const layout = cvLayout?.layout?.length > 0 ? cvLayout.layout[0].split(',') : [];
            const color = cvLayout?.color?.length > 0 ? cvLayout.color[0].split(',') : [];
            const pad = cvLayout?.pad?.length > 0 ? cvLayout.pad[0].split(',') : [];
            const padPart = cvLayout?.padPart?.length > 0 ? cvLayout.padPart[0] : 0;
            const colorTopic = cvLayout?.colorTopic;
            const indexTopic = cvLayout?.indexTopic;
            setDataModify({
                color: color[0],
                size: pad[0] === '1' ? 'small' : 'big',
            });
        }
    }, [cvLayout]);

    useEffect(() => {
        if (cvExtraInformation && cvExtraInformation.length > 0) {
            const skills = cvExtraInformation.filter((item) => item.type === 'info_skill');
            const awards = cvExtraInformation.filter((item) => item.type === 'info_award');
            const educations = cvExtraInformation.filter((item) => item.type === 'info_study');
            setListSkill(skills.length > 0 ? skills[0].moreCvExtraInformations : []);
            setListAward(awards.length > 0 ? awards[0].moreCvExtraInformations : []);
            setListEducation(educations.length > 0 ? educations[0].moreCvExtraInformations : []);
        }
        else {
            setListAward([]);
            setListSkill([]);
            setListEducation([]);
        }
    }, [cvExtraInformation]);

    const handleApplyForCvLayout = () => {
        const dataUpload = {
            cvIndex: cvIndexParent,
            layout: [
                "40, 60"
            ],
            color: [
                `${dataModify.color}, #`,
            ],
            pad: [
                `${dataModify.size === 'small' ? '1' : '2'}, ${dataModify.size === 'small' ? '1' : '2'}`
            ],
            padPart: [+`${dataModify.size === 'small' ? '1' : '2'}`],
            colorTopic: "#529300,#3B82F6",
            indexTopic: +`${dataModify.color === '#529300' ? 1 : 2}`,
            colorText: [
                "#000000,#000000",
            ]
        }
        dispatch(createCvLayoutAction(dataUpload));
        dispatch(getCvLayoutAction(cvIndexParent)).then((data) => {
            ToastAndroid.show('Áp dụng thành công', ToastAndroid.SHORT);
            setDataModify(dataModify);
        });
    }

    const htmlTemplate1 = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>CV</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        </head>
        <body style="height: fit-content; margin: 0;" id="content">
            <div style="display: flex; flex-direction: row; width: 100%; height: 100%; padding: ${dataModify.size === 'small' ? '10px' : '20px'}">
                <div style="overflow: hidden;width: 40%; height: 100vh; flex-direction: column; background-color: ${dataModify.color};">
                    <div>
                        <div>
                            <div style="text-align: center; margin-top: 10px;">
                                <img src=${listPersonalInformation.avatar ? listPersonalInformation.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqgL3Hd08E6ZEepKPn1kNZnBLnWugLvplig&usqp=CAU'} style="width: 90%; height: 350px; border: 1px solid black; border-radius: 10px;" />
                            </div>
                            <div style="padding: 30px;">
                            <div style="font-size: 30px; margin-top: 10px; color: white; font-weight: 700;">
                                THÔNG TIN CÁ NHÂN
                            </div>
                             <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 20px;">
                                    ${listPersonalInformation.email ? `
                                    <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                                        <i class="fas fa-envelope" style="font-size: 30px"></i>
                                        <div style="font-size: 25px; word-wrap: break-word;">${listPersonalInformation.email}</div>
                                    </div>` : ''}
                                    ${listPersonalInformation.phone ? `
                                    <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                                        <i class="fas fa-phone" style="font-size: 30px"></i>
                                        <div style="font-size: 25px; word-wrap: break-word;">${listPersonalInformation.phone}</div>
                                    </div>` : ''}
                                    ${listPersonalInformation.address ? `
                                    <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                                        <i class="fas fa-address-book" style="font-size: 30px"></i>
                                        <div style="font-size: 25px; word-wrap: break-word;">${listPersonalInformation.address}</div>
                                    </div>` : ''}
                                    ${listPersonalInformation.link ? `
                                    <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                                        <i class="fas fa-link" style="font-size: 30px"></i>
                                        <div style="font-size: 25px; word-wrap: break-word;">${listPersonalInformation.link}</div>
                                    </div>` : ''}
                                </div>
                        </div>                        
                        </div>
                        <div style="padding: 30px;">
                            <div style="font-size: 30px; margin-top: 10px; color: white; font-weight: 700;">
                                KỸ NĂNG
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
                            <div style="font-size: 30px; margin-top: 10px; color: white; font-weight: 700;">
                                GIẢI THƯỞNG
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
                <div style="width: 60%; height: 100%">
                    <div style="margin: 40px; font-size: 30px; font-weight: 700;">
                        ${listPersonalInformation.name ? listPersonalInformation.name : ''}
                    </div>
                    <div>
                        <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
                            <hr style="width: 20px; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                            <span style="font-size: 30px; border: 1px solid #c1e8e4; border-radius: 10px; font-weight: 700;">MỤC TIÊU NGHỀ NGHIỆP</span>
                            <hr style="flex: 1; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                        </div> 
                        <div style="font-size: 20px; margin-top: 20px; padding: 30px; text-align: justify; line-height: 1.5;">
                            ${listPersonalInformation.intent ? listPersonalInformation.intent : ''}
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
                            <hr style="width: 20px; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                            <span style=" font-weight: 700;font-size: 30px; border: 1px solid #c1e8e4; border-radius: 10px;">DỰ ÁN</span>
                            <hr style="flex: 1; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                        </div>   
                        <div>
                            ${listProject?.map((item, index) => {
        return `
                                <div style="margin-top: 10px; padding: 30px; flex-direction: column; gap: 10px;" key="${index}">
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Tên dự án: </b>
                                            <div>${item.position}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Chức năng: </b>
                                            <div>${item.returnfunctionality}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Công nghệ: </b>
                                            <div>${item.technology}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Thành viên tham gia: </b>
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
                                            <b style="">Thời gian: </b>
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
                            <span style=" font-weight: 700;font-size: 30px; border: 1px solid #c1e8e4; border-radius: 10px;">HỌC VẤN</span>
                            <hr style="flex: 1; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                        </div>   
                        <div>
                            ${listEducation?.map((item, index) => {
        return `
                                <div style="margin-top: 10px; padding: 30px; flex-direction: column; gap: 10px;" key="${index}">
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Tên trường: </b>
                                            <div>${item.company}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Ngành nghề : </b>
                                            <div>${item.position}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Mô tả: </b>
                                            <div>${item.description}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Thời gian: </b>
                                            <div>${item.time}</div>
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

    const htmlTemplate2 = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>CV</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        </head>
        <body style="height: fit-content; margin: 0;" id="content">
            <div style="display: flex; flex-direction: row; width: 100%; height: 100%; padding: ${dataModify.size === 'small' ? '10px' : '20px'}">
                <div style="display: flex; height: 100vh; width: 100%">
                <div style="width: 40%; background-color: ${dataModify.color}; padding: ${dataModify.size === 'small' ? '10px' : '20px'}; height: 100%">
                    <div style="text-align: center;">
                        <img src="${listPersonalInformation.avatar ? listPersonalInformation.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqgL3Hd08E6ZEepKPn1kNZnBLnWugLvplig&usqp=CAU'}" style="width: 80%; height: 320px; border: 1px solid black; border-radius: 50%;" />
                    </div>
                    <div style="margin-top: 20px; font-size: 40px; font-weight: 700; text-align: center;">
                        ${listPersonalInformation.name ? listPersonalInformation.name : '12'}
                    </div>
                    <div style="font-size: 30px; margin-top: 20px; color: white; font-weight: 700; border: 3px solid black; padding: 10px; text-align: center;">
                        THÔNG TIN CÁ NHÂN
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 20px;">
                        ${listPersonalInformation.email ? `
                        <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                            <i class="fas fa-envelope" style="font-size: 30px"></i>
                            <div style="font-size: 25px; word-wrap: break-word;">${listPersonalInformation.email}</div>
                        </div>` : ''}
                        ${listPersonalInformation.phone ? `
                        <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                            <i class="fas fa-phone" style="font-size: 30px"></i>
                            <div style="font-size: 25px; word-wrap: break-word;">${listPersonalInformation.phone}</div>
                        </div>` : ''}
                        ${listPersonalInformation.address ? `
                        <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                            <i class="fas fa-address-book" style="font-size: 30px"></i>
                            <div style="font-size: 25px; word-wrap: break-word;">${listPersonalInformation.address}</div>
                        </div>` : ''}
                        ${listPersonalInformation.link ? `
                        <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                            <i class="fas fa-link" style="font-size: 30px"></i>
                            <div style="font-size: 25px; word-wrap: break-word;">${listPersonalInformation.link}</div>
                        </div>` : ''}
                    </div>
                    <div style="font-size: 30px; margin-top: 30px; color: white; font-weight: 700; border: 3px solid black; padding: 10px; text-align: center;">
                        KỸ NĂNG
                    </div>
                    <div>
                        ${listSkill?.map((item, index) => {
                return `
                            <div style="margin-top: 10px; padding: 30px; flex-direction: column; gap: 10px;">
                                <div style="font-size: 25px;margin-bottom: 5px">${item.company}</div>
                                <div style="font-size: 25px;text-align: justify;">${item.description}</div>
                            </div>`;
            }).join('')}
                    </div>
                    <div style="font-size: 30px; margin-top: 10px; color: white; font-weight: 700; border: 3px solid black; padding: 10px; text-align: center;">
                        GIẢI THƯỞNG
                    </div>
                    <div>
                        ${listAward?.map((item, index) => {
                return `
                            <div style="margin-top: 10px; padding: 30px; flex-direction: column; gap: 10px;">
                                <div style="font-size: 25px;margin-bottom: 5px">${item.company}</div>
                                <div style="font-size: 25px;margin-bottom: 5px;text-align: justify;">${item.description}</div>
                            </div>`;
            }).join('')}
                    </div>
                </div>
                <div style="width: 60%; height: 100%; margin-left: 20px; margin-right: 20px">
                     <div style="display: flex; flex-direction: column">
                        <div style=" justify-content: center; align-items: center; font-size: 30px; color: black; font-weight: 700; border: 3px solid black; padding: 10px; text-align: center; width: 95%">
                            DỰ ÁN
                        </div>   
                        <div>
                            ${listProject?.map((item, index) => {
        return `
                                <div style="margin-top: 10px; padding: 30px; flex-direction: column; gap: 10px;" key="${index}">
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Tên dự án: </b>
                                            <div>${item.position}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Chức năng: </b>
                                            <div>${item.functionality}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Công nghệ: </b>
                                            <div>${item.technology}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Thành viên tham gia: </b>
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
                                            <b style="">Thời gian: </b>
                                            <div>2022-2023</div>
                                        </div>
                                    </div>
                                </div>`;
    }).join('')}
                        </div>
                    </div>
                     <div>
                        <div style=" justify-content: center; align-items: center; font-size: 30px; color: black; font-weight: 700; border: 3px solid black; padding: 10px; text-align: center; width: 95%">
                            HỌC VẤN
                        </div>     
                        <div>
                            ${listEducation?.map((item, index) => {
        return `
                                <div style="margin-top: 10px; padding: 30px; flex-direction: column; gap: 10px;" key="${index}">
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Tên trường: </b>
                                            <div>${item.company}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Ngành nghề : </b>
                                            <div>${item.position}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Mô tả: </b>
                                            <div>${item.description}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 25px;margin-bottom: 10px">
                                        <div style="display: flex; flex-direction: row; gap: 5px;">
                                            <b style="">Thời gian: </b>
                                            <div>${item.time}</div>
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

    const handleCaptureImage = () => {
        viewShotRef.current.capture().then(uri => {
            setImageUri(uri);
        }).catch(error => {
            console.error("Failed to capture image", error);
        });
    };
    const handleAction = () => {
        setShowModalAction(true);
    }


    const handlePrint = async () => {
        await Print.printAsync({
            html,
        });
    };


    const printToFile = async () => {
        handleCaptureImage();
        const { uri } = await Print.printToFileAsync({ html:
            templateId === 1 ? htmlTemplate1 : htmlTemplate2
         });

        if (!nameCv) {
            setShowModalAction(false);
            ToastAndroid.show('Vui lòng nhập tên file', ToastAndroid.SHORT);
            return;
        }

        const formData = new FormData();

        formData.append('file', {
            uri,
            name: nameCv,
            type: 'application/pdf',
        });
        formData.append('name', nameCv);
        formData.append('cvIndex', cvIndexParent);
        formData.append('templateId', templateId);
        formData.append('device', 0);
        formData.append('type', 1);
        formData.append('images', {
            uri: imageUri,
            name: 'image.png',
            type: 'image/png',
        })


        const res = await cvProfileApi.createCv(formData)

        if (res && res.data.statusCode === 201) {
            dispatch(getProfileAction('vi'))
            setShowModalAction(false);
            navigation.navigate('CV');
            ToastAndroid.show('Tạo file thành công', ToastAndroid.SHORT);
        }
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
            {
                clickUpdateUI === false ? (
                    <View style={styles.header}>
                        <View>
                            <TouchableOpacity onPress={() => {
                                setShowModalConfirmCreate(true)
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
                                onChangeText={(text) => setNameCv(text)}
                                style={{
                                    borderRadius: 5,
                                    padding: 2,
                                    width: 100,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    borderColor: 'gray',
                                    borderWidth: 0.5,
                                }}
                            />
                        </View>
                        <TouchableOpacity onPress={handleAction} >
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Lưu
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.header}>
                        <View>
                            <TouchableOpacity onPress={() => {
                                setClickUpdateUI(!clickUpdateUI)
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                }}>
                                    Hủy
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{
                                fontWeight: 'bold',
                                textDecorationLine: 'underline',
                            }}>
                                Sửa giao diện
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    handleApplyForCvLayout()
                                }}
                            >
                                <Text style={{
                                    fontWeight: 'bold',
                                }}>
                                    Áp dụng
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            <ModalActionSave
                showModalAction={showModalAction}
                setShowModalAction={setShowModalAction}
                handlePrint={handlePrint}
                printToFile={printToFile}
            />
            {/* <ContentHeaderPDFScreen /> */}
            <ContentCenterPDFScreen
                dataModify={dataModify}
                listAward={listAward}
                listPersonalInformation={listPersonalInformation}
                listProject={listProject}
                listSkill={listSkill}
                listEducation={listEducation}
                viewShotRef={viewShotRef}
                imageUri={imageUri}
                templateId={templateId}
            />
            <InforModifyUI
                clickUpdateUI={clickUpdateUI}
                setClickUpdateUI={setClickUpdateUI}
                dataModify={dataModify}
                setDataModify={setDataModify}
            />
            <ContentBottomPDFScreen
                typeAction={typeAction}
                clickUpdateUI={clickUpdateUI}
                setClickUpdateUI={setClickUpdateUI}
                cvIndex={cvIndexParent}
            />
            {
                showModalConfirmCreate && (
                    <ModalConfirmCreate
                        cvIndex={cvIndexParent}
                        templateId={templateId}
                        showModalConfirmCreate={showModalConfirmCreate}
                        setShowModalConfirmCreate={setShowModalConfirmCreate}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EBE3',
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
        backgroundColor: 'white',
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
        width: '100%',
        height: '100%'
    },
});
