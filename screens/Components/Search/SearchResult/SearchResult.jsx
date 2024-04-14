import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import HeaderSearchResult from './HeaderSearchResult/HeaderSearchResult';
import ContentSearchResult from './ContentSearchResult/ContentSearchResult';

export default function SearchResult() {
  return (
    <View style={styles.container}>
      <View style={{
        alignSelf: 'flex-start'
      }}>
        <HeaderSearchResult />
      </View>
      <View style={{
        height: '80%',
      }}>
        <ContentSearchResult />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    height: '100%',
  }
})