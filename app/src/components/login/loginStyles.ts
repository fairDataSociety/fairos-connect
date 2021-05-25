import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./login";

const useStyles = makeStyles(() =>
  createStyles({
    flexer: {
      margin: "40px",
    },
    title:{
      alignItems: "left",
      font:(style: Props & Theme) => style.typography.h2,
      color:(style: Props & Theme) => style.textColorMain,
      borderBottom: "1px solid var(--grey)"
    },
    header:{
      padding:"1rem 0 1rem 0",
      font: (style: Props & Theme) => style.typography.p1,
      marginBottom:"2rem"
    },
    dialogBox: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      width: "500px",
      height: "500px",
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
      paddingTop:"3rem",
      overflowX: "hidden",
      overflowY: "auto",
    },
    errormsg: {
      // from bodyBold in Fairdrive:
      fontFamily: 'Work Sans',
      fontWeight: 'bold',
      fontSize: '16px',
      letterSpacing: '0',
      // custom
      color: '#f63333',
      textAlign: 'center',
      margin: "0px 0px 0px 0px",
      lineHeight: '14px',
    },
    
  })
);

export default useStyles;
