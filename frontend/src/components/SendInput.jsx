import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

function Sendmessage() {
  const [message , setMessage] = useState("");
  const {selectedUser} = useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message)
  const dispatch = useDispatch()

  const handleMessageSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`, {message}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
       dispatch(setMessages([...messages, res?.data?.newMessage]))
    } catch (error) {
      console.log(error);
    }
     setMessage("")
  }
  return (
    <form onSubmit={(e)=>{handleMessageSubmit(e)}} className="px-4 my-2" action="">
      <div className="w-full relative">
        <input
          className="border border-zinc-400 p-3 text-sm rounded-lg block w-full bg-gray-600 text-white"
          type="text"
          placeholder="send a message..."
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <button  type="submit" className="absolute top-3 right-1 flex item-center ">
          <IoMdSend size={25} />
        </button>
      </div>
    </form>
  );
}

export default Sendmessage;
