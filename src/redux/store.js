import { configureStore } from "@reduxjs/toolkit";
import weatherData from "./slices/weatherData";
import boolainLoading from "./slices/boolainLoading";
import  boolainNotefi  from "./slices/notefo";
export const store = configureStore({
    reducer:{
        Data : weatherData ,
        showStatusLoading : boolainLoading,
        shoowStatusNotefi : boolainNotefi
    }
})