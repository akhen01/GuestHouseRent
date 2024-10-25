import conf from "../conf/conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class AppwriteService{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost ({name, description, price, address, guests, beds, bedrooms, baths, reserved, facilities, amenities, reservedTill, houseImages, slug, userId }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID, conf.appwriteCollectionID,
                slug,
                {
                    name, description, price, address,
                    guests, beds, bedrooms, baths,
                    reserved, facilities, amenities,
                    reservedTill, houseImages, userId }
            )
        } catch (error) {
            console.log("appwriteService createPost() Error:: ", error)
        }
    }
    async updatePost(slug, { name, description, price, address, guests, beds, bedrooms, baths, reserved, facilities, amenities, reservedTill, houseImages }){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID, conf.appwriteCollectionID,
                slug,
                {
                    name, description, price, address, guests, beds, bedrooms, baths, reserved, facilities, amenities, reservedTill, houseImages
                }
            )
        } catch (error) {
            console.log("appwriteService updatePost() Error:: ", error)
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID, conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("appwriteService deletePost() Error:: ", error)            
        }
        return true
    }
    async getPosts(query = [Query.select("reserved", false)]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID, conf.appwriteCollectionID,
                query
            )
        } catch (error) {
            console.log("appwriteService getPosts() Error:: ", error)
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID, conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("appwriteService getPost() Error:: ", error)
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwriteService uploadFile() Error:: ", error)
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
        } catch (error) {
            console.log("appwriteService deleteFile() Error:: ", error)
            return false
        }
    }
    previewFile(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketID, fileId
            ).href
        } catch (error) {
            console.log("appwriteService getPreviewFile() Error:: ", error)
        }
    }
}

const appwriteService = new AppwriteService()
export default appwriteService


