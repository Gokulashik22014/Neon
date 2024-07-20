import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
type Props = {
  title: string;
  subtitle: string;
};
const EmptyState = ({ title, subtitle }: Props) => {
  return (
    <View className="items-center justify-center">
      <Image source={images.empty} resizeMode="contain" className="w-96 h-96" />
      <Text className="text-white font-pbold text-xl">{title}</Text>
      <Text className="text-white/80 font-pregular text-lg">{subtitle}</Text>
    </View>
  );
};

export default EmptyState;
