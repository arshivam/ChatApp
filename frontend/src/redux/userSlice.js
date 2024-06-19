import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState:{
    authUser:null,
    otherUsers:null,
    selectedUser:null,
    onlineUsers:null,
  },
  reducers: {
    setAuthUser:(state,action)=>{
        state.authUser = action.payload
    },
    setOtherUsers:(state,action)=>{
      state.otherUsers = action.payload
    },
    setSelectedUser:(state,action)=>{
      state.selectedUser = action.payload
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuthUser, setOtherUsers,setOnlineUsers,setSelectedUser  } = userSlice.actions

export default userSlice.reducer