import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector,useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function MessageContainer() {
  const {selectedUser, authUser} = useSelector(store=>store.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    return ()=>{
      dispatch(setSelectedUser(null))
    }
  },[])

  return (
    <>
    {selectedUser !== null ?(
       <div className="md:min-w-[550px] flex flex-col">
       <div className="flex items-center gap-2 rounded-md cursor-pointer px-2 py-2 mb-2 bg-zinc-800 text-white">
         <div className="avatar online">
           <div className="w-12 rounded-full">
             <img
               src={selectedUser?.profilePhoto}
             />
           </div>
         </div>
         <div className="flex flex-col flex-1">
           <div className="flex justify-between gap-2 ">
             <p>{selectedUser?.fullName}</p>
           </div>
         </div>
       </div>
       <Messages/>
       <SendInput/>
     </div>
    ):(
    <div className="md:min-w-[550px] flex flex-col items-center justify-center">
      <h1 className=" text-white font-bold text-2xl">Hi,{authUser?.fullName}</h1>
       <p className=" text-white text-2xl">Lets start conversation</p>
    </div>
   )}
    </>
   
  );
}

export default MessageContainer;
