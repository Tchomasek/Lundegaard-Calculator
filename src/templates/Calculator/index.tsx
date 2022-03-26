import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
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

const SLIDER_TIMEOUT = 500;
const MIN_MONEY = 10000;
const MAX_MONEY = 1000000;
const MARKS_MONEY = [
  {
    value: 10000,
    label: "10 tis.",
  },
  {
    value: 1000000,
    label: "1 mil.",
  },
];
const MIN_MONTHS = 24;
const MAX_MONTHS = 96;
const MARKS_MONTHS = [
  {
    value: 24,
    label: "24 měsíců",
  },
  {
    value: 96,
    label: "94 měsíců",
  },
];
const INSURANCE = 100;

export const Calculator: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { money, months } = useSelector((state: RootState) => state.calculator);
  const [result, setResult] = useState<number>();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(false);
  const [insurance, setInsurance] = useState<boolean>(false);
  const [resultWithInsurance, setResultWithInsurance] = useState<number>();

  const adjustMoneySlider = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    dispatch(updateCalculatorState({ money: newValue as number }));
  };

  const adjustMoneyText = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (!value) {
      value = "0";
    }
    value.replace(/[^0-9]/, "");
    const numberValue = Number(value);
    if (numberValue <= MAX_MONEY && numberValue >= MIN_MONEY) {
      dispatch(updateCalculatorState({ money: numberValue }));
    }
  };

  const adjustMonthsSlider = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    dispatch(updateCalculatorState({ months: newValue as number }));
  };

  const adjustMonthsText = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (!value) {
      value = "0";
    }
    value.replace(/[^0-9]/, "");
    const numberValue = Number(value);
    if (numberValue <= MAX_MONEY && numberValue >= MIN_MONEY) {
      dispatch(updateCalculatorState({ months: numberValue }));
    }
  };

  const call = async () => {
    await axios
      .get("/calculator", {
        params: {
          money: money,
          months: months,
        },
      })
      .then((response) => {
        if (typeof Number(response.data) === "number") {
          const roundedResult = Math.round(Number(response.data));
          setResult(roundedResult);
        }
      });
  };

  useEffect(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    // this timer will send API call only when user stoped moving with slider for half a second
    timer.current = setTimeout(() => {
      setSpinnerIsVisible(true);
      call();
      timer.current = null;
    }, SLIDER_TIMEOUT);
  }, [money, months]);

  // hide spinner when BE answer arrives
  useEffect(() => {
    setSpinnerIsVisible(false);
  }, [result]);

  const adjustInsurance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInsurance(event.target.value === "true" ? true : false);
  };

  useEffect(() => {
    {
      insurance
        ? setResultWithInsurance((result as number) + INSURANCE)
        : setResultWithInsurance(result);
    }
  }, [insurance, result]);

  return (
    <Grid className={classes.root}>
      <Grid container>
        <Grid container className={classes.row}>
          <Typography>Kolik si chci půjčit</Typography>
          <Grid container className={classes.input}>
            <Slider
              value={money}
              min={MIN_MONEY}
              max={MAX_MONEY}
              step={5000}
              onChange={adjustMoneySlider}
              className={classes.slider}
              marks={MARKS_MONEY}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              value={money}
              onChange={adjustMoneyText}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.row}>
          <Typography>Na jak dlouho</Typography>
          <Grid container className={classes.input}>
            <Slider
              value={months}
              min={MIN_MONTHS}
              max={MAX_MONTHS}
              step={1}
              onChange={adjustMonthsSlider}
              className={classes.slider}
              marks={MARKS_MONTHS}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              value={months}
              onChange={adjustMonthsText}
            />
          </Grid>
        </Grid>
        <FormControl component="fieldset">
          <Typography>Pojištění proti neschopnosti půjčku splácet</Typography>
          <RadioGroup row value={insurance} onChange={adjustInsurance}>
            <FormControlLabel
              value={true}
              control={<Radio color="primary" />}
              label="S pojištěním"
            />
            <FormControlLabel
              value={false}
              control={<Radio color="primary" />}
              label="Bez pojištění"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid container className={classes.result}>
        {spinnerIsVisible ? (
          <CircularProgress />
        ) : (
          <Typography>{resultWithInsurance}</Typography>
        )}
      </Grid>
    </Grid>
  );
};
