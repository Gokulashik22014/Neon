import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground,ViewToken } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import {Video,ResizeMode} from "expo-av"
const zoomIn = { 0: { "scale": 0.9 }, 1: { "scale": 1 } };
const zoomOut = { 0: { "scale": 1 }, 1: { "scale": 0.9 } };

const TrendingPostCard = ({ item, activeItem }:{item:any,activeItem:any}) => {
  const [play, setPlay] = useState(false);
  // console.log(item.video);
  // console.log(item,activeItem);
  return (
    <Animatable.View
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
      className="mr-5"
    >
      {play ? (
        <Video
         source={{uri:item.video}}
         className="w-52 h-72 rounded-xl bg-white/40"
         resizeMode={ResizeMode.CONTAIN}
         shouldPlay
         useNativeControls
         onPlaybackStatusUpdate={(playbackStatus)=>{
          console.log("hello");
          setPlay(false)
         }}
        />
      ) : (
        <TouchableOpacity
          className="items-center justify-center relative my-6"
          activeOpacity={0.7}
          onPress={() => setPlay(!play)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
            className="w-52 h-72 rounded-xl overflow-hidden shadow-lg shadow-black/40"
          />
          
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ post }: { post: any }) => {
  const [activeItem, setActiveItem] = useState(post[1]);
  const viewChange=({viewableItems}:{viewableItems:ViewToken<any>[]})=>{
    if(viewableItems.length>0){
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <FlatList
      data={post}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingPostCard activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold:70
      }}
      contentOffset={{x:170,y:0}}
      horizontal
    />
  );
};

export default Trending;
