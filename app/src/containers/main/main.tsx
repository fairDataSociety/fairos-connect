import React from "react";
import useStyles from "./mainStyles";

import Login from "../../components/login/login";

export interface Props {}

export default function Main(props: Props) {
  const classes = useStyles();
  return <div className={classes.Main}>{/* <Login></Login> */}</div>;
}
