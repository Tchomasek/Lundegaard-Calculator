import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CalculatorState {
  money: number;
  months: number;
  insurance: boolean;
  monthlyPayment: number;
  totalAmount: number;
}

const initialState = {
  money: 10000,
  months: 24,
  insurance: true,
  monthlyPayment: 0,
  totalAmount: 0,
} as CalculatorState;

export const calculatorSlice = createSlice({
  name: "[ calculator ]",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Partial<CalculatorState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const updateCalculatorState = calculatorSlice.actions.update;
