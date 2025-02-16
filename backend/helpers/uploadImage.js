const cloudinary = require('cloudinary').v2;
const fs = require('fs')

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  secure: true
});


const uploadImage = async (imagePath) => {

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };


    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);

      fs.unlink(imagePath)
      
      return result.secure_url;
    } catch (error) {
      console.error(error);
    }
};


module.exports = uploadImage