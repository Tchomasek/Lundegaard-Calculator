import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CalculatorState {
  money: number;
  months: number;
}

const initialState = {
  money: 10000,
  months: 24,
} as CalculatorState;

export const calculatorSlice = createSlice({
  name: "[ calculator ]",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<CalculatorState>) => action.payload,
    update: (state, action: PayloadAction<Partial<CalculatorState>>) => ({
      ...state,
      ...action.payload,
    }),
    reset: () => initialState,
  },
});

export const setCalculatorState = calculatorSlice.actions.set;
export const updateCalculatorState = calculatorSlice.actions.update;
export const resetCalculatorState = calculatorSlice.actions.reset;
