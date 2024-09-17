import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import Form from '../../../components/Form';

const TrackingHistory = () => {
  const {id} = useLocalSearchParams();

  return (
    <View className='flex-1 justify-center items-center'>
      {/* <Text>Page {id}</Text> */}
      <Form jenisPekerjaan='Housekeeping'  
      />
    </View>
  )
}

export default TrackingHistory