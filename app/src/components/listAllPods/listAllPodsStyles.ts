import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./listAllPods";

const useStyles = makeStyles(() =>
  createStyles({
    podItem: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
    

    },
  })
);

export default useStyles;
