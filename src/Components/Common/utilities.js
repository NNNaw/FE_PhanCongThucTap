import { settings } from "../../Commons/Settings";

export const downloadFile = (filePath) => {
  let index = filePath.lastIndexOf("_") - 13;
  filePath = filePath.substr(index);

  console.log(filePath);

  setTimeout(() => {
    const response = {
      file: `${settings.domain}/uploads/${filePath}`,
    };
    // server sent the url to the file!
    // now, let's download:
    window.open(response.file);
    // you could also do:
    // window.location.href = response.file;
  }, 100);
};

