import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      position: "fixed",
      top: "25%",
      left: "20%",
      width: "60%",
      padding: theme.spacing(4),
      alignItems: "flex-start",
      border: "1px solid rgba(0, 0, 0, 0.4)",
      borderRadius: 4,
    },
    row: {
      padding: theme.spacing(2),
      flexWrap: "nowrap",
      flexDirection: "column",
    },
    result: {
      width: theme.spacing(25),
      height: theme.spacing(55),
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "column",
      display: "flex",
      borderRadius: 4,
      borderLeft: "1px solid rgba(0, 0, 0, 0.4)",
      paddingLeft: 16,
    },
    slider: {
      margin: theme.spacing(1),
    },
    input: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "center",
    },
    inputWithUnit: {
      display: "flex",
      alignItems: "center",
    },
    textField: {
      width: theme.spacing(15),
      display: "flex",
      margin: theme.spacing(2),
      marginLeft: theme.spacing(4),
      "& .MuiFormHelperText-root": {
        color: "red",
        margin: 0,
      },
    },
    monthlyPay: {
      height: theme.spacing(12),
    },
    info: {
      paddingTop: theme.spacing(2),
    },
    monthlyPayText: {
      paddingBottom: theme.spacing(1),
    },
    inputWrapper: {
      flexDirection: "column",
    },
    form: {
      color: "red",
    },
    unit: {
      marginBottom: theme.spacing(3),
      width: 50,
    },
  })
);

export default useStyles;
