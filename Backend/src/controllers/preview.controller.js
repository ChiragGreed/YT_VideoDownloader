import path from "path";
import fs from "fs";
import { ytDlpWrap } from "../services/yt_dlp_setup.js";
import os from "os";

// Write cookies to a temp file once
const cookiesPath = path.join(os.tmpdir(), "yt-cookies.txt");
if (process.env.YOUTUBE_COOKIES && !fs.existsSync(cookiesPath)) {
    fs.writeFileSync(cookiesPath, process.env.YOUTUBE_COOKIES, "utf8");
}

const previewController = async (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "Url required" });
    }

    try {

        // Add cookies if available
       const extraArgs = fs.existsSync(cookiesPath)
    ? ["--cookies", cookiesPath, "--js-runtimes", "node"]
    : ["--js-runtimes", "node"];

        const info = await ytDlpWrap.getVideoInfo([url, ...extraArgs]);

        const formats = info.formats
            .filter(f => f.ext === "mp4" && f.vcodec !== "none")
            .map(f => ({
                format_id: f.format_id,
                quality: f.format_note,
                resolution: f.resolution
            }));

        res.json({
            title: info.title,
            thumbnail: info.thumbnail,
            duration: info.duration,
            uploader: info.uploader,
            formats
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Preview failed" });
    }

};

export default previewController;