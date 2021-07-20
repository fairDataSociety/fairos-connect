import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import FileCard from "../cards/fileCard";
import useStyles from "./listFilesStyles";
export interface Props {
  password: string;
  files: any;
  setFile: any;
  podName: any;
}

function ListFiles(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  useEffect(() => {
    console.log(props.podName);
  });
  return (
    <div className={classes.ListFiles}>
      {props.files.map((file) => (
        <FileCard
          podName={props.podName}
          file={file}
          setFile={props.setFile}
        ></FileCard>
      ))}
    </div>
  );
}

export default React.memo(ListFiles);
