import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

function OtherUser({user}) {
  const dispatch = useDispatch()
  const {selectedUser} = useSelector(store=>store.user)
  const selectedUserHandler = (user) =>{
    dispatch(setSelectedUser(user))
  }
  return (
    <>
      <div onClick={()=>selectedUserHandler(user)} className={`${selectedUser?._id == user._id ? 'bg-zinc-200 text-black': ''} flex items-center gap-2 rounded-md cursor-pointer p-2 hover:text-black hover:bg-zinc-200 `}>
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={user?.profilePhoto}
              alt="userprofile"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2 ">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  )
}

export default OtherUser