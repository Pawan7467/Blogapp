import React from 'react'
import Container from '../components/Container'
import Postcard from '../components/Postcard'
import { useNavigate, useParams } from 'react-router'
import { useState , useEffect } from 'react'
import service from '../appwrite/authservice'
import { Postform } from '../components'
import { set } from 'react-hook-form'
function Editpost() {
    const [post , setpost] = useState(null)
    const navigate = useNavigate()
    const {slug}= useParams()
useEffect(()=>{
    if(slug){
        service.getpost(slug).then((post)=>{
            if(post){
                setpost(post)
            }
        })
    }else{
        navigate("/")
    }
},[slug,navigate])

  return post?(
    <div className='py-8'>
        <Container>
            <Postform post={post}/>
        </Container>
    </div>
  ) : null
}

export default Editpost