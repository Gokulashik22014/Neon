import { View, Text, ImageSourcePropType } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Image } from "react-native";
import { icons } from "@/constants";
type tabElementProps = {
  color: string;
  focused: boolean;
  name: string;
  icon: string;
};
const TabElements = ({ icon, color, focused, name }: tabElementProps) => {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icon as ImageSourcePropType}
        resizeMode="contain"
        className="w-6 h-6"
        tintColor={color}
      />
      <Text className={`${focused ? "font-pbold" : "font-pregular"} text-xs`} style={{color:color}}>
        {name}
      </Text>
    </View>
  );
};
const TabLayout = () => {
  const tabElemets = [
    {
      name: "Home",
      icon: icons.home,
    },
    {
      name: "Create",
      icon: icons.plus,
    },
    {
      name: "Profile",
      icon: icons.profile,
    },
  ];
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor:"#FFA001",
          tabBarInactiveTintColor:"#CDCDE0",
          headerShown:false,
          tabBarStyle:{
            backgroundColor:"#161622",
            height:72,
            borderTopWidth:1,
            borderTopColor:"#232533"
          }
        }}
      >
        {tabElemets.map((data,index) => (
          <Tabs.Screen
            key={index}
            name={data.name}
            options={{
              title: data.name,
              tabBarIcon: ({ color, focused }) => (
                <TabElements
                  icon={data.icon}
                  color={color}
                  focused={focused}
                  name={data.name}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
};

export default TabLayout;
