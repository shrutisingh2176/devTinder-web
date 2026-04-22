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
};

type Request = {
  _id: string;
  fromUserId:any ; 
};

const requestSlice = createSlice({
  name: "request",
 initialState: [] as Request[],    
  reducers: {
    addRequests: (state, action: PayloadAction<Request[]>) => {
      return action.payload;
    },

    removeRequests: (state, action: PayloadAction<string>) => {
      return state.filter((req) => req._id !== action.payload);
    },
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;

export default requestSlice.reducer;