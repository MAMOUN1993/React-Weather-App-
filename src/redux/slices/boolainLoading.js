import { createSlice } from "@reduxjs/toolkit";
export const boolainLoading = createSlice({
    initialState : true,
    name : "showLoadingComp",
    reducers :({
        setStatusLoading:(state ,actions)=>{
            return actions.payload
        }
    })
})
export const {setStatusLoading}=boolainLoading.actions;
export default boolainLoading.reducer;