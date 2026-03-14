import path from "path";
import fs from "fs";
import { ytDlpWrap } from "../services/yt_dlp_setup.js";
import { fileURLToPath } from "url";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Write cookies to a temp file once
const cookiesPath = path.join(os.tmpdir(), "yt-cookies.txt");
if (process.env.YOUTUBE_COOKIES && !fs.existsSync(cookiesPath)) {
  fs.writeFileSync(cookiesPath, process.env.YOUTUBE_COOKIES, "utf8");
}

const downloadController = async (req, res) => {

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "Url not found" });
  }

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

  // Add cookies if available
  if (fs.existsSync(cookiesPath)) {
    args.push("--cookies", cookiesPath);
  }

  ytDlpWrap.exec(args)
    .on("close", () => {
      res.download(outputPath, "video.mp4", () => {
        fs.unlink(outputPath, () => { });
      });
    })
    .on("error", (err) => {
      console.error(err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Download failed" });
      }
    });

};

export default downloadController;