import React from 'react'
import Logo from '../Logo'
import { Link, useNavigate } from 'react-router'
import Container from '../Container'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Logoutbtn from './Logoutbtn'
function Header() {
  const authstatus = useSelector((state)=> state.auth.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const navitem = [
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Login",
      slug:"/login",
      active: !authstatus
    },
    {
      name: "Singup",
      slug: "/singup",
      active: !authstatus
    },
    {
      name:"Allpost",
      slug:"/allpost",
      active:authstatus
    },
   
    {
      name:"Addpost",
      slug:"/addpost",
      active:authstatus
    }
  ]
  return (
  <header className='py-3 shadow bg-gray-400'>
    <Container>
      <nav className='flex'>
        <div className='flex '>
       <Link to="/">
       <Logo/>
       </Link>
        </div>
      <ul className='flex ml-auto'>
        {navitem.map((item)=>
        item.active?(
          <li key={item.name}>
            <button onClick={()=>navigate(item.slug)} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
          </li>
        ) : null
        )}
        {authstatus&&(<li><Logoutbtn/></li>)}
      </ul>
      </nav>
    </Container>
  </header>
  )
}

export default Header