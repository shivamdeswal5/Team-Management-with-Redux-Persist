import { createSlice,PayloadAction} from "@reduxjs/toolkit";

type Inputs = {
  name: string
  lead:string
}

interface InitialState {
  teams: Inputs[],
}

const initialState: InitialState ={
  teams:[],
}

const teamSlice = createSlice({
  name: "team",
  initialState : initialState,
  reducers: {
    addTeam(state,action:PayloadAction<Inputs>) {
      state.teams.push(action.payload);     
    },
  }   
});

export const { addTeam } =
  teamSlice.actions;
export default teamSlice.reducer;