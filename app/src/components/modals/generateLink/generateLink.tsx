import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import CopyToClipboard from "react-copy-to-clipboard";
import useStyles from "./generateLinkStyles";
import Modal from "../modal/modal";
import { Copy } from "../../icons/icons";

type Variants = 'share' | 'refer' 
export interface Props {
  type?: string;
  notifyMessage?: string;
  variant: Variants;
}

function GenerateLink(props: Props) {
  const { theme } = useContext(ThemeContext);
  const [, setCopied] = useState(false);
  const classes = useStyles({ ...props, ...theme });

  const copyHandler = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (

    <Modal
      icon={true}
      heading={props.variant === 'refer' ? "Generate Referral Link" : "Generate Share Link"}
      notifyMessage={props.variant === 'refer' ? "Invite a friend to use FairDrive by using this link" : "Share this Material with a friend via this link"}
    >
      
      <p className={classes.label}>{props.variant === 'refer' ? "Refer a friend" : "Sharing Link"}</p>
      <CopyToClipboard onCopy={copyHandler} text={""}>
        <div className={classes.body}>
          <p>[Pod Share Ref autogenerated]</p>
          <Copy />
        </div>
      </CopyToClipboard>
    </Modal>
  );
}

export default React.memo(GenerateLink);
