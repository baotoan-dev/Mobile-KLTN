import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';

export default function ContentCenterPDFScreen({avatar}) {
    const education = [
        {
            id: 1,
            school: 'Đại học Bách Khoa Hà Nội',
            major: 'Công nghệ thông tin',
            from: '2018',
            to: '2022',
        },
        {
            id: 2,
            school: 'Đại học Bách Khoa Hà Nội',
            major: 'Công nghệ thông tin',
            from: '2018',
            to: '2022',
        },
        {
            id: 3,
            school: 'Đại học Bách Khoa Hà Nội',
            major: 'Công nghệ thông tin',
            from: '2018',
            to: '2022',
        },
        {
            id: 4,
            school: 'Đại học Bách Khoa Hà Nội',
            major: 'Công nghệ thông tin',
            from: '2018',
            to: '2022',
        },
        {
            id: 5,
            school: 'Đại học Bách Khoa Hà Nội',
            major: 'Công nghệ thông tin',
            from: '2018',
            to: '2022',
        },
    ];

    const html = `
    <!DOCTYPE html>
        <body>
        <div style="display: flex; flex-direction: row; width: 100%;">
            <div style="width: 50%; height: 100%, flex-direction: column">
                <div>
                    <div>
                        <img src="${avatar}" style="width: 200px; height: 200px" />
                    </div>
                    <div style="flex-direction: column, gap: 10 ">
                        <div style="font-size: 20px">Nguyễn Văn A</div>
                        <div style="font-size: 20px">Developer</div>
                        <div style="font-size: 20px">Frontend</div>
                        <div style="font-size: 20px">React Native</div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div style="width: 50%; height: 100%">
                <div>EDUCATION</div>
                <div>
                    ${education.map((item) => {
        return `
                            <div>
                                <div>${item.school}</div>
                                <div>${item.major}</div>
                                <div>${item.from} - ${item.to}</div>
                            </div>
                        `;
    }
    )}
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
        borderWidth: 0.5,
        borderColor: 'black',
    },
});
