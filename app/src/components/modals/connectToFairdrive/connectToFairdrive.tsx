import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import { StoreContext } from "../../../store/store";
import useStyles from "./connectToFairdriveStyles";
import Modal from "../modal/modal";
import TextField from "../../textField/textField";
import { getPods, login } from "../../../store/services/fairOS";

export interface Props {
  setUsername?: any;
  setPassword?: any;
  setPods?: any;
}

function ConnectToFairdrive(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function onLogin() {
    const res = await login({
      username,
      password,
    });
    const podsRes = await getPods();

    props.setPassword(password);
  }
  return (
    <Modal
      heading="Connect to Fairdrive"
      button="Authorize"
      handleClick={onLogin}
    >
      <p className={classes.label}>USERNAME</p>
      <TextField
        placeholder={`Enter here...`}
        setProp={setUsername}
        type="text"
      ></TextField>
      <p className={classes.label}>PASSWORD</p>
      <TextField
        placeholder={`Enter here...`}
        setProp={setPassword}
        type="password"
      ></TextField>
    </Modal>
  );
}

export default React.memo(ConnectToFairdrive);
