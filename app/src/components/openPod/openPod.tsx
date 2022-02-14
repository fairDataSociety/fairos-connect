import React from "react";
import { openPod } from "../../store/services/fairOS";

export interface Props {
  password: string;
  podName: string;
}

function BoilerPlate(props: Props) {
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
