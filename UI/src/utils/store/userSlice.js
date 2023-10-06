import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name:'user',
  initialState: {
    userId:'',
    username:'',
    email:'',
    name:'',
    success:false
  },
  reducers:{
    login:(state, action) => {
      const {user, success} = action.payload
      state.userId = user.userId
      state.username = user.username
      state.email = user.email
      state.name = user.name
      state.success = success
    },
    logout:(state) => {
      state.userId = '',
      state.username = ''
      state.email = ''
      state.name = ''
      state.success = !state.success
    }
  }
})


export const {login, logout} = userSlice.actions
export default userSlice.reducer