import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./listAllPodsStyles";
import { getPods } from "../../store/services/fairOS";

export interface Props {
  setPod?: any;
}

function ListAllPods(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  return (
    <div
      className={classes.podItem}
      onClick={async () => {
        const res = await getPods();
        props.setPod(res.data.pod_name);
      }}
    >
      List pods
    </div>
  );
}

export default React.memo(ListAllPods);
