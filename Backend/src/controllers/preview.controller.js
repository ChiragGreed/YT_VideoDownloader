import axios from 'axios';

const extractVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/);
    return match ? match[1] : url;
};

const previewController = async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: "Url required" });

    try {
        const response = await axios.get('https://ytstream-download-youtube-videos.p.rapidapi.com/dl', {
            params: { id: extractVideoId(url) },
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com'
            }
        });

        const data = response.data;

        // get highest quality thumbnail
        const thumbnail = data.thumbnail[data.thumbnail.length - 1].url;

        res.json({
            title: data.title,
            thumbnail: thumbnail,
            duration: parseInt(data.lengthSeconds),
            uploader: data.channelTitle,
        });

    } catch (err) {
        console.error("Preview error:", err.response?.data || err.message);
        res.status(500).json({ message: "Preview failed" });
    }
};

export default previewController;