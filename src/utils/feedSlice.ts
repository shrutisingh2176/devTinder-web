import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type User = {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  photoUrl: string;
  about: string;
  skills: string[];
  age?: number;
};


const feedSlice = createSlice({
  name: "feed",
  initialState:  [] as User[],   
  reducers: {
    addFeed: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    
    removeUserFromFeed:(state, action: PayloadAction<string>) => {
        return state.filter((user) => user._id !== action.payload);
      
        }
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;