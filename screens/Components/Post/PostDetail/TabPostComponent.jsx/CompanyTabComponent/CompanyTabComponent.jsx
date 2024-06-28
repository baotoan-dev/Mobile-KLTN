import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { companyApi } from '../../../../../../api/company/companyApi'
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import JobCompanyOfTab from './JobCompanyOfTab/JobCompanyOfTab';

export default function CompanyTabComponent({ post }) {

  const [nameCompany, setNameCompany] = useState('')
  const [detailCompany, setDetailCompany] = useState({})

  const fetchDataCompany = async () => {
    try {
      const res = await companyApi.getCompanyByName(nameCompany)

      if (res) {
        setDetailCompany(res.data.data)
      }

    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (post) {
      setNameCompany(post.company_name)
    }
  }, [post])

  useEffect(() => {
    if (nameCompany) {
      fetchDataCompany()
    }
  }, [nameCompany])

  return (
    <SafeAreaView>
      {
        detailCompany.name ? (
          <ScrollView style={styles.container}>
            {
              detailCompany.name && (
                <>
                  <View style={{
                    paddingHorizontal: 30
                  }}>
                    <View>
                      <Text style={styles.nameCompany}>{detailCompany.name}</Text>
                    </View>
                    <View style={styles.item}>
                      <View style={styles.icon}>
                        <Entypo name="address" size={24} color="black" />
                      </View>
                      <View style={{
                        marginLeft: 10
                      }}>
                        <Text style={styles.contentTitle}>Đia chỉ công ty</Text>
                        <Text>{detailCompany.address}</Text>
                      </View>
                    </View>
                    <View style={styles.item}>
                      <View style={styles.icon}>
                        <Fontisto name="arrow-resize" size={24} color="black" />
                      </View>
                      <View style={{
                        marginLeft: 10
                      }}>
                        <Text style={styles.contentTitle}>Quy mô công ty</Text>
                        <Text>{detailCompany.companySizeInfomation.nameText}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.desc}>Mô tả công ty</Text>
                      <Text>{detailCompany.description}</Text>
                    </View>
                  </View>

                  <View style={styles.jobOfCompany}>
                    <View style={{
                      marginTop: 10,
                    }}>
                      <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        paddingHorizontal: 30,
                      }}>
                        Việc làm của công ty
                      </Text>
                      <JobCompanyOfTab idCompany={detailCompany.id} />
                    </View>
                  </View>
                </>
              )
            }
          </ScrollView>
        ) : (
          <>
            <Image
              source={require('../../../../../../images/company.png')}
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                marginTop: 100
              }}
            />
            <Text style={{
              textAlign: 'center',
              fontSize: 17,
              marginTop: 20,
              fontWeight: 'bold'
            }}>Không có thông tin công ty</Text>
          </>
        )
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  nameCompany: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10
  },
  icon: {
    width: 35,
    height: 35,
    padding: 5,
    borderRadius: 17,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  contentTitle: {
    fontSize: 12,
    color: 'gray',
  },
  desc: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold'
  },
  jobOfCompany: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    padding: 0,
  }
})