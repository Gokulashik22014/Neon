import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useAuthContext } from "@/context/AuthProvider";

const SignUp = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [isLoading,setIsLoading]=useState(false);
  const{setUser,setIsLogged}=useAuthContext()
  const submit = async () => {
    try {
      if (!username || !email || !password) {
        Alert.alert("Error", "Please provide all the details");
      }else{
        const newUser=await createUser(username,email,password)
        setIsLoading(true)
        if(!newUser) throw Error("Error in creating")
        setUser(newUser)
        setIsLogged(true)
        router.replace("/Home")
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message);
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="min-h-[85vh] justify-center px-4">
          <View className="mt-7">
          <View className="flex-row space-x-3 items-center mb-5">
            <Image
              source={images.logoSmall}
              resizeMode="contain"
              className="w-16 h-16"
            />
            <Text className="text-white text-4xl front-pbold">Neon</Text>
          </View>
            <Text className="text-white text-xl">
              <Text className="text-secondary-100">Sign Up</Text> to create your
              account
            </Text>
          </View>
          <FormField
            title="Username"
            type="username"
            value={username}
            handleChange={(e: any) => setUsername(e)}
          />
          <FormField
            title="Email"
            type="email"
            value={email}
            handleChange={(e: any) => setEmail(e)}
          />
          <FormField
            title="Password"
            type="password"
            value={password}
            handleChange={(e: any) => setPassword(e)}
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            textStyle="font-pregular"
          />
          <Text className="text-white font-pbold text-sm text-center mt-7">
            Have an account{" "}
            <Link href={"/SignIn"} className="text-secondary-200">
              Sign In
            </Link>
          </Text>
        </View>
        <StatusBar backgroundColor="#161622" style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
