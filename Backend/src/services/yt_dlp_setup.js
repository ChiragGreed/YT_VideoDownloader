import YTDlpWrapPackage from "yt-dlp-wrap";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const YTDlpWrap = YTDlpWrapPackage.default || YTDlpWrapPackage;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let ytDlpBinary;

if (process.platform === "win32") {
    ytDlpBinary = path.join(__dirname, "../extensions/yt-dlp.exe");
} else {
    ytDlpBinary = path.join(__dirname, "../extensions/yt-dlp");

    if (!fs.existsSync(ytDlpBinary)) {
        console.log("Downloading yt-dlp binary...");
        fs.mkdirSync(path.dirname(ytDlpBinary), { recursive: true });
        await execAsync(
            `curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ${ytDlpBinary} && chmod +x ${ytDlpBinary}`
        );
        console.log("yt-dlp downloaded successfully");
    }
}

const ytDlpWrap = new YTDlpWrap(ytDlpBinary);

export { ytDlpWrap };