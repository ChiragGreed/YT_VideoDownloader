import { ytDlpWrap } from "../services/yt_dlp_setup.js";

const previewController = async (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "Url required" });
    }

    try {

        const info = await ytDlpWrap.getVideoInfo(url);

        res.json({
            title: info.title,
            thumbnail: info.thumbnail,
            duration: info.duration,
            uploader: info.uploader
        });

    } catch (err) {

        console.error(err);
        res.status(500).json({ message: "Preview failed" });

    }

};

export default previewController;