import { calculatorSlice } from "./models";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    calculator: calculatorSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
