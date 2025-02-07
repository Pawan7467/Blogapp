import React, { useEffect, useState } from 'react'
import service from '../appwrite/authservice'
import Container from '../components/Container'
import Postcard from '../components/Postcard'
function Homepage() {
    const [posts , setposts] =useState([])
    useEffect(()=>{
        service.getposts().then((posts)=>{
            if(posts){
                console.log(posts.documents)
                setposts(posts.documents)
            }
        })
    },[])
 if(posts.length === 0){
return(
    <div className='w-full'>
        <Container>
            <p>please login</p>
        </Container>

    </div>
)
 }
 else{
    return(
      <div className='w-full py-8'>
            <Container>
            <div className='flex flexwrap'>
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
}

export default Homepage