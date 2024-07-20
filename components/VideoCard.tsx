import { View, Text, Image,TouchableOpacity} from "react-native";
import React, { useState } from "react";
import { Models } from "react-native-appwrite";
import { icons, images } from "@/constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({ item }: { item: Models.Document }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex flex-col items-start justify-center px-4 mb-10 mt-4 bg-black-100 rounded-xl py-2">
      <View className="flex-row justify-between w-full items-center ">
        <View className="flex-row space-x-2">
          <Image
            source={{ uri: item.createdby.avatar }}
            resizeMode="contain"
            className="w-12 h-12 rounded-full"
          />
          <View className="w-72">
            <Text className="text-white text-lg font-pbold" numberOfLines={1}>
              {item.title}
            </Text>
            <Text className="text-white/80 font-semibold">
              {item.createdby.username}
            </Text>
          </View>
        </View>
        <View className="mt-2">
          <Image source={icons.menu} resizeMode="contain" className="w-6 h-6" />
        </View>
      </View>
      {play ? (
        <Video
        source={{uri:item.video}}
        className="w-full h-72 rounded-xl bg-white/40"
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        useNativeControls
        onPlaybackStatusUpdate={(playbackStatus)=>{
         setPlay(false)
        }}
        />
      ) : (
        <TouchableOpacity className="h-72 w-full items-center justify-center relative" activeOpacity={0.7} onPress={()=>setPlay(!play)}>
            <Image
              source={{ uri: item.thumbnail }}
              resizeMode="cover"
              className="w-full h-full rounded-lg mt-3"
              />
            <Image source={icons.play} resizeMode="contain" className="w-12 h-12 absolute"/>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
