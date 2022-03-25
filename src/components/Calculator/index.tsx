import { Box, Grid, Slider, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { RootState } from "core/store";
import { updateCalculatorState } from "core/models/calculator";
import useStyles from "./useStyles";

export const Calculator: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const number = useSelector(
    (state: RootState) => state.calculator.number as number
  );

  const adjustNumber = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    dispatch(updateCalculatorState({ number: newValue as number }));
  };

  return (
    <Grid className={classes.root}>
      <Slider value={number} onChange={adjustNumber} />
      <TextField value={number} />
    </Grid>
  );
};
