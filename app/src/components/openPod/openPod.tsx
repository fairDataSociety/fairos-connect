import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./openPodStyles";
import { openPod } from "../../store/services/fairOS";

export interface Props {
  password: string;
  podName: string;
}

function BoilerPlate(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const { password, podName } = props;
  return (
    <label
      onClick={async () => {
        await openPod({ password, podName });
      }}
    >
      {podName}
    </label>
  );
}

export default React.memo(BoilerPlate);
