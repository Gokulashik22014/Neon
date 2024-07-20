import { View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons} from "@/constants";
import { router, usePathname } from "expo-router";
const SearchBar = ({initialSearch}:{initialSearch?:string}) => {
  const pathName=usePathname()
  const [search,setSearch]=useState<string|undefined>(initialSearch||undefined)
  const handleSearch=()=>{
    if(!search){
      Alert.alert("Message","Enter value to search")
    }else{
      if(pathName.startsWith("/search")) router.setParams({query:search})
      else router.push(`/search/${search}`)
    }
  }
  return (
    <View>
      <View className="bg-black-200 py-4 rounded-2xl border border-black-900 mt-3 focus:border-secondary-200 flex-row flex-1 justify-between px-4">
        <TextInput
          value={search}
          onChangeText={(e)=>setSearch(e)}
          className="text-white text-lg font-pregular flex-1"
          placeholder="Search for the videos"
          placeholderTextColor="#CDCDF0"
        />
        <TouchableOpacity onPress={handleSearch}>
            <Image source={icons.search} resizeMode="contain" className="w-6 h-6"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
