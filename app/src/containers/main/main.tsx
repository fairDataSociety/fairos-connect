import React from "react";
import useStyles from "./mainStyles";


export default function Main() {
  const classes = useStyles();
  return <div className={classes.Main}>{/* <Login></Login> */}</div>;
}
