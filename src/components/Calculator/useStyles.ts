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
      color: "red",
    },
  })
);

export default useStyles;
