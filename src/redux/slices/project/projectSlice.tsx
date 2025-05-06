import { createSlice,PayloadAction} from "@reduxjs/toolkit";

type Inputs = {
  name: string
  members: string[]
}

interface InitialState {
  projects: Inputs[],
}

const initialState :InitialState={
  projects:[],
}

const projectSlice = createSlice({
  name: "project",
  initialState : initialState,
  reducers: {
    addProject(state,action:PayloadAction<Inputs>) {
      state.projects.push(action.payload);     
    },
  }   
});

export const { addProject } =
  projectSlice.actions;
export default projectSlice.reducer;