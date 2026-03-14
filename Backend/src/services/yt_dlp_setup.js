import YTDlpWrapPackage from "yt-dlp-wrap";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const YTDlpWrap = YTDlpWrapPackage.default || YTDlpWrapPackage;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let ytDlpBinary;

if (process.platform === "win32") {
    ytDlpBinary = path.join(__dirname, "../extensions/yt-dlp.exe");
} else {
    ytDlpBinary = path.join(__dirname, "../extensions/yt-dlp");
    console.log("Binary path:", ytDlpBinary);
    console.log("Binary exists:", fs.existsSync(ytDlpBinary));
    console.log("__dirname is:", __dirname);
}

const ytDlpWrap = new YTDlpWrap(ytDlpBinary);

export { ytDlpWrap };