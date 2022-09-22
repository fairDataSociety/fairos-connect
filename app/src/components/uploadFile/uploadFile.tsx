import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import ButtonPill from "../buttonPill/buttonPill";
import useStyles from "./uploadFileStyles";
import TextField from "../textField/textField";

export interface Props {
  file: any;
  setUploadRes: any;
  podName: any;
}

function ShareFile(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [filename, setFilename] = useState("");

  const classes = useStyles({ ...props, ...theme });
  
  useEffect(() => {
    props.setUploadRes(state.fileUploaded);
  }, [state.fileUploaded, props]);

  const shareFile = async () => {
    try {
      await actions.uploadFile({
        file: props.file,
        filename: filename,
        directory: "root",
        podName: props.podName,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.NewCard}>
      <div className={classes.Title}>Save file</div>
      <div className={classes.Body}>
        <TextField
          placeholder="File name"
          type="text"
          setProp={setFilename}
          onContinue={shareFile}
        ></TextField>
        <ButtonPill text={"Save file"} clickFunction={shareFile}></ButtonPill>
      </div>
    </div>
  );
}

export default React.memo(ShareFile);
