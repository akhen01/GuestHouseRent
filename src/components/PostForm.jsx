import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Input} from './Input'
import appwriteService from "../appwrite/config"
import Button from "../components/Button"
import Select from '../components/Select'

function PostForm({post}) {
    const {handleSubmit, reset, register} = useForm({
        defaultValues: {
            name: post?.name || "", 
            description: post?.description || "", 
            price: post?.price || 1, 
            address: post?.address || "", 
            guests: post?.guests || 1, 
            beds: post?.beds || 1, 
            bedrooms: post?.bedrooms || 1, 
            baths: post?.baths  || 1, 
            reserved: post?.reserved || false, 
            facilities: post?.facilities || "", 
            amenities: post?.amenities || "", 
            reservedTill: post?.reservedTill || null,
            houseImages: post?.houseImages || [],
            slug: post?.slug || ""
        }
    })

    const navigate = useNavigate()
    const UserData = useSelector((state) => state.auth.userData)
    

    const submit = async(data) => {
        if(post){
            const filelis = []
            const filelisId = []
            if(data.images.length !== 0){
                for(let i = 0; i<data.images.length; i++){
                    filelis.push(await appwriteService.uploadFile(data.images[i]))
                }
                filelis.map((file)=>(
                    filelisId.push(file.$id)
                ))
            }else{
                    null
                }
                const dbpost = await appwriteService.updatePost(post.$id, {...data,
                    houseImages: filelisId?.length!==0 ? post.houseImages.concat(filelisId) : post.houseImages,
                    price: parseInt(data.price),
                    beds: parseInt(data.beds),
                    baths: parseInt(data.baths),
                    bedrooms: parseInt(data.bedrooms),
                    guests: parseInt(data.guests),
                })
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
    }else {
        console.log(UserData)
        console.log(data.price)
        const filelis = []
        const filelisId = []
        for(let i = 0; i<data.images.length; i++){
            filelis.push(await appwriteService.uploadFile(data.images[i]))
        }
        filelis.map((file)=>(
            filelisId.push(file.$id)
        ))
        data.houseImages={...filelisId}
        data.slug = Date.now().toString()
        const dbpost = await appwriteService.createPost({...data, 
            userId: UserData.$id,
            price: parseInt(data.price),
            beds: parseInt(data.beds),
            baths: parseInt(data.baths),
            bedrooms: parseInt(data.bedrooms),
            guests: parseInt(data.guests),
        })
            if(dbpost){
            navigate(`/post/${dbpost.$id}`)
        }
    }
}
useEffect(() => {
 if(post){
    reset(post)
 }
}, [reset, post])

  return (
    <div>
        <form onSubmit={handleSubmit(submit)}>
            <Input
            label="Name: "
            placeholder="Name"
            className="mb-4"
            {...register("name", {required: true})}/>
            <Input
            label="Description: "
            placeholder="Description"
            className="mb-4"
            {...register("description", {required: true})}/>
            <Input
            type="number"
            label="Price: "
            placeholder="Price"
            className="mb-4"
            {...register("price", {required: true, min: {
                value: 1,
                message: "Max value 1"
              },
              max: {
                value: 9999999,
                message: "Max value 9999999"
              }})}/>
            <Input
            label="Address: "
            placeholder="Address"
            className="mb-4"
            {...register("address", {required: true})}/>
            
            <Select 
            label="Reserved"
            options={["Reserved", "Free"]}
            className="mb-4"
            {...register("reserved", {required: true})}
            />
            <Input 
            label="Facilities: "
            placeholder="Facilities"
            className="mb-4"
            {...register("facilities", {required: true, min: {
                value: 1,
                message: "Max value 1"
              },
              max: {
                value: 10,
                message: "Max value 10"
              }}, )}/>
            <Input
            label="Amenities: "
            placeholder="Amenities"
            className="mb-4"
            {...register("amenities", {required: true})}/>
            <Input
            type="number"
            label="Guests: "
            placeholder="1"
            className="mb-4"
            {...register("guests", {required: true, min: {
                value: 1,
                message: "Max value 1"
              },
              max: {
                value: 10,
                message: "Max value 10"
              }})}/>
            <Input
            type="number"
            label="Beds: "
            placeholder="1"
            className="mb-4"
            {...register("beds", {required: true, min: {
                value: 1,
                message: "Max value 1"
              },
              max: {
                value: 10,
                message: "Max value 10"
              }})}/>
            <Input
            id="bedroom"
            type="number"
            label="Bedrooms: "
            placeholder="1"
            className="mb-4"
            {...register("bedrooms", {required: true, min: {
                value: 1,
                message: "Max value 1"
              },
              max: {
                value: 10,
                message: "Max value 10"
              }})}/>
            <Input
            type="number"
            label="Baths: "
            placeholder="1"
            className="mb-4"
            {...register("baths", {required: true, min: {
                value: 1,
                message: "Max value 1"
              },
              max: {
                value: 10,
                message: "Max value 10"
              }})}/>

            <Input
            type="file"
            multiple
            label="House Images: "
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg"
            {...register("images", {required: !post})}
            />
            {/* <Input
            type="date"
            label="Reserved Till: "
            className="mb-4"
            {...register("reservedTill", {required: false})}
             /> */}
            {post && (
                post.houseImages.map((img) => (
                    <div key={img} className="w-full mb-4">
                        <img src={appwriteService.previewFile(img)} alt={post.title}
                        className="rounded-lg"
                        />
                    </div>
                    )
                )
                )}

            <Button
            type="submit"
            bgColor={post ? "bg-green-500": undefined}
            className="w-full">
                {post ? "Update": "Submit"}
            </Button>
        </form>
      
    </div>
  )
}

export default PostForm
