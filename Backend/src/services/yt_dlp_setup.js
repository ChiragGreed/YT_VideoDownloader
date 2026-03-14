import YTDlpWrapPackage from "yt-dlp-wrap";
import path from "path";
import { fileURLToPath } from "url";

const YTDlpWrap = YTDlpWrapPackage.default || YTDlpWrapPackage;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ytDlpBinary = path.join(__dirname, "../extensions/yt-dlp.exe");
const ffmpegPath = path.join(__dirname, "../extensions/ffmpeg.exe");

const ytDlpWrap = new YTDlpWrap(ytDlpBinary);

export { ytDlpWrap, ffmpegPath };