import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./listAllPodsStyles";
import { getPods } from "../../store/services/fairOS";

export interface Props {
  setPod?: any;
}

function ListAllPods(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  return (
    <div
      className={classes.podItem}
      onClick={async () => {
        const res = await getPods();
        props.setPod(res.data.pods);
      }}
    >
      List pods
    </div>
  );
}

export default React.memo(ListAllPods);
