import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import Postcard from '../components/Postcard'
import service from '../appwrite/authservice'

function Allpostpage() {
    const [posts , setposts] = useState([])
    useEffect(()=>{
  
      service.getposts([]).then((posts)=>{
        if(posts){
            setposts(posts.documents)
        }
      })
    },[])
  return (
    <div className='w-full py-4'>
        <Container>
            <div className='flex flex-wrap'>
              {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/4'>
                    <Postcard {...post}/>
                </div>
              ))}
            </div>
        </Container>

    </div>
  )
}

export default Allpostpage