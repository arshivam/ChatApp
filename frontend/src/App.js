
import SignUp from './components/SignUp';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './components/Login';
import Homepage from './components/Homepage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';



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
  const dispatch = useDispatch()
  const {authUser} = useSelector(store=>store.user)
  const {socket} = useSelector(store=>store.socket)

 
  useEffect(()=>{
    if (authUser) {
      const socket = io("http://localhost:8080",  {
        query:{
          userId:authUser._id
        }
      });
      dispatch(setSocket(socket))

      socket?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socket.close();
    }else{
      if(socket){
        socket.close();
       dispatch(setSocket(null)) 
      }
    }
  },[authUser])

  return (
    <div className="App flex p-4 h-screen justify-center items-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
