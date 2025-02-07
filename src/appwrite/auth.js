import { use } from "react";
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice{
  client = new Client();
  account;
  constructor(){
     this.client.setEndpoint(conf.appwriteUrl)
     .setProject(conf.appwriteProjectId);
     this.account = new Account(this.client);
  }
  async createaccount({email,password, name}){
    console.log("create account",email,password,name)
    try {
        const useraccount = this.account.create(ID.unique(),email,password,name)
        console.log("useraccount",useraccount)
        if(useraccount){
           this.login({email,password})
        }
        else{
            return useraccount
        }
    } catch (error) {
        throw error;
    }
  }

  async login({email , password}){
    console.log(email,password)
    try {
         return await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
        throw error
    }
  }

  async getcurrentuser(){
    try {
        return await this.account.get()
    } catch (error) {
     console.log("authservice :: getcurrentuser :", error) 
    }
    return null
  }

  async logout(){
    try {
    await this.account.deleteSessions()
    } catch (error) {
     console.log("authservice :: logout :", error) 
        
    }
  }
}

const authservice = new Authservice()

export default authservice