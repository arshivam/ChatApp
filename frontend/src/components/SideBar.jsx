import React,{useState}  from "react";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUsers } from "../redux/userSlice";
function SideBar() {
  const navigate = useNavigate();
  const [search, setSearch] =  useState("");
  const {otherUsers} = useSelector(store=>store.user);
  const dispatch = useDispatch()
  const logoutHandler = async() =>{
    try {
      const res = await axios.get('http://localhost:8080/api/v1/user/logout')
      toast.success(res.data.message)
      dispatch(setAuthUser(null))
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = (e)=>{
    e.preventDefault()
    const conversationUser = otherUsers.find((user)=>user.fullName.toLowerCase().includes(search.toLowerCase()))
    console.log(conversationUser);
    if(conversationUser){
      dispatch(setOtherUsers([conversationUser]))
    }else{
      toast.error("User not found!!!")
    }
  }

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col ">
      <form onSubmit={submitHandler} action="" className="flex items-center gap-2">
        <input
          className="input input-bordered rounded-md"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
        />
        <button type="submit" className="btn  bg-zinc-700 text-white"><FaSearch className="w-6 h-6 outline-none" /></button>
      </form>
      <div className="divider px-2"></div>


      <OtherUsers/>

      <div className="mt-2 ">
        <button onClick={logoutHandler} className="bg-zinc-700 text-white rounded-md btn-sm" type="button">Logout</button>
      </div> 
    </div>
  );
}

export default SideBar;
