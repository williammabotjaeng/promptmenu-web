import axios from "axios";
import { restCall } from "./restCall";

const fileTypeMapping = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "application/pdf": "pdf",
  "image/gif": "gif",
  "video/mp4": "mp4",
};

const getFileExtension = (blob) => {
  return fileTypeMapping[blob.type] || "bin";
};

export const uploadFileToS3 = async (
  file,
  filePrefix,
  username,
  accessToken
) => {
  if (!file) {
    console.error(`${filePrefix} file is missing.`);
    return null;
  }

  const fileType = file.type;
  const fileExtension = getFileExtension(file);
  const fileName = `${filePrefix}_${username}_${Date.now()}.${fileExtension}`;

  try {
    const response = await restCall(
      `/portal/generate-presigned-url/?file_name=${fileName}&file_type=${fileType}`,
      "GET",
      {},
      accessToken
    );

    const { url } = response;

    if (url) {
      const uploadResponse = await axios.put(url, file, {
        headers: {
          "Content-Type": fileType,
        },
      });

      if (uploadResponse.status === 200) {
        console.log(`${filePrefix} uploaded successfully!`);
        return fileName; 
      } else {
        console.error(
          `${filePrefix} upload failed:`,
          uploadResponse.statusText
        );
        return null;
      }
    } else {
      console.error("Failed to get presigned URL");
      return null;
    }
  } catch (error) {
    console.error(`Error uploading ${filePrefix}:`, error);
    return null;
  }
};
