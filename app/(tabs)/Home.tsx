import { View, Text, ScrollView, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchBar from "@/components/SearchBar";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPost, getLatestPost } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";
import VideoCard from "@/components/VideoCard";
import useFunction from "@/hooks/useFunction";
import { useAuthContext } from "@/context/AuthProvider";

const Home = () => {
  const [refresh,setRefresh]=useState(false)
  const {data:posts,refetch}=useFunction(getAllPost)
  const {data:latestPost}=useFunction(getLatestPost)
  const {user}=useAuthContext()
  const onRefresh=async()=>{
    setRefresh(true)
    await refetch()
    setRefresh(false)
  }
  // console.log(data);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$createdAt}
        renderItem={({ item }) => (
          <VideoCard item={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex flex-row justify-between items-center">
              <View className="justify-start">
                <Text className="text-white/80 text-2xl">Welcome</Text>
                <Text className="text-3xl font-pbold text-white mt-1">
                  {user.username}
                </Text>
              </View>
              <Image source={images.logoSmall} resizeMode="contain" className="w-12 h-12"/>
            </View>
            <SearchBar  />
              <View className="w-full pt-5 flex-1">
                <Text className="text-2xl text-white font-pregular mb-3">Latest Videos</Text>
                <Trending post={latestPost??[]}/>
              </View>
          </View>
        )}
        ListEmptyComponent={()=><EmptyState title="No Vides avaliable" subtitle="Be the first to create a video"/>}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  );
};

export default Home;
