const fs = require("fs");
const xlsx = require("xlsx");
let fileDownlode = async (req, res) => {
  try {
    console.log(req.file.originalname, req.file.path);
    const FileStream = fs.createReadStream(req.file.path);
    //viewing the pdf file without downloade
    if (req.file.originalname.split(".")[1].toLowerCase() == "pdf") {
      res.header("content-type", "application/pdf");
      res.header("content-Disposition", "inline");
      return await FileStream.pipe(res);
    //viewing the text file without downloade
  } else if (req.file.originalname.split(".")[1].toLowerCase() == "txt") {
      res.header("content-type", "application/txt");
      res.header("content-Disposition", "inline");
      return await FileStream.pipe(res);
    //viewing the xlsx  file without downloade
    } else if (req.file.originalname.split(".")[1].toLowerCase() == "xlsx") {
      const workbook = xlsx.readFile(req.file.path);
      const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
      console.log(buffer);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${req.file.originalname}`
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      const newworkbook = xlsx.read(buffer, { type: "buffer" });
      console.log(newworkbook.SheetNames);
      // xlsx.writeFile(newworkbook,"C:/Ahex-tasks/file-versioning/uplodes/sample2.xlsx",{ bookType: 'xlsx', bookSST: false })
      res.send(buffer);
  //viewing the docx file without downloade
    } else if (req.file.originalname.split(".")[1].toLowerCase() == "doc") {
     docxStream =fs.createReadStream(req.file.path)
      res.header("content-type", "application/docx");
      res.header("content-Disposition", "inline");
      return await docxStream.pipe(res);
    }
    else{
      res.status(404).json({"status":"failed","message":"this type of extension is not allowed"})
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error });
  }
};
module.exports = fileDownlode;
