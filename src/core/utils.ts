import axios from "axios";

import { updateCalculatorState } from "./models";
import store from "./store";

export const sendRequest = async (
  money: number,
  months: number,
  interestRate: number
) => {
  await axios
    .get("/calculator", {
      params: {
        money: money,
        months: months,
        interestRate: interestRate,
      },
    })
    .then((response) => {
      if (typeof Number(response.data) === "number") {
        const roundedMonthlyPayment =
          Math.round(Number(response.data.monthlyPayment) * 100) / 100;
        const roundedTotalAmount =
          Math.round(Number(response.data.totalAmount) * 100) / 100;
        store.dispatch(
          updateCalculatorState({
            monthlyPayment: roundedMonthlyPayment as number,
            totalAmount: roundedTotalAmount as number,
          })
        );
      }
    });
};
