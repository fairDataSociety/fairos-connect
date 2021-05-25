import React from "react";
import useStyles from "./mainStyles";

import NewFolder from "../../components/newFolder/newFolder";

export interface Props {}

export default function Main(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.Main}>
      {/* <FileCard file={{}} setFile={{}}></FileCard> */}
      {/* <NewFolder></NewFolder> */}
    </div>
  );
}
