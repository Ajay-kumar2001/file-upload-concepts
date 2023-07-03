const tesseract = require("node-tesseract-ocr");
let imgTotext = async (req, res) => {
  let config = {
    lang: "eng",
    oem: 1,
    psm: 4,
  };
  const image = await tesseract.recognize(req.file.path, config);
  console.log("Result: ", image);
};
module.exports = imgTotext;
