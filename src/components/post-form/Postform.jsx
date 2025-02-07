import React, { useCallback ,useEffect } from 'react'
import { set, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import service from '../../appwrite/authservice'
import Input from '../Input'
import RTE from '../RTE'
import Select from '../Select'
import Button from '../Button'

function Postform({post}) {
    const {register,handleSubmit,watch,control,setValue,getValues}= useForm({
        defaultValues:{
            tittle:post?.tittle ||"",
            slug:post?.slug ||"",
            content:post?.content ||"",
            status:post?.status ||"active"
        }
    })
    const userdata = useSelector((state)=>state.auth.userdata)

    const navigate = useNavigate()
    
    const submit = async(data)=>{
        console.log(data)
       if(post){
        const file = data.image[0]? service.uploadfile(data.image[0]):null
        if(file){
            service.deletefile(post.featureimage)
        }
      const dbpost = await service.updatepost(post.$id,{
        ...data,
        featureimage:file?file.$id :undefined
    })
    if(dbpost){
        navigate(`/post/${dbpost.$id}`)
    }
       }
       else{
        console.log(data.image[0])
         const file = await service.uploadfile(data.image[0])
         
         console.log("file",file)
         if(file){
            const fileid = file.$id
            console.log("userdata",userdata.$id)
            data.featureimage  = fileid
           const dbpost =  await service.createpost({
                ...data,
                userid:userdata.$id  
            })
            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
         }

       }
    }
   const slugTransform = useCallback((value)=>{
    if(value && typeof value=="string"){
        return crypto.randomUUID()
    }
    else{
        return""
    }
   },[])
   useEffect(()=>{
    const subscription = watch((value , {name})=>{
         if(name == "tittle"){
            setValue("slug",slugTransform(value.tittle,{shouldValidate:true}
            ))
         }
         return ()=>{
            subscription.unsubscribe()
         }
    })
   },[watch,slugTransform,setValue])
   return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("tittle", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={service.getfilepreview(post.featuredimage)}
                        alt={post.tittle}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
);
}

export default Postform