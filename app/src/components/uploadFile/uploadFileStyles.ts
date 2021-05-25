import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./uploadFile";

const useStyles = makeStyles(() =>
  createStyles({
    dialogBox: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      width: "70rem",
      height: "20rem",
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
      padding:"2rem",
      marginBottom:"2rem"
    },
    title: {
      alignItems: "left",
      font:(style: Props & Theme) => style.typography.h2,
      color:(style: Props & Theme) => style.textColorMain,
      borderBottom: "1px solid var(--grey)",
      marginBottom:"2rem"
    },
    dialogText: {
      // from bodyDefault in Fairdrive:
      fontFamily: 'Work Sans',
      fontWeight: 'normal', //TODO can this be thinner???
      fontSize: '20px',
      letterSpacing: '0',
      lineHeight: '19px',
      // custom
      width: "205px",
      textAlign: 'left',
      paddingBottom: '5px',
      border: "0px",
      borderBottom: "1px solid #16181D",
      backgroundColor: "transparent",
      color:"#16181D",
      outline: 'none',
    },
  })
);

export default useStyles;
