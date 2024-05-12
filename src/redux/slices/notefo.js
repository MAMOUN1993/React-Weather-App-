import { createSlice } from "@reduxjs/toolkit";

export const boolainNotefi = createSlice({
    initialState : [false,""],
    name : "shownotifi",
    reducers:({
        setStatusNotefi :(state , actions)=>{
            return actions.payload
        }
    })
})

export const {setStatusNotefi} = boolainNotefi.actions;
export default boolainNotefi.reducer;