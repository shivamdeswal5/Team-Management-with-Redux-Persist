import { createSlice} from "@reduxjs/toolkit";

const initialState ={
  projects:[],
}

const projectSlice = createSlice({
  name: "project",
  initialState : initialState,
  reducers: {
    addProject(state,action:any) {
      state.projects.push(action.payload);     
    },
  }   
});

export const { addProject } =
  projectSlice.actions;
export default projectSlice.reducer;