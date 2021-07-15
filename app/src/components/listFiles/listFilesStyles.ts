import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./listFiles";

const useStyles = makeStyles(() =>
  createStyles({
    ListFiles: {
      // we merge Props & Theme interfaces and call this merged object "style".
      //component props and ui theme properties are available on the style object (yay auto-complete!!).
      // backgroundColor: (style: Props & Theme) => style.backgroundDark,

      display: "flex",
      flexDirection: "row",
      justifyItems: "center",
      alignItems: "center",
      overflow: "auto",
      flexWrap: "wrap",
    },
    cardGrid: {
			width: '100%',
			height: '100%',
		},
    grid: {
      display: "flex",
    },
  })
);

export default useStyles;
