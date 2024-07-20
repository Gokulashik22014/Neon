import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { icons, images } from "@/constants";
import FormField from "@/components/FormField";
import { Video, ResizeMode } from "expo-av";
import CustomButton from "@/components/CustomButton";
import * as DocumetPicker from "expo-document-picker";
import { useAuthContext } from "@/context/AuthProvider";
import { createVideo } from "@/lib/appwrite";
type formType = {
  title: string;
  video: any;
  thumbnail: any;
  prompt: string;
  userId: any;
};
const Create = () => {
  const { user } = useAuthContext();
  const [form, setForm] = useState<formType>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
    userId: user.$id,
  });
  const [uploading, setUploading] = useState(false);
  const openPicker = async (selectedType: string) => {
    const result = await DocumetPicker.getDocumentAsync({
      type:
        selectedType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });
    if (!result.canceled) {
      if (selectedType === "image") {
        setForm((old) => ({ ...old, thumbnail: result.assets[0] }));
      }
      if (selectedType === "video") {
        setForm((old) => ({ ...old, video: result.assets[0] }));
      }
    } else {
      setTimeout(() => {
        Alert.alert("Error", "Error in uploading");
      }, 100);
    }
    console.log(form);
  };
  const submit = async() => {
    if (!form.title || !form.prompt || !form.thumbnail || !form.video) {
      return Alert.alert("Message", "All fields are needed");
    }
    setUploading(true);
    try {
      await createVideo(form)
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="my-6 px-4">
          <View className="flex-row justify-between items-center mt-6">
            <Text className="text-white font-psemibold text-2xl">
              Upload your Video
            </Text>
            <Image
              source={images.logoSmall}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </View>
          <View className="flex space-y-5 ">
            <FormField
              title="Title of your Video"
              value={form.title}
              handleChange={(e: any) =>
                setForm((old) => ({ ...old, title: e }))
              }
              placeholder="Give a catchy title"
              type="title"
            />
            <View>
              <Text className="text-white text-lg">Upload video</Text>
              {form.video ? (
                <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
              ) : (
                <View className="w-full h-52 bg-black-100 rounded-lg mt-3 items-center justify-center">
                  <TouchableOpacity
                    className="items-center justify-center border border-dashed border-secondary-100 w-1/3 h-1/3 rounded-xm"
                    onPress={() => openPicker("video")}
                  >
                    <Image
                      source={icons.upload}
                      className="w-12 h-12"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View>
              <Text className="text-white text-lg">Upload Thumbnail</Text>
              {form.thumbnail ? (
                <Image source={{uri:form.thumbnail.uri}} resizeMode="cover" className="w-full h-64 rounded-2xl"
/>
              ) : (
                <View className="w-full h-24 bg-black-100 rounded-lg mt-3 items-center justify-center">
                  <TouchableOpacity
                    onPress={() => openPicker("image")}
                    className="items-center justify-center border border-dashed border-secondary-100 w-1/4 h-1/3 rounded-xm py-7"
                  >
                    <Image
                      source={icons.upload}
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <FormField
              title="Prompt"
              value={form.prompt}
              handleChange={(e: any) =>
                setForm((old) => ({ ...old, prompt: e }))
              }
              placeholder="Enter the prompt used to generate"
              type="prompt"
            />
          </View>
          <CustomButton handlePress={submit} title="Upload your video" />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Create;
