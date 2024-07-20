import { View, Text } from 'react-native'
import React from 'react'
type Props={
    title:string;
    subtitle?:string;
    containerStyle?:string;
    textStyle?:string;
}
const Inbox = ({title,subtitle,containerStyle,textStyle}:Props) => {
  return (
    <View className={`items-center ${containerStyle}`}>
      <Text className={`text-white text-xl ${textStyle}`}>{title}</Text>
      <Text className={`text-white/40 text-lg ${textStyle}`}>{subtitle}</Text>
    </View>
  )
}

export default Inbox