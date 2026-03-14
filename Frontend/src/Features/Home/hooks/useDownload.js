import { useContext } from "react";
import { downloadContext } from "../state/download.context.jsx";
import { downloadVideoApi, VideoDetsApi } from "../services/downloadApi.js";

const useDownload = () => {

    const context = useContext(downloadContext);
    const { setLoading, setVideoBlob, setDownloadUrl, setVideo, Video } = context;

    const downloadHandler = async (url) => {
        setLoading(true);
        try {
            const response = await downloadVideoApi(url);
            const blob = new Blob([response.data], { type: "video/mp4" });
            const objectUrl = window.URL.createObjectURL(blob);
            setDownloadUrl(objectUrl);
            console.log("Download URL created:", objectUrl);
        } catch (err) {
            console.error("Download error:", err);
        } finally {
            setLoading(false);
        }
    };

    const previewHandler = async (url) => {
        setLoading(true);
        try {
            const response = await VideoDetsApi(url);
            setVideo(response.data);
        } catch (err) {
            console.error("Preview error:", err);
        } finally {
            setLoading(false);
        }
    };

    return { downloadHandler, previewHandler, context };
};

export default useDownload;