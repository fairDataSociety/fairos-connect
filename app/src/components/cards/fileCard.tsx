import React, { useEffect, useState } from "react";
import CardWrapper from "./cardWrapper/cardWrapper";
import CardHeader from "./cardHeader/cardHeader";
import CardBody from "./cardBody/cardBody";
import { InfoIcon, Folder } from "../../components/icons/icons";
import prettyBytes from "pretty-bytes";
import moment from "moment";
import { filePreview } from "../../store/services/fairOS";
type Sizes = "small" | "regular" | "big";
export interface Props {
  size?: Sizes;
  file: any;
  isDirectory?: boolean;
  setFile?: any;
  podName?: string;
}

function FileCard(props: Props) {
  const { file } = props;

  const [fileSize, setFileSize] = useState("");
  const [fileCreateDate, setFileCreateDate] = useState("");
  // eslint-disable-next-line
  const [fileModDate, setFileModDate] = useState("");
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    file.content_type === "inode/directory"
      ? setIcon(Folder)
      : setIcon(InfoIcon);
    if (file.size) {
      setFileSize(prettyBytes(parseInt(file.size)));
      setFileCreateDate(
        moment.unix(file.creation_time).format("DD/MM/YYYY HH:mm:ss")
      );
      setFileModDate(
        moment.unix(file.modification_time).format("DD/MM/YYYY HH:mm:ss")
      );
    }
  }, [file]);
  const downloadFile = async () => {
    console.log(props.podName);
    debugger;
    const file = await filePreview(
      props.file.name,
      "root",
      props.podName
    ).catch((e) => console.error(e));
    props.setFile(await file.text());
  };


  return (
    <CardWrapper onFileClick={downloadFile}>
      <CardHeader Icon={Icon} heading={file.name} />
      <CardBody
        fileSize={fileSize}
        dateCreated={fileCreateDate}
        isDirectory={props.isDirectory}
      />
    </CardWrapper>
  );
}

export default React.memo(FileCard);
