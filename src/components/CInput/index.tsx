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
import React from "react";

import useStyles from "./useStyles";

export interface CInputProps {
  info: React.ReactNode;
  value: number;
  min_value: number;
  max_value: number;
  onChangeSlider: (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => void;
  marks: {
    value: number;
    label: string;
  }[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: boolean;
  helperText: string;
  step?: number;
  displayedValue: number;
  onChangeTextInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  unit: string;
}

export const CInput: React.FC<CInputProps> = ({
  info,
  value,
  min_value,
  max_value,
  onChangeSlider,
  marks,
  onSubmit,
  error,
  helperText,
  step = 1,
  displayedValue,
  onChangeTextInput,
  onBlur,
  unit,
}: CInputProps) => {
  const classes = useStyles();

  return (
    <Grid data-testid="CInput" container className={classes.row}>
      <Typography variant="h6">{info}</Typography>
      <Grid container className={classes.input}>
        <Slider
          value={value}
          min={min_value}
          max={max_value}
          step={step}
          onChange={onChangeSlider}
          className={classes.slider}
          marks={marks}
        />
        <Grid className={classes.inputWithUnit}>
          <form onSubmit={onSubmit}>
            <TextField
              className={classes.textField}
              variant="outlined"
              error={error}
              helperText={helperText}
              value={displayedValue}
              onChange={onChangeTextInput}
              onBlur={onBlur}
            />
          </form>
          <Typography className={classes.unit}>{unit}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
