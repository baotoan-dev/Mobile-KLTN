import { View, Text } from 'react-native'
import React from 'react'
import HeaderOfScreen from '../Components/HeaderOfScreen/HeaderOfScreen'
import ContentFollowing from './ContentFollowing/ContentFollowing'

export default function CompanyFollowingScreen() {
  return (
    <View>
      <HeaderOfScreen title='Công ty đang theo dõi'/>
      <ContentFollowing />
    </View>
  )
}