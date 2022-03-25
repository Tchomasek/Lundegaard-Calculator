import {
  Box,
  CircularProgress,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { RootState } from "core/store";
import { updateCalculatorState } from "core/models/calculator";
import useStyles from "./useStyles";

export const Calculator: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const number = useSelector(
    (state: RootState) => state.calculator.number as number
  );
  const [doubledNumber, setDoubledNumber] = useState();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(false);

  const adjustNumberSlider = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    dispatch(updateCalculatorState({ number: newValue as number }));
  };

  const adjustNumberText = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (!value) {
      value = "0";
    }
    value.replace(/[^0-9]/, "");
    const numberValue = Number(value);
    if (numberValue <= 100 && numberValue >= 0) {
      dispatch(updateCalculatorState({ number: numberValue }));
    }
  };

  const call = async () => {
    await axios
      .get("/calculator", {
        params: {
          number: number,
        },
      })
      .then((response) => {
        setDoubledNumber(response.data);
      });
  };

  useEffect(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    // this timer will send API call only after user stoped moving with slider for half a second
    timer.current = setTimeout(() => {
      setSpinnerIsVisible(true);
      call();
      timer.current = null;
    }, 500);
  }, [number]);

  useEffect(() => {
    setSpinnerIsVisible(false);
  }, [doubledNumber]);

  return (
    <Grid className={classes.root}>
      <Slider value={number} onChange={adjustNumberSlider} />
      <TextField value={number} onChange={adjustNumberText} />

      {spinnerIsVisible ? (
        <CircularProgress />
      ) : (
        <Typography>{doubledNumber}</Typography>
      )}
    </Grid>
  );
};
