import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { ytDlpWrap, ffmpegPath } from "../services/yt_dlp_setup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadController = async (req, res) => {

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "Url not found" });
  }

  const tempFileName = `download-${Date.now()}.mp4`;
  const outputPath = path.join(__dirname, tempFileName);

  ytDlpWrap.exec([
    url,
    "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
    "--ffmpeg-location", ffmpegPath,
    "-o", outputPath
  ])
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