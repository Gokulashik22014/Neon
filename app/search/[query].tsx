import { View, Text, ScrollView, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import {getSearchResult } from "@/lib/appwrite";
import useFunction from "@/hooks/useFunction";
import { StatusBar } from "expo-status-bar";

const SearchQuery = () => {
  const { query } = useLocalSearchParams();
  const {data:posts,refetch}=useFunction(()=>getSearchResult(query as string))
  useEffect(()=>{
    refetch()
  },[query])
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
                <Text className="text-white/80 text-2xl">Search Result</Text>
              </View>
              <Image source={images.logoSmall} resizeMode="contain" className="w-12 h-12"/>
            </View>
            <SearchBar  initialSearch={query as string}/>
          </View>
        )}
        ListEmptyComponent={()=><EmptyState title="No Vides avaliable" subtitle="Be the first to create a video"/>}
        
      />
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
};

export default SearchQuery;
