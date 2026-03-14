const downloadController = async (req, res) => {

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "Url not found" });
  }

  console.log("Download requested for:", url);

  const tempFileName = `download-${Date.now()}.mp4`;
  const outputPath = path.join(__dirname, tempFileName);

  const args = [
    url,
    "--js-runtimes", "node",
    "-f",
    "bestvideo+bestaudio/best",
    "-o",
    outputPath
  ];

  if (fs.existsSync(cookiesPath)) {
    args.push("--cookies", cookiesPath);
    console.log("Using cookies from:", cookiesPath);
  }

  console.log("Starting download with args:", args);

  ytDlpWrap.exec(args)
    .on("close", () => {
      console.log("Download complete, sending file:", outputPath);
      res.download(outputPath, "video.mp4", () => {
        fs.unlink(outputPath, () => { });
      });
    })
    .on("error", (err) => {
      console.error("Download error:", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Download failed", error: err.message });
      }
    });

};