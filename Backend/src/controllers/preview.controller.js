import { ytDlpWrap } from "../services/yt_dlp_setup.js";

const previewController = async (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "Url required" });
    }

    try {

        const info = await ytDlpWrap.getVideoInfo(url);

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