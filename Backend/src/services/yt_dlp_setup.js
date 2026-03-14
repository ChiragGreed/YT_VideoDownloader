import YTDlpWrapPackage from "yt-dlp-wrap";
import path from "path";
import { fileURLToPath } from "url";

const YTDlpWrap = YTDlpWrapPackage.default || YTDlpWrapPackage;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let ytDlpBinary;

if (process.platform === "win32") {
    ytDlpBinary = path.join(__dirname, "../extensions/yt-dlp.exe");
} else {
    // download linux binary automatically
    ytDlpBinary = await YTDlpWrap.downloadFromGithub();
}

const ytDlpWrap = new YTDlpWrap(ytDlpBinary);

export { ytDlpWrap };