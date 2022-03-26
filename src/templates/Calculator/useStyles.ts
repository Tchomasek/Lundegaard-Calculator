import {
  Theme,
  alpha,
  createStyles,
  darken,
  makeStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      position: "fixed",
      top: "25%",
      left: "10%",
      width: "80%",
      height: "50%",
      padding: theme.spacing(2),
      alignItems: "flex-start",
      border: "1px solid rgba(0, 0, 0, 0.4)",
    },
    row: {
      padding: theme.spacing(2),
      flexWrap: "nowrap",
      flexDirection: "column",
    },
    result: {
      width: 200,
      height: 400,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#2d2ddb",
    },
    slider: {
      margin: theme.spacing(1),
    },
    input: {
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "center",
    },
    textField: {
      margin: theme.spacing(2),
      marginLeft: theme.spacing(4),
    },
  })
);

export default useStyles;
