import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./loadFilesStyles";
import ButtonPill from "../buttonPill/buttonPill";

export interface Props {
  setFiles: any;
  password: any;
}

function LoadFiles(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  async function getDirectory() {
    try {
      await actions.getDirectory({
        directory: "root",
        password: props.password,
      });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (props.setFiles) {
      props.setFiles(state.entries);
    }
  }, [state.entries]);
  return <div onClick={getDirectory}>Load files</div>;
}

export default React.memo(LoadFiles);
