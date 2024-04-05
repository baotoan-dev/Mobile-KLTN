import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Notice() {
    return (
        <View>
            <Text style={styles.title}>Lưu ý</Text>
            <View>
                <Text style={{
                    fontSize: 14,
                    textAlign: 'justify',
                    lineHeight: 20,
                }}>
                    1. JOBS khuyên tất cả các bạn hãy luôn cẩn trọng trong quá trình tìm việc và chủ động nghiên cứu về thông tin công ty, vị trí việc làm trước khi ứng tuyển.
                    Ứng viên cần có trách nhiệm với hành vi ứng tuyển của mình. Nếu bạn gặp phải tin tuyển dụng hoặc nhận được liên lạc đáng ngờ của nhà tuyển dụng, hãy báo cáo ngay cho JOBS qua email
                    <Text
                        style={{
                            color: 'blue',
                            textDecorationLine: 'underline',
                        }}
                    > jobs@gmail.com</Text> để được hỗ trợ kịp thời.
                </Text>
                <Text style={{
                    fontSize: 14,
                    textAlign: 'justify',
                    lineHeight: 20,
                    marginTop: 10,
                }}>
                    2. Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo tại đây.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
})