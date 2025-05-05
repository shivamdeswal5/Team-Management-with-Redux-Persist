import { createSlice} from "@reduxjs/toolkit";

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
  organization: string
  role: string
}

const initialState ={
  users:[],
}

const userSlice = createSlice({
  name: "user",
  initialState : initialState,
  reducers: {
    addUser(state,action:any) {
      state.users.push(action.payload);     
    },
  }   
});

export const { addUser } =
  userSlice.actions;
export default userSlice.reducer;