import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { searchApi } from '../../../../../../api/search/searchApi'
import ListJobOfCompanyComponent from '../../../ListJobOfCompanyComponent/ListJobOfCompanyComponent'
import ListJobComponent from '../../../ListJobComponent/ListJobComponent'

export default function JobTabComponent({ post }) {

  const [idChildCategory, setIdChildCategory] = useState([])
  const [listJob, setListJob] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isOver, setIsOver] = useState(false)

  const fetchListJob = async () => {
    const result = await searchApi.getSearchByQueryV2(
      null,
      currentPage,
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
      if (currentPage === 0) {
        setListJob(result.data.data.posts)
      }
      else {
        setListJob((prev) => [...prev, ...result.data.data.posts])
      }
      setIsOver(result.data.data.is_over)
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

  useEffect(() => {
    fetchListJob()
  }, [currentPage])



  return (
    <View style={styles.container}>
      <ListJobComponent listJob={listJob} setCurrentPage={setCurrentPage} isOver={isOver} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  }
})