import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import { CButton } from "components/CButton";
import { CInput } from "components/CInput";
import { RootState } from "core/store";
import { sendRequest } from "core/utils";
import { updateCalculatorState } from "core/models/calculator";
import { useDispatch, useSelector } from "react-redux";
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
const STEP_MONEY = 5000;
const INTEREST_RATE = 0.05;

export const Calculator: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { money, months, insurance, monthlyPayment, totalAmount } = useSelector(
    (state: RootState) => state.calculator
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(false);
  const [displayedMoney, setDisplayedMoney] = useState<number>(10000);
  const [displayedMonths, setDisplayedMonths] = useState<number>(24);
  const [moneyError, setMoneyError] = useState<boolean>(false);
  const [moneyErrorMessage, setMoneyErrorMessage] = useState<string>(" ");
  const [monthsError, setMonthsError] = useState<boolean>(false);
  const [monthsErrorMessage, setMonthsErrorMessage] = useState<string>(" ");
  const [monthlyPaymentWithInsurance, setMonthlyPaymentWithInsurance] =
    useState<number>(0);

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

  // When the money input loses focus or is submited by enter, current value gets rounded down to a number divisible by 5000.
  // At the same time if the value is out of range, the nearest allowed value is inserted.
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

  // Same as previous function, only activated by submitting (pressing enter).
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

  const sendMonthsTextInputBlur = async () => {
    if (displayedMonths < MIN_MONTHS) {
      setDisplayedMonths(MIN_MONTHS);
      dispatch(updateCalculatorState({ months: MIN_MONTHS }));
    } else if (displayedMonths > MAX_MONTHS) {
      setDisplayedMonths(MAX_MONTHS);
      dispatch(updateCalculatorState({ months: MAX_MONTHS }));
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

  const adjustInsurance = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateCalculatorState({
        insurance: event.target.value === "true" ? true : false,
      })
    );
  };

  // send request when money or months value changes
  useEffect(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    // this timer will send API call only when user stoped moving with slider for at least half a second
    timer.current = setTimeout(() => {
      setSpinnerIsVisible(true);
      sendRequest(money, months, INTEREST_RATE);
      timer.current = null;
    }, SLIDER_TIMEOUT);
  }, [money, months]);

  // hide spinner when BE answer arrives
  useEffect(() => {
    setSpinnerIsVisible(false);
  }, [monthlyPayment]);

  const x = monthlyPayment.toFixed(2);

  useEffect(() => {
    setMonthlyPaymentWithInsurance(
      insurance
        ? Number(((monthlyPayment as number) + INSURANCE).toFixed(2))
        : Number(monthlyPayment.toFixed(2))
    );
  }, [monthlyPayment, insurance]);

  return (
    <Grid className={classes.root}>
      <Grid container className={classes.inputWrapper}>
        <CInput
          info={"Kolik si chci půjčit"}
          onSubmit={sendMoneyTextInputSubmit}
          value={money}
          min_value={MIN_MONEY}
          max_value={MAX_MONEY}
          step={STEP_MONEY}
          onChangeSlider={adjustMoneySlider}
          marks={MARKS_MONEY}
          error={moneyError}
          helperText={moneyErrorMessage}
          displayedValue={displayedMoney}
          onChangeTextInput={changeMoneyTextInput}
          onBlur={sendMoneyTextInputBlur}
          unit={"Kč"}
        />
        <CInput
          info={"Na jak dlouho"}
          onSubmit={sendMonthsTextInputSubmit}
          value={months}
          min_value={MIN_MONTHS}
          max_value={MAX_MONTHS}
          onChangeSlider={adjustMonthsSlider}
          marks={MARKS_MONTHS}
          error={monthsError}
          helperText={monthsErrorMessage}
          displayedValue={displayedMonths}
          onChangeTextInput={changeMonthsTextInput}
          onBlur={sendMonthsTextInputBlur}
          unit={"Měsíců"}
        />
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
          Úroková sazba <strong>5%</strong>, pojištění{" "}
          <strong>{insurance ? "100" : "0"}Kč/měsíčně</strong>, celkem zaplatíte{" "}
          <strong>
            {spinnerIsVisible
              ? "- "
              : insurance
              ? totalAmount + months * INSURANCE
              : totalAmount}
            Kč
          </strong>
          .
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
                {monthlyPaymentWithInsurance}
                Kč
              </Typography>
            )}
          </Grid>
        </Grid>
        <CButton info={"Pokračovat"} />
      </Grid>
    </Grid>
  );
};
