import axios from "axios";
import { restCall } from "./restCall";

const fileTypeMapping = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "application/pdf": "pdf",
  "image/gif": "gif",
  "video/mp4": "mp4",
};

const getFileExtension = (blob) => {
  console.log("File Actual Type:", blob);
  return fileTypeMapping[blob.type] || "bin";
};

// Function to fetch a file from a URL and convert it to a Blob
const fetchFileAsBlob = async (fileUrl) => {
  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();
    console.log("Fetched Blob:", blob);
    return blob;
  } catch (error) {
    console.error("Error fetching file as Blob:", error);
    throw error;
  }
};

// Updated uploadFileToS3 function
export const uploadFileToS3 = async (file, filePrefix, username, accessToken) => {
  console.log("File to Upload:", file);

  if (!file) {
    console.error(`${filePrefix} file is missing.`);
    return null;
  }

  const response = await fetch(file); 
  const fileBlob = await response.blob();

  console.log("File Blob:", fileBlob);

  const fileType = (await fileBlob).type;
  const fileExtension = getFileExtension(fileBlob);
  const fileName = `${filePrefix}_${username}_${Date.now()}.${fileExtension}`;

  console.log("Generated Filename:", fileName);

  try {
    const response = await restCall(
      `/portal/generate-presigned-url/?file_name=${fileName}&file_type=${fileType}`,
      "GET",
      {},
      accessToken
    );

    console.log("S3 Response:", response);

    const { url } = response;

    if (url) {
      const uploadResponse = await axios.put(url, fileBlob, {
        headers: {
          "Content-Type": fileType,
        },
      });

      if (uploadResponse.status === 200) {
        console.log(`${filePrefix} uploaded successfully!`);
        return fileName; // Return the file name to save in the database
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