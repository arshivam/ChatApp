import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState:{
    authUser:null,
    otherUsers:null,
    selectedUser:null,
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
  },
})

// Action creators are generated for each case reducer function
export const { setAuthUser, setOtherUsers,setSelectedUser  } = userSlice.actions

export default userSlice.reducer