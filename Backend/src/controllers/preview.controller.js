const previewController = async (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "Url required" });
    }

    try {
        console.log("Preview requested for:", url);

        const extraArgs = fs.existsSync(cookiesPath)
            ? ["--cookies", cookiesPath, "--js-runtimes", "node"]
            : ["--js-runtimes", "node"];

        console.log("Calling getVideoInfo with args:", extraArgs);

        const info = await ytDlpWrap.getVideoInfo([url, ...extraArgs]);

        console.log("Got video info:", info.title);

        const formats = info.formats
            .filter(f => f.ext === "mp4" && f.vcodec !== "none")
            .map(f => ({
                format_id: f.format_id,
                quality: f.format_note,
                resolution: f.resolution
            }));

        console.log("Formats found:", formats.length);

        res.json({
            title: info.title,
            thumbnail: info.thumbnail,
            duration: info.duration,
            uploader: info.uploader,
            formats
        });

    } catch (err) {
        console.error("Preview error:", err);
        res.status(500).json({ message: "Preview failed", error: err.message });
    }

};