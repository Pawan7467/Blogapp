
import { useEffect, useState } from 'react'
import authservice from './appwrite/auth'
import {useDispatch} from 'react-redux'
import { login,logout } from './store/authslice'
import { Header } from './components'
import {Footer} from './components'
import { Outlet } from 'react-router'

function App() {
  const [loading , setloading] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
authservice.getcurrentuser().then((userdata)=>{
  if(userdata){
    dispatch(login({userdata}))
  }
  else{
    dispatch(logout())
  }
})
.finally(()=>setloading(false))
  },[])
 return !loading ?(
   <div className='min-h-screen flex flex-wrap content-between'>
    <div className='w-full block'>
   <Header/>
   <main>
    <Outlet/>
   </main>
   <Footer/>
    </div>
   </div> 
 ): null
}

export default App
