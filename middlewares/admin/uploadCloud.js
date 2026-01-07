//  cloud
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: "dcoujkven",
  api_key: "558121248779264",
  api_secret: "YnRpvuwz74HVJesDSjkG41CaifE", // Click 'View API Keys' above to copy your API secret
});
// end  cloud

module.exports.upload = (req, res, next) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result);
      // console.log(req.file);
      req.body[req.file.fieldname] = result.secure_url;
      next();
    }
    upload(req);
  } else {
    next();
  }
};
