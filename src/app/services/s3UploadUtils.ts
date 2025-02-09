import axios from "axios";
import { restCall } from "./restCall";


export const uploadFileToS3 = async (file, filePrefix, username, accessToken) => {
    if (!file) {
      console.error(`${filePrefix} file is missing.`);
      return null;
    }
  
    const fileType = file.type;
    const fileExtension = getFileExtension(file);
    const fileName = `${filePrefix}_${username}_${Date.now()}.${fileExtension}`;
  
    try {
      // Get a presigned URL from the backend
      const response = await restCall(
        `/portal/generate-presigned-url/?file_name=${fileName}&file_type=${fileType}`,
        "GET",
        {},
        accessToken
      );
  
      const { url } = response;
  
      if (url) {
        // Upload the file to S3
        const uploadResponse = await axios.put(url, file, {
          headers: {
            "Content-Type": fileType,
          },
        });
  
        if (uploadResponse.status === 200) {
          console.log(`${filePrefix} uploaded successfully!`);
          return fileName; // Return the file name to save in the database
        } else {
          console.error(`${filePrefix} upload failed:`, uploadResponse.statusText);
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