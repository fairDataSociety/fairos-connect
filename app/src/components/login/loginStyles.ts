import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./login";

const useStyles = makeStyles(() =>
  createStyles({
    flexer: {
      margin: "40px",
    },
    title: {
      margin: "20px",
      fontFamily: 'Work Sans',
      fontWeight: 'bold',
      fontSize: '34px',
      letterSpacing: '0',
      lineHeight: '36px',
      marginBottom: '20px',
      color: '#16181D',
      textAlign: 'center',
    },
    dialogBox: {
      backgroundColor: (style: Props & Theme) => style.background1,
      width: "500px",
      height: "500px",
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
    },
    dialogPasswordBox: {
      width: "75vw",
      display: "flex",
      flexDirection: "column",
      placeItems: "center center",
      marginBottom: '40px',
      color:"#16181D",

    },
    dialogPassword: {
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
