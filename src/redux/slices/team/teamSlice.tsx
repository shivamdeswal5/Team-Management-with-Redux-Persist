import { createSlice} from "@reduxjs/toolkit";

const initialState ={
  teams:[],
}

const teamSlice = createSlice({
  name: "team",
  initialState : initialState,
  reducers: {
    addTeam(state,action:any) {
      state.teams.push(action.payload);     
    },
  }   
});

export const { addTeam } =
  teamSlice.actions;
export default teamSlice.reducer;