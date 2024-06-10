import { View, StyleSheet } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';

export default function ContentCenterPDFScreen({ 
    dataModify, 
    listAward, 
    listPersonalInformation,
    listProject,
    listSkill,
    listEducation
}) {
    
    console.log('dataModify', dataModify);

    const html = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>CV</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        </head>
        <body style="height: fit-content; margin: 0;">
            <div style="display: flex; flex-direction: row; width: 100%; height: 100%; padding: ${dataModify.size === 'small' ? '10px' : '20px'}">
                <div style="overflow: hidden;width: 45%; height: 100vh; flex-direction: column; background-color: ${dataModify.color};">
                    <div>
                        <div>
                            <div style="text-align: center; margin-top: 10px;">
                                <img src=${listPersonalInformation.avatar ? listPersonalInformation.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqgL3Hd08E6ZEepKPn1kNZnBLnWugLvplig&usqp=CAU'} style="width: 90%; height: 400px; border: 1px solid black; border-radius: 10px;" />
                            </div>
                            <div style="padding: 30px;">
                            <div style="font-size: 30px; margin-top: 10px; color: white; font-weight: 700;">
                                PERSONAL INFORMATION 
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
                            <div style="font-size: 30px; margin-top: 10px; color: white; font-weight: 700;">
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
                    <div style="margin: 40px; font-size: 30px; font-weight: 700;">
                        ${listPersonalInformation.name ? listPersonalInformation.name : 'Name'}
                    </div>
                    <div>
                        <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
                            <hr style="width: 20px; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                            <span style="font-size: 30px; border: 1px solid #c1e8e4; border-radius: 10px; font-weight: 700;">CAREER OBJECTIVE</span>
                            <hr style="flex: 1; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                        </div> 
                        <div style="font-size: 20px; margin-top: 20px; padding: 30px; text-align: justify; line-height: 1.5;">
                            ${listPersonalInformation.intent ? listPersonalInformation.intent : ''}
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
                            <hr style="width: 20px; margin: 0 10px; border: none; border-top: 1px solid #c1e8e4;">
                            <span style=" font-weight: 700;font-size: 30px; border: 1px solid #c1e8e4; border-radius: 10px;">PROJECT</span>
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
                    </div>
                </div>
            </div>
        </body>
    </html>
    `;


    return (
        <View style={styles.content}>
            <View style={styles.a4Paper}>
                <WebView
                    source={{ html }}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                />
            </View>
        </View>
    )
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
        backgroundColor: 'white',
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
