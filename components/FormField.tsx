import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
type Props = {
  title: string;
  type: string;
  value: string | undefined;
  handleChange: any | undefined;
  containerStyle?: string;
  textStyle?: string;
  placeholder?: string;
};
const FormField = ({
  title,
  type,
  containerStyle,
  textStyle,
  value,
  handleChange,
  placeholder,
}: Props) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <View className="mt-7">
      <Text className="text-white text-lg">{title}</Text>
      <View className="bg-black-100 py-4 rounded-2xl border border-black-900 mt-3 focus:border-secondary-200 flex-row flex-1 justify-between px-2">
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={handleChange}
          placeholderTextColor="#CDCDF0"
          className="text-white text-lg font-pregular flex-1"
          secureTextEntry={type==="password" && !showPass}
        />
        {type == "password" && (
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Image
              source={!showPass ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="h-6 w-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
