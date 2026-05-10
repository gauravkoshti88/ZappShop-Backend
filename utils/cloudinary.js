import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (fileBuffer, folder = "uploads", resourceType = "auto") => {
  try {
    if (!fileBuffer) return null;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            if (process.env.NODE_ENV === "development") {
              console.error("Cloudinary Error", error);
            }
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Cloudinary Error", error);
    }
    return null;
  }
};


export const deleteFromCloudinary = async (public_id, type = "image") => {
  try {
    const options = {};
    if (type === "video") options.resource_type = "video";
    else if (type === "raw") options.resource_type = "raw";

    const result = await cloudinary.uploader.destroy(public_id, options);
    return result;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Cloudinary Error", error);
    }
    return null;
  }
};
