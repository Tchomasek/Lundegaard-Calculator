import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
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
    label: "96 měsíců",
  },
];
const INSURANCE = 100;

export const Calculator: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { money, months, insurance } = useSelector(
    (state: RootState) => state.calculator
  );
  const [result, setResult] = useState<number>();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(false);
  const [displayedMoney, setDisplayedMoney] = useState<number>(10000);
  const [displayedMonths, setDisplayedMonths] = useState<number>(24);
  const [moneyError, setMoneyError] = useState<boolean>(false);
  const [moneyErrorMessage, setMoneyErrorMessage] = useState<string>(" ");
  const [monthsError, setMonthsError] = useState<boolean>(false);
  const [monthsErrorMessage, setMonthsErrorMessage] = useState<string>(" ");

  const sendRequest = async () => {
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
          setResult(roundedResult);
        }
      });
  };

  const adjustMoneySlider = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    dispatch(updateCalculatorState({ money: newValue as number }));
    setDisplayedMoney(newValue as number);
    setMoneyError(false);
    setMoneyErrorMessage(" ");
  };

  const changeMoneyTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (!value) {
      value = "0";
    }
    // remove letters
    value = value.replace(/[^0-9]/, "");
    const numberValue = Number(value);
    setDisplayedMoney(numberValue);
    if (numberValue <= MAX_MONEY && numberValue >= MIN_MONEY) {
      dispatch(updateCalculatorState({ money: numberValue }));
      setMoneyError(false);
      setMoneyErrorMessage(" ");
    } else {
      setMoneyError(true);
      if (numberValue < MIN_MONEY) {
        setMoneyErrorMessage("Příliš nízká částka");
      } else if (numberValue > MAX_MONEY) {
        setMoneyErrorMessage("Příliš vysoká částka");
      }
    }
  };

  const sendMoneyTextInputBlur = () => {
    if (displayedMoney < MIN_MONEY) {
      setDisplayedMoney(MIN_MONEY);
      dispatch(updateCalculatorState({ money: MIN_MONEY }));
    } else if (displayedMoney > MAX_MONEY) {
      setDisplayedMoney(MAX_MONEY);
      dispatch(updateCalculatorState({ money: MAX_MONEY }));
    } else {
      const roundedMoney = Math.floor(displayedMoney / 5000) * 5000;
      dispatch(updateCalculatorState({ money: roundedMoney }));
      setDisplayedMoney(roundedMoney);
    }
    setMoneyError(false);
    setMoneyErrorMessage(" ");
  };

  const sendMoneyTextInputSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    sendMoneyTextInputBlur();
  };

  const adjustMonthsSlider = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    dispatch(updateCalculatorState({ months: newValue as number }));
    setDisplayedMonths(newValue as number);
    setMonthsError(false);
    setMonthsErrorMessage(" ");
  };

  const changeMonthsTextInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    if (!value) {
      value = "0";
    }
    // remove letters
    value = value.replace(/[^0-9]/, "");
    const numberValue = Number(value);
    setDisplayedMonths(numberValue);
    if (numberValue <= MAX_MONTHS && numberValue >= MIN_MONTHS) {
      dispatch(updateCalculatorState({ months: numberValue }));
    } else {
      setMonthsError(true);
      if (numberValue < MIN_MONTHS) {
        setMonthsErrorMessage("Příliš krátká doba");
      } else if (numberValue > MAX_MONTHS) {
        setMonthsErrorMessage("Příliš dlouhá doba");
      }
    }
  };

  const sendMonthsTextInputBlur = () => {
    if (displayedMonths < MIN_MONTHS) {
      setDisplayedMonths(MIN_MONTHS);
      dispatch(updateCalculatorState({ months: MIN_MONTHS }));
      sendRequest();
    } else if (displayedMonths > MAX_MONTHS) {
      setDisplayedMonths(MAX_MONTHS);
      dispatch(updateCalculatorState({ months: MAX_MONTHS }));
      sendRequest();
    } else {
      dispatch(updateCalculatorState({ months: displayedMonths }));
      setDisplayedMonths(displayedMonths);
    }
    setMonthsError(false);
    setMonthsErrorMessage(" ");
  };

  const sendMonthsTextInputSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    sendMonthsTextInputBlur();
  };

  useEffect(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    // this timer will send API call only when user stoped moving with slider for at least half a second
    timer.current = setTimeout(() => {
      setSpinnerIsVisible(true);
      sendRequest();
      timer.current = null;
    }, SLIDER_TIMEOUT);
  }, [money, months]);

  // hide spinner when BE answer arrives
  useEffect(() => {
    setSpinnerIsVisible(false);
  }, [result]);

  const adjustInsurance = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateCalculatorState({
        insurance: event.target.value === "true" ? true : false,
      })
    );
  };

  return (
    <Grid className={classes.root}>
      <Grid container className={classes.inputWrapper}>
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
            <Grid className={classes.inputWithUnit}>
              <form onSubmit={sendMoneyTextInputSubmit}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  error={moneyError}
                  helperText={moneyErrorMessage}
                  value={displayedMoney}
                  onChange={changeMoneyTextInput}
                  onBlur={sendMoneyTextInputBlur}
                />
              </form>
              <Typography className={classes.unit}>Kč</Typography>
            </Grid>
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
            <Grid className={classes.inputWithUnit}>
              <form
                onSubmit={sendMonthsTextInputSubmit}
                className={classes.form}
              >
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  value={displayedMonths}
                  error={monthsError}
                  helperText={monthsErrorMessage}
                  onChange={changeMonthsTextInput}
                  onBlur={sendMonthsTextInputBlur}
                />
              </form>
              <Typography className={classes.unit}>Měsíců</Typography>
            </Grid>
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
        <Typography className={classes.info}>
          Jelikož je půjčování peněz naším koníčkem, nebudeme Vám účtovat žádné
          úroky.
        </Typography>
      </Grid>
      <Grid container classes={{ root: classes.result }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography className={classes.monthlyPayText}>
            Měsíčně zaplatíte:
          </Typography>
          <Grid className={classes.monthlyPay}>
            {spinnerIsVisible ? (
              <CircularProgress />
            ) : (
              <Typography>
                {insurance ? (result as number) + INSURANCE : result} Kč
              </Typography>
            )}
          </Grid>
        </Grid>
        <Button variant="contained" color="primary">
          Pokračovat
        </Button>
      </Grid>
    </Grid>
  );
};
