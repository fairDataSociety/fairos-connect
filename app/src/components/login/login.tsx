import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./loginStyles";
import ConnectToFairdrive from "../modals/connectToFairdrive/connectToFairdrive";

export interface Props {
  setUserPassword?: any;
  password?: string;
  file?: any;
  setFile?: any;
  setFiles?: any;
  files?: any;
  setUploadRes?: any;
  podName?: string;
  className?: any;
  setPod?: any;
}

function Login(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [hasError, setHasError] = useState(false);
  const handleSetUsername = (e: any) => {
    setUsername(e.target.value);
    setHasError(false);
  };

  const handleSetPassword = (e: any) => {
    setPassword(e.target.value);
    setHasError(false);
  };

  function handleSubmit(e: any) {
    if (e.charCode === 13) {
      onLogin();
    }
  }

  //add UseEffect when state changes to reload it and store it
  useEffect(() => {
    if (props) {
      props.setUserPassword(password);
    }
  }, [state.userData]);

  async function onLogin() {
    await actions.userLogin({
      username,
      password,
      podName: "Home",
    });
    actions.getPods();
  }

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
