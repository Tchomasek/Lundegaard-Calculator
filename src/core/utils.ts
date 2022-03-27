import { useDispatch } from "react-redux";
import axios from "axios";

import { updateCalculatorState } from "./models";
import store from "./store";

export const sendRequest = async (money: number, months: number) => {
  await axios
    .get("/calculator", {
      params: {
        money: money,
        months: months,
      },
    })
    .then((response) => {
      if (typeof Number(response.data) === "number") {
        const roundedResult = Math.round(Number(response.data) * 100) / 100;
        store.dispatch(
          updateCalculatorState({ monthlyPayment: roundedResult as number })
        );
      }
    });
};
