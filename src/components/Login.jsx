import React from 'react'
import  { useForm } from 'react-hook-form'
import { login as authlogin } from '../store/authslice'
import { Link, useNavigate } from 'react-router'
import Logo from './Logo'
import Input from './Input'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import authservice from '../appwrite/auth'


function Login() {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const [error, seterror] = useState()
     const {register  , handleSubmit} = useForm()

     const login=async(userdata)=>{
      console.log("login",userdata)
         seterror("")
         try {
            const session = await authservice.login(userdata)
            console.log("session",session)
            if(session){
               const userdata = await authservice.getcurrentuser() 
               if(userdata){
                dispatch(authlogin(userdata))
                navigate("/")
               }
            }
         } catch (error) {
            seterror(error)
         }   
     }  
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/singup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error&&<p className='text-red-500 text-xl'>{error}</p>}
        <form onSubmit={handleSubmit(login)}>
         <div className='space-y-5'>
          <Input 
          label="Email : "
          placeholder=" enter your email"
          type="emial"
          {...register("email",{
            required:true,
            validate:{
                matchpatern: (value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||"Email address must be a valid address"
            }
          })}
          />
          <Input
          label="password"
          type="password"
          placeholder="enter ypur password"
          {...register("password",{
            required:"true"
          })}
          />
           <Button
            type='submit'
            className='w-full'
           >
            sing in
           </Button>

         </div>
        </form>
        </div>
        </div>
  )
}

export default Login