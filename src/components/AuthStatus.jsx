import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'

 export default function Protecter({children , authentication = true}) {
    const navigate = useNavigate()
    const [loader , setloader] = useState(true)
    const authstatus = useSelector((state)=>state.auth.status)
    console.log(authstatus)
    useEffect(()=>{
      console.log(authstatus)
        if(authentication && authstatus!==authentication){
            navigate("/login")
        }
        else if(!authentication && authstatus!==authentication){
             navigate("/")
        }
        setloader(false)
    },[authstatus,navigate,authentication])
  return loader ? <p>...loading</p>:<>{children}</>
}

