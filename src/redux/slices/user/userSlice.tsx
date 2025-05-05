import { createSlice,PayloadAction} from "@reduxjs/toolkit";

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
  organization: string
  role: string
}

interface InitialState {
  users: Inputs[],
}

const initialState :InitialState={
  users:[],
}

const userSlice = createSlice({
  name: "user",
  initialState : initialState,
  reducers: {
    addUser(state,action:PayloadAction<Inputs>) {
      state.users.push(action.payload);     
    },
  }   
});

export const { addUser } =
  userSlice.actions;
export default userSlice.reducer;