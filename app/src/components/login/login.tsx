import React, { useState } from "react";
import ConnectToFairdrive from "../modals/connectToFairdrive/connectToFairdrive";

export interface Props {
  setUserPassword?: any;
  password?: string;
  file?: any;
  setFile?: any;
  setFiles?: any;
  files?: any;
  setUploadRes?: any;
  podName?: any;
  className?: any;
  setPod?: any;
}

function Login(props: Props) {
  const [setUsername] = useState("");

  return (
    <div className={props.className}>
      <ConnectToFairdrive
        setUsername={setUsername}
        setPassword={props.setUserPassword}
      ></ConnectToFairdrive>
    </div>
  );
}

export default React.memo(Login);
