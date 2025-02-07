import React from 'react'
import service from '../appwrite/authservice'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
function Postcard({$id , tittle , featureimage}) {
  console.log("postcardid",$id)
  console.log(featureimage)
  const navigate = useNavigate()
  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img className='rounded-xl' src={service.getfilepreview(featureimage)} alt={tittle} />
        </div>
      <h2 className='text-xl text-gray-600'>{tittle}</h2>
    </div>
    </Link>
  )
}

export default Postcard