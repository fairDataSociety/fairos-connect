import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../store/store";

export interface Props {
  setFiles: any;
  password: any;
  podName: any;
}

function LoadFiles(props: Props) {
  const { state, actions } = useContext(StoreContext);
  async function getDirectory() {
    try {
      console.log(props.podName);
      await actions.getDirectory({
        directory: "root",
        password: props.password,
        podName: props.podName,
      });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (props.setFiles) {
      props.setFiles(state.entries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.entries]);
  return <div onClick={getDirectory}>Load files</div>;
}

export default React.memo(LoadFiles);
