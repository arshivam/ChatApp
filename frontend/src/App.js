
import SignUp from './components/SignUp';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './components/Login';
import Homepage from './components/Homepage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from "socket.io-client"


const router = createBrowserRouter([
  {
    path: "/",
    element : <Homepage/>
  },
  {
    path: "/signup",
    element : <SignUp/>
  },
  {
    path: "/login",
    element : <Login/>
  },
])

function App() {
  const [socket, setSocket] = useState(null)
  const {authUser} = useSelector(store=>store.user)

 
  useEffect(()=>{
    if (authUser) {
      const socket = io("http://localhost:8080",  {
     
      });
      setSocket(socket);
    }
  },[authUser])

  return (
    <div className="App flex p-4 h-screen justify-center items-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
