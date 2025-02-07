import conf from "../conf/conf";
import { Client, Databases , Storage , ID ,Query } from "appwrite";

export class Service{
  client = new Client();
  databases;
  Bucket;
  constructor(){
     this.client.setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
          this.databases = new Databases(this.client);
          this.Bucket = new Storage(this.client);
  }
async createpost({tittle,content,featureimage,slug,status,userid}){
   try {
     return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
            tittle,
            content,
            featureimage,
            status,
            userid
        }
     )
   } catch (error) {
    console.log("authservice :: createpost :", error) 
   }
}

async updatepost(slug,{tittle,content,featureimage,status}){
try {
    return this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
            tittle,
            content,
            status,
            featureimage,
        }

    )
} catch (error) {
    console.log("authservice :: updatepost :", error)   
}
}

async deletepost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug  
        )
        return true
    } 
    catch (error) {
    console.log("authservice :: deletedocument :", error)   
      return false  
    }
}

async getpost(slug){
    console.log("getpsot", slug)
    try {
       return await  this.databases.getDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug   
        )
    } catch (error) {
    console.log("authservice :: deletedocument :", error)   
     return false   
    }
}
async getposts(query = [Query.equal("status","active")]){
   try {
   return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        query
    )
   } catch (error) {
    console.log("authservice :: getposts :", error)   
    return false
   }
}

    // FILE SERVICE//

 async uploadfile(file){
    console.log("uploadfile",file)
try {
  return await this.Bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
    )
    
} catch (error) {
    console.log("authservice :: uploadfile :", error)   
    return false
}
 }

 async deletefile(fileid){
try {
    await this.Bucket.deleteFile(
        conf.appwriteBucketID,
        fileid
    )
    return true
} catch (error) {
    console.log("authservice :: deletefile :", error)   
    return false
}
 }

 async getfilepreview(fileid){
    return await this.Bucket.getFilePreview(
      conf.appwriteBucketID,
      fileid  
    )
 }
}

const service = new Service()

export default service