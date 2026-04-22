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

const connectionSlice = createSlice({
  name: "connection",
 initialState: [] as User[],    
  reducers: {
    addConnections: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },

    removeConnections: () => {
      return []; 
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;