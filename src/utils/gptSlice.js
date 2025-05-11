import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name: "gpt",
    initialState: {
        showGPTSearch:false,
        movieResults:null,
        movieNames:null
    },
    reducers: {
        toggleGPTSearchView: (state) => {
            state.showGPTSearch =!state.showGPTSearch;
        },
        addGPTMovieResults:(state,action)=>{
            const{movieNames,movieResults}=action.payload;
            state.movieResults=movieResults;
            state.movieNames=movieNames;
        }
    },
});

export const { toggleGPTSearchView,addGPTMovieResults } = gptSlice.actions;
export default gptSlice.reducer;