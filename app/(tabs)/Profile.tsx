import { View, FlatList, Image,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import { getUserPost, logout } from "@/lib/appwrite";
import useFunction from "@/hooks/useFunction";
import { useAuthContext } from "@/context/AuthProvider";
import Inbox from "@/components/Inbox";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useAuthContext();
  const { data: posts } = useFunction(() => getUserPost(user.$id));
  const handleLogout=async()=>{
    const result=await logout();
    if(result){
      router.replace("/SignIn")
      setIsLogged(false)
      setUser(null)
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$createdAt}
        renderItem={({ item }) => <VideoCard item={item} />}
        ListHeaderComponent={() => (
          <View className="my-6">
            <TouchableOpacity className="w-full items-end px-2" onPress={handleLogout}>
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="mx-4 py-6 flex items-center rounded-lg">
              <Image source={{uri:user.avatar}} className="w-12 h-12 rounded-full" resizeMode="contain"  />
              <Inbox title={user.username} />
              <View className="flex flex-row items-center bg-black-100/40 py-3 w-full justify-around rounded-xl">
                <Inbox title={posts?.length} subtitle="Posts" textStyle="font-pbold" />
                <Inbox title={"120"} subtitle="Followers" textStyle="font-psemibold" />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Vides avaliable"
            subtitle="Create your First Video"
          />
        )}
      />
      <StatusBar  backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
};

export default Profile;
