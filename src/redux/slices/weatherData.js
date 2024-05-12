import { createSlice } from "@reduxjs/toolkit";
export const weatherData = createSlice ({
    initialState : null,
    name : "weatherData",
    reducers:{
        saveDataWeather:(state,actions)=>{
            return actions.payload;
        }
    }
});

export const {saveDataWeather} = weatherData.actions;
export default weatherData.reducer;