import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      padding: theme.spacing(2),
      flexWrap: "nowrap",
      flexDirection: "column",
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
    unit: {
      marginBottom: theme.spacing(3),
      width: 50,
    },
  })
);

export default useStyles;
