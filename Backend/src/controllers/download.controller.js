import axios from 'axios';

const extractVideoId = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/);
  return match ? match[1] : url;
};

const downloadController = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "Url not found" });

  try {
    const response = await axios.get('https://ytstream-download-youtube-videos.p.rapidapi.com/dl', {
      params: { id: extractVideoId(url) },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com'
      }
    });

    const data = response.data;

    const bestFormat = data.formats
      .filter(f => f.mimeType?.includes('video/mp4'))
      .sort((a, b) => (b.width || 0) - (a.width || 0))[0];

    if (!bestFormat) {
      return res.status(404).json({ message: "No suitable format found" });
    }

    // Stream the video through your server so browser downloads it
    const videoResponse = await axios.get(bestFormat.url, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.youtube.com'
      }
    });

    res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
    res.setHeader('Content-Type', 'video/mp4');

    videoResponse.data.pipe(res);

  } catch (err) {
    console.error("Download error:", err.response?.data || err.message);
    res.status(500).json({ message: "Download failed" });
  }
};

export default downloadController;