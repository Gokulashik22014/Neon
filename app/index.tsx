import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useAuthContext } from "@/context/AuthProvider";

const Index = () => {
  const { isLoading, isLogged } = useAuthContext();

  if (!isLoading && isLogged) {
    return <Redirect href={"/Home"} />;
  }
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center px-12 min-h-[85vh]">
        <View className="flex-row space-x-3 items-center mb-5">
            <Image
              source={images.logoSmall}
              resizeMode="contain"
              className="w-16 h-16"
            />
            <Text className="text-white text-4xl front-pbold">Neon</Text>
          </View>
          <Image
            source={images.cards}
            resizeMode="contain"
            className="2-96 h-96"
          />
          <View className="mt-7">
            <Text className="text-white text-2xl text-center">
              Explore the world of entertainment with you{" "}
              <Text className="text-secondary-100">NEON</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute -bottom-6 -right-1 w-24 h-12"
              resizeMode="contain"
            />
          </View>
          <Text className="text-slate-400 mt-7 text-md text-center">
            Join 1000+ video content creators and show case your talent. Let
            your talent capture the hearts 💖 of people
          </Text>
          <CustomButton
            title="Join us with your email"
            handlePress={() => router.push("/SignIn")}
            contentstyle="w-full"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Index;
