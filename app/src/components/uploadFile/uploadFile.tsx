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
  onUploadComplete?: () => void;
  onError?: (error: unknown) => void;
}

function ShareFile(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [filename, setFilename] = useState("");

  const classes = useStyles({ ...props, ...theme });
  const handleSetFilename = (e: any) => {
    setFilename(e.target.value);
  };
  function handleSubmit(e: any) {
    if (e.charCode === 13) {
      shareFile();
    }
  }
  useEffect(() => {
    props.setUploadRes(state.fileUploaded);
  }, [state.fileUploaded]);

  const shareFile = async () => {
    const { onUploadComplete, onError } = props;

    try {
      await actions.uploadFile({
        file: props.file,
        filename: filename,
        directory: "root",
        podName: props.podName,
      });
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (e) {
      console.log(e);
      if (onError) {
        onError(e);
      }
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
