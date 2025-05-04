import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
    isDarkMode: boolean,
    isSidebarCollapsed : boolean, 
}


const initialState: InitialStateTypes = {
    isDarkMode: false,
    isSidebarCollapsed : true,
}

export const globalSlice = createSlice({
    name:'global',
    initialState,
    reducers:{
        setIsDarkMode: (state, action: PayloadAction<boolean>)=>{
            state.isDarkMode = action.payload;
        },
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>)=>{
            state.isSidebarCollapsed = action.payload;
        }
    }
})

export const { setIsDarkMode, setIsSidebarCollapsed } = globalSlice.actions;

export default globalSlice.reducer