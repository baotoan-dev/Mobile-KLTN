import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import ListJobComponent from '../../../ListJobComponent/ListJobComponent'
import { searchApi } from '../../../../../../api/search/searchApi'

export default function JobTabComponent({post}) {

  const [idChildCategory, setIdChildCategory] = useState([]) 
  const [listJob, setListJob] = useState([])

  const fetchListJob = async () => {
    const result = await searchApi.getSearchByQueryV2(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      [],
      idChildCategory,
      null,
      null,
      'vi',
    );

    if (result && result.data.data) {
      setListJob(result.data.data.posts)
    }
  }

  useEffect(() => {
    if (post) {
      const idChildCategory = post.categories.map((item) => {
        return item.child_category_id
      })
      setIdChildCategory(idChildCategory)
    }

    if (idChildCategory) {
      fetchListJob()
    }
  }, [post])



  return (
    <View style={styles.container}>
      <ListJobComponent listJob={listJob}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})