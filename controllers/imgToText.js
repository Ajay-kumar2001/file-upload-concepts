const ocrSpaceApi = require("ocr-space-api");
let performOCR = (req, res) => {
  try {
    var options = {
      apikey: process.env.OCR_API_key,
      language: "eng",
      imageFormat: "image/png", // Image Type (Only png)
      isOverlayRequired: true,
    };

    ocrSpaceApi
      .parseImageFromLocalFile(req.file.path, options)
      .then((respons) => {
        let panNumber = /^[A-z0-9]{1,}$/;
        let name = /^[A-Z\s]{1,}$/;
        let dateOfBirth = /^[0-9/]{10,10}/;
        let idname=/^[A-z\s]{1,30}$/
        let group=/^[0OAB][+-][ve]/
        console.log(
          respons.parsedText
            .split("\r\n")
            .filter(
              (item) =>
                panNumber.test(item) ||
                name.test(item) ||
                dateOfBirth.test(item)||
                idname.test(item)||
                group.test(item)
            )
        );
        console.log(
          respons.parsedText
            .split("\r\n")
            .filter(
              (item) =>
                item.includes("Company") ||
                item.includes("Founder") ||
                item.includes("Employees")
            )
        );
        res.status(200).json({ textData: respons.parsedText.split("\r\n") });
        // console.log('ocrParsedResult: \n', parsedResult.ocrParsedResult);
      })
      .catch((err) => {
        res.status(404).json({ status: "failed", message: err });
        console.log("ERROR:", err);
      });
  } catch (re) {
    res.status(500).json({ message: re });
  }
};
module.exports = performOCR;
