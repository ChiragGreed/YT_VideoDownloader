import YTDlpWrapPackage from "yt-dlp-wrap";
import path from "path";
import { fileURLToPath } from "url";

const YTDlpWrap = YTDlpWrapPackage.default || YTDlpWrapPackage;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let ytDlpBinary;

// Detect OS
if (process.platform === "win32") {
    ytDlpBinary = path.join(__dirname, "../extensions/yt-dlp.exe");
} else {
    ytDlpBinary = "yt-dlp"; // Linux uses global binary
}

const ytDlpWrap = new YTDlpWrap(ytDlpBinary);

export { ytDlpWrap };