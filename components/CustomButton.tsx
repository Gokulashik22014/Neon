import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
type Props={
    title:string;
    handlePress:any;
    contentstyle?:string;
    textStyle?:string;
    isLoading?:boolean;
}
const CustomButton = ({title,handlePress,contentstyle,textStyle,isLoading=false}:Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} disabled={isLoading} onPress={handlePress} className={`bg-secondary-200 px-12 mt-7 rounded-lg py-6 ${contentstyle} ${isLoading?"opacity-50":""}`}>
      <Text className={`text-xl text-white text-center ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton