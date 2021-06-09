import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./loginStyles";
import ButtonPill from "../buttonPill/buttonPill";
import TextField from "../textField/textField";
export interface Props {
  setUserPassword?: any;
  password?: string;
  file?: any;
  setFile?: any;
  setFiles?: any;
  files?: any;
  setUploadRes?: any;
  podName?: string;
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
      podName: "Fairdrive",
    });
  }

  return (
    <div className={classes.Login}>
      <div className={classes.header}>
        <div className={classes.title}>Fairdrive Credentials</div>
      </div>

      <TextField
        placeholder="Username"
        type="text"
        setHasError={setHasError}
        setProp={setUsername}
        onContinue={onLogin}
      ></TextField>

      <TextField
        placeholder="Password"
        type="password"
        setHasError={setHasError}
        setProp={setPassword}
        onContinue={onLogin}
      ></TextField>
      <div className={classes.flexer}></div>

      {hasError ? <div className={classes.errormsg}>Could not login.</div> : ""}
      <ButtonPill text={"Login"} clickFunction={onLogin}></ButtonPill>
    </div>
  );
}

export default React.memo(Login);
