const fs = require("fs");
const archiver = require("archiver");
let createArchiver = (req, res) => {
  try{
  //Create an output stream
  const output = fs.createWriteStream(__dirname + "sample.zip");
  //creating archiver
  const aechive = archiver("zip", { zlib: { level: 9 } });
  //Attach event listeners to handle the output stream events
  output.on("close", () => {
    console.log(aechive.pointer() + "toal bytes");
    console.log(
      "Archive has been finalized and the output file descriptor has been closed."
    );
    res
      .status(200)
      .json({
        status: "ok",
        data: {
          "toal bytes": aechive.pointer() + "toal bytes",
          " message ":
            "Archive has been finalized and the output file descriptor has been closed",
        },
      });
  });
  output.on("end", () => {
    console.log("data has been drained ");
  });

  aechive.on("warning", (err) => {
    if (err.code === "ENOENT") {
      console.log("file or directory not found", err.path);
    } else {
      throw err;
    }
  });
  aechive.on("error", (err) => {
    throw err;
  });
  aechive.pipe(output);
  aechive.append(fs.createReadStream(__dirname + "/abc.txt"), {
    name: "abc.txt",
  });
  aechive.append("text content", { name: "names.txt" });
  const bufferdata = Buffer.from("iam a Buffer file");
  aechive.append(bufferdata, { name: "buffertest.txt" });
  aechive.file("file1.txt", { name: "file3.txt" });
  aechive.directory("subdir/", "new-dir");
  aechive.directory("subdir/", false);
  aechive.finalize();
}catch(error){res.status(500).json({"status":"failed", "message":error})}
};
module.exports = createArchiver;
