import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Protecter from './components/AuthStatus.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Homepage from './pages/Homepage.jsx'
import Loginpage from './pages/Loginpage.jsx'
import Singupage from './pages/Singupage.jsx'
import Addpostpage from './pages/Addpostpage.jsx'
import Allpostpage from './pages/Allpostpage.jsx'
import Editpost from './pages/Editpost.jsx'
import Postpage from './pages/Postpage.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Homepage/>
      },
      {
        path:"/login",
        element:(
          <Protecter authentication={false}>
            <Loginpage/>
          </Protecter>
        )
      },
      {
        path:"/singup",
        element:(
          <Protecter authentication={false}>
            <Singupage/>
          </Protecter>
        )
      },
      {
        path:"/allpost",
        element:(
          <Protecter authentication>
            <Allpostpage />
          </Protecter>
        )
      },
      {
        path:"/addpost",
        element:(
          <Protecter authentication>
            <Addpostpage/>
          </Protecter>
        ),
      },
      {
        path:"/edit-post/:slug",
        element:(
          <Protecter authentication>
            <Editpost/>
          </Protecter>
        )
      },
   {
    path:"/post/:slug",
  element:<Postpage/>,
   }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
