import { config } from "./config";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";



const client = new Client();
const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);
const storage=new Storage(client)
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);
export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatar.getInitials(username);
    const userData = {
      username,
      email,
      avatar: avatarUrl,
      accountid: newAccount.$id,
    };
    const newUser = await database.createDocument(
      config.databaseId,
      config.usersId,
      ID.unique(),
      userData
    );
    await sigin(email, password);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
export const sigin = async (email: string, passowrd: string) => {
  try {
    const user = await account.createEmailPasswordSession(email, passowrd);
    return user;
  } catch (error: any) {
    console.log(error);
    throw Error(error.message);
  }
};

export const getUser = async () => {
  try {
    const currentUser = await account.get();
    if (!currentUser) throw Error("No user logged");

    const currentUserData = await database.listDocuments(
      config.databaseId,
      config.usersId,
      [Query.equal("accountid", currentUser.$id)]
    );
    if (!currentUserData) throw Error("No user");
    return currentUserData.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async () => {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videosId
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

export const getLatestPost = async () => {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videosId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents
  } catch (error) {
    console.log(error);
  }
};

export const getSearchResult=async(query:string)=>{
  try {
    const result=await database.listDocuments(
      config.databaseId,
      config.videosId,
      [Query.startsWith("title",query)]
    )
    return result.documents
  } catch (error) {
    console.log(error);
  }
}
export const getUserPost=async(userid:any)=>{
  try {
    const result=await database.listDocuments(
      config.databaseId,
      config.videosId,
      [Query.equal("createdby",userid)]
    )
    return result.documents
  } catch (error) {
    console.log(error);
  }
}

export const logout=async()=>{
  try {
    const result=await account.deleteSession('current')
    return result
  } catch (error) {
    console.log(error);
  }
}
const getFileUrl=async(id:any,type:string)=>{
  let fileUrl;
  try {
    if(type==="image"){
      fileUrl=storage.getFilePreview(config.storageId,id,2000,2000,undefined,100)
    }else if(type=="video"){
      fileUrl=storage.getFilePreview(config.storageId,id) 
    }else{
      throw Error
    }
    return fileUrl
  } catch (error) {
    console.log(error);
  }
}
const uploadFile=async(file:any,type:string)=>{
  if(!file) return 
  try {
    const {mimeType,...rest}=file
    const asset={type:mimeType,...rest}
    const result=await storage.createFile(config.storageId,ID.unique(),asset)
    const fileUrl=await getFileUrl(result.$id,type)
    return fileUrl
  } catch (error) {
    console.log(error);
  }
}
export const createVideo=async(form:any)=>{
  try {
    const [thumbnailUrl,videoUrl]=await Promise.all([
      uploadFile(form.thumbnai,"image"),
      uploadFile(form.video,"video")
    ])
    const newPost=await database.createDocument(config.databaseId,config.videosId,ID.unique(),{
      title:form.title,
      prompt:form.prompt,
      thumbnail:thumbnailUrl,
      video:videoUrl,
      createdby:form.userId,
    })
    return newPost
  } catch (error) {
    console.log(error);
  }
}