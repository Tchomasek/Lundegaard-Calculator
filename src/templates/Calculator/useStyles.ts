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
      flexDirection: "column",
      width: "80%",
    },
  })
);

export default useStyles;
