import axios from "axios";
import qs from "querystring";
import FileSaver from "file-saver";
import generateMnemonic from "../helpers/utils";
import urlPath from "../helpers/urlPath";
import makeBlockie from "ethereum-blockies-base64";

interface Payload {
  username?: string;
  password?: string;
  address?: string;
  mnemonic?: string;
  podName?: string;
  podReference?: string;
  file?: File;
  directory?: string;
  files?: FileList;
  path?: string;
}

// const host = "https://fairos.fairdatasociety.org/v1/"
const host = process.env.REACT_APP_FAIROSHOST;
const hostLogin = process.env.REACT_APP_FAIROSHOST_LOGIN
  ? process.env.REACT_APP_FAIROSHOST_LOGIN
  : process.env.REACT_APP_FAIROSHOST;
// const host = "https://fairos.testeron.pro/v1/";
// const host = "http://localhost:9090";
// const host ="https://api.fairos.io/v0/";
const podNameDefault = "Home";

export async function createAccount(payload: Payload) {
  //const {username, password, mnemonic} = payload
  try {
    const response = await axios({
      baseURL: host,
      method: "POST",
      url: "v2/user/signup",
      data: JSON.stringify({
        userName: payload.username,
        password: payload.password,
        mnemonic: payload.mnemonic,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    await createPod({ password: payload.password, podName: "Home" });
    // await createPod({ password: payload.password, podName: "Photos" });

    return response;
  } catch (e) {
    console.log("error on timeout", e);
  }
}

export const login = async (payload: Payload) => {
  try {
    const { username, password } = payload;
    const response = await axios({
      baseURL: hostLogin,
      url: "v2/user/login",
      method: "POST",
      data: {
        userName: username,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    localStorage.setItem("username", username);

    return { res: response };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const importUser = async (payload: Payload) => {
  const response = await axios({
    baseURL: host,
    method: "POST",
    url: "user/import",
    data: {
      userName: payload.username,
      password: payload.password,
      address: payload.address,
    },
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response;
};
export const generateSeedPhrase = async (): Promise<string> => {
  // TODO get seed phrase
  console.log("Creating seed phrase...");
  const res = await generateMnemonic();
  // @ts-ignore
  return res.phrase;
};

export const logOut = async () => {
  try {
    const response = await axios({
      baseURL: host,
      method: "POST",
      url: "v1/user/logout",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const userLoggedIn = async (username: string) => {
  try {
    const requestBody = {
      userName: username,
    };

    const response = await axios({
      baseURL: host,
      method: "GET",
      url: "v1/user/isloggedin",
      data: requestBody,
      params: qs.stringify({ userName: username }, "brackets"),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const isUsernamePresent = async (username: string) => {
  try {
    const requestBody = {
      userName: username,
    };

    const response = await axios({
      baseURL: host,
      method: "GET",
      url: "v2/user/present",
      params: qs.stringify(requestBody, "brackets"),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const exportUser = async () => {
  try {
    const response = await axios({
      baseURL: host,
      method: "POST",
      url: "user/export",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteUser = async (payload: Payload) => {
  try {
    const response = await axios({
      baseURL: host,
      method: "DELETE",
      url: "v2/user/delete",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        password: payload.password,
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const userStats = async () => {
  try {
    const response = await axios({
      baseURL: host,
      method: "GET",
      url: "v1/user/stat",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const imageSrc = makeBlockie(response.data.reference);
    response.data.avatar = imageSrc;

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createPod = async (payload: {
  password: string;
  podName: string;
}): Promise<boolean> => {
  try {
    const { password, podName } = payload;
    await axios({
      baseURL: host,
      method: "POST",
      url: "v1/pod/new",
      headers: {
        "Content-Type": "application/json",
      },
      data: { password: password, podName: podName },
      withCredentials: true,
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const closePod = async (payload: {
  password: string;
  podName: string;
}) => {
  try {
    const { password, podName } = payload;
    const closePod = await axios({
      baseURL: host,
      method: "POST",
      url: "v1/pod/close",
      headers: {
        "Content-Type": "application/json",
      },
      data: { podName: podName, password: password },
      withCredentials: true,
    });

    return closePod;
  } catch (err) {
    return err;
  }
};

export const openPod = async (payload: {
  password: string;
  podName: string;
}) => {
  try {
    const { password, podName } = payload;
    const openPod = await axios({
      baseURL: host,
      method: "POST",
      url: "v1/pod/open",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        podName:
          podName === undefined || podName === null ? podNameDefault : podName,
        password: password,
      },
      withCredentials: true,
    });

    return openPod;
  } catch (err) {
    return err;
  }
};

export const syncPod = async () => {
  try {
    const syncPodRes = await axios({
      baseURL: host,
      method: "POST",
      url: "v1/pod/sync",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return syncPodRes;
  } catch (err) {
    return err;
  }
};
export const sharePod = async (password: string, podName: string) => {
  try {
    const sharePodRes = await axios({
      baseURL: host,
      method: "POST",
      url: "v1/pod/share",
      headers: {
        "Content-Type": "application/json",
      },
      data: { podName: podName, password: password },
      withCredentials: true,
    });

    return sharePodRes?.data?.podSharingReference;
  } catch (err) {
    return err;
  }
};
// eslint-disable-next-line
export const deletePod = async (podName: string) => {
  try {
    const deletePodRes = await axios({
      baseURL: host,
      method: "DELETE",
      url: "v1/pod/delete",
      headers: {
        "Content-Type": "application/json",
      },
      data: { podName },
      withCredentials: true,
    });

    return deletePodRes;
  } catch (err) {
    return err;
  }
};

export const getPods = async () => {
  const podResult = await axios({
    baseURL: host,
    method: "GET",
    url: "v1/pod/ls",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return podResult;
};

export const getPodStats = async (payload: Payload) => {
  try {
    const deletePodRes = await axios({
      baseURL: host,
      method: "GET",
      url: "v1/pod/stat",
      params: qs.stringify({ podName: payload.podName }, "brackets"),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return deletePodRes;
  } catch (err) {
    return err;
  }
};
export const showReceivedPodInfo = async (payload: Payload) => {
  const podResult = await axios({
    baseURL: host,
    method: "GET",
    url: "v1/pod/receiveinfo",
    params: qs.stringify({ reference: payload.podReference }, "brackets"),
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return podResult;
};

interface ReceivePayload {
  podReference: string;
  pod_name: string;
}
export const receivePod = async (payload: ReceivePayload) => {
  const podResult = await axios({
    baseURL: host,
    method: "GET",
    url: "v1/pod/receive",
    params: { reference: payload.podReference, podName: payload.pod_name },
    data: { reference: payload.podReference, podName: payload.pod_name },
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return podResult;
};

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const fileUpload = (
  payload: Payload,
  onUploadProgress: (request: string, progressEvent, cancelFn) => void
) => {
  const requestId = makeid(6);

  const { files, file, directory, podName } = payload;
  // const newPath = writePath(path);
  let writePath = "";
  if (directory === "root") {
    writePath = "/";
  } else {
    writePath = "/" + urlPath(directory);
  }

  let items = [];
  if (files && files.length > 0) {
    items = [...Array.from(files)];
  } else {
    items = [file];
  }
  const formData = new FormData();
  items.forEach((file) => {
    formData.append("files", file);
  });

  formData.append("dirPath", writePath);
  formData.append("blockSize", "64Mb");
  formData.append("podName", podName);

  const cancelFn = axios.CancelToken.source();

  const uploadRequest = axios({
    baseURL: host,

    method: "POST",
    url: "v1/file/upload",
    onUploadProgress: (progressEvent) => {
      onUploadProgress && onUploadProgress(requestId, progressEvent, cancelFn);
    },
    data: formData,
    cancelToken: cancelFn.token,
    headers: {
      "Content-type": "multiple/form-data",
    },
    withCredentials: true,
  });

  return {
    uploadRequest,
    cancelFn,
    requestId,
  };
};

export const fileDownload = async (
  filename: string,
  directory: string,
  podName: string
) => {
  try {
    let writePath = "";
    if (directory === "root") {
      writePath = "/";
    } else {
      writePath = "/" + urlPath(directory) + "/";
    }
    const formData = new FormData();
    formData.append("filePath", writePath + filename);
    formData.append("podName", podName);

    const downloadFile = await axios({
      baseURL: host,
      method: "POST",
      url: "v1/file/download",
      data: formData,
      responseType: "blob",
      withCredentials: true,
    });

    FileSaver.saveAs(downloadFile.data, filename);

    //const blob = new Blob(downloadFile.data)
    return downloadFile;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const filePreview = async (
  file: string,
  directory: string,
  podName: string
) => {
  try {
    let writePath = "";
    if (directory === "root") {
      writePath = "/";
    } else {
      writePath = "/" + urlPath(directory) + "/";
    }

    const formData = new FormData();
    formData.append("filePath", writePath + file);
    formData.append("podName", podName);

    const downloadFile = await axios({
      baseURL: host,
      method: "POST",
      url: "v1/file/download",
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
      withCredentials: true,
    });

    return downloadFile.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDirectory = async (payload: Payload) => {
  const { directory, podName } = payload;
  try {
    // const openPod = await axios({
    //   baseURL: host,
    //   method: "POST",
    //   url: "pod/open",
    //   // add pod as function parameter
    //   data: qs.stringify({ password: password, pod: "Fairdrive"}),
    //   withCredentials: true,
    // });
    const pod_name =
      podName === undefined || podName === null ? podNameDefault : podName;
    let data = { dirPath: "", podName: pod_name };

    if (directory === "root") {
      data = {
        dirPath: "/",
        podName: pod_name,
      };
    } else {
      data = {
        dirPath: "/" + directory,
        podName: pod_name,
      };
    }
    const response = await axios({
      baseURL: host,
      method: "GET",
      url: "v1/dir/ls",
      params: data,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export async function createDirectory(
  directory: string,
  directoryName: string,
  podName: string
): Promise<boolean> {
  // Dir = "/" + path + "/"
  let data = { dirPath: "" };

  if (directory === "root") {
    data = {
      dirPath: "/" + directoryName,
    };
  } else {
    data = {
      dirPath: "/" + directory + "/" + directoryName,
    };
  }
  try {
    // eslint-disable-next-line
    const createDirectory = await axios({
      baseURL: host,
      method: "POST",
      url: "v1/dir/mkdir",
      data: JSON.stringify({
        dirPath: data.dirPath,
        dirName: directoryName,
        podName: podName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return true;
  } catch (error) {
    return error;
  }
}

export const deleteFile = async (payload: {
  file_name: string;
  podName: string;
  path: string;
}) => {
  try {
    const { file_name, podName, path } = payload;

    await axios({
      baseURL: host,
      method: "DELETE",
      url: "v1/file/delete",
      data: {
        podName: podName,
        filePath: `${path}${file_name}`,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return true;
  } catch (error) {
    return error;
  }
};

export const deleteFolder = async (payload: Payload) => {
  try {
    // eslint-disable-next-line
    const { podName, path } = payload;

    await axios({
      baseURL: host,
      method: "DELETE",
      url: "v1/dir/rmdir",
      data: {
        podName: podName,
        dirPath: path,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return true;
  } catch (error) {
    return error;
  }
};

export const shareFile = async (
  fileName: string,
  path_file: string,
  podName: string
) => {
  try {
    const shareFileResult = await axios({
      baseURL: host,
      method: "POST",
      url: "v1/file/share",
      data: {
        file: fileName,
        destUser: "anon",
        filePath: path_file + fileName,
        podName,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return shareFileResult?.data?.fileSharingReference;
  } catch (error) {
    return error;
  }
};

export const receiveFileInfo = async (
  reference: string,
  podName: string,
  directory: string
) => {
  try {
    let data = { dirPath: "", podName, sharingRef: reference };
    if (directory === "root") {
      data = {
        dirPath: "/",
        podName: podName,
        sharingRef: reference,
      };
    } else {
      data = {
        dirPath: "/" + directory,
        podName: podName,
        sharingRef: reference,
      };
    }
    const shareFileInfoResult = await axios({
      baseURL: host,
      method: "GET",
      url: "v1/file/receive",
      params: data,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return shareFileInfoResult.data;
  } catch (error) {
    return error;
  }
};
