const ImageKit = require("@imagekit/nodejs");

const imageKit = ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  console.log(process.env.IMAGE_KIT_PRIVATE_KEY);
  const result = await imageKit.files.upload({
    file,
    fileName: "music_" + Date.now(),
  });

  console.log("Res", result);

  return result;
}

module.exports = uploadFile;
