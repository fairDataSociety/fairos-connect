import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import CreateNew from "../createNew/createNew";

import useStyles from "./uploadFileStyles";

export interface Props {
  file: any;
  setUploadRes: any;
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
    try {
      await actions.sendFile({
        file: props.file,
        filename: filename,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <CreateNew
        onClick={shareFile}
        setProp={setFilename}
        title="New File"
        label="File Name"
      ></CreateNew>
    </div>
  );
}

export default React.memo(ShareFile);
