import { useContext } from "react";
import { downloadContext } from "../state/download.context.jsx";
import { downloadVideoApi, VideoDetsApi } from "../services/downloadApi.js";

const useDownload = () => {

    const context = useContext(downloadContext);
    const { setLoading, setDownloadUrl, setVideo } = context;

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

    const downloadHandler = async (url) => {
        setLoading(true);
        try {
            const response = await downloadVideoApi(url);
            const blob = new Blob([response.data], { type: "video/mp4" });
            const objectUrl = window.URL.createObjectURL(blob);
            setDownloadUrl(objectUrl);
        } catch (err) {
            console.error("Download error:", err);
        } finally {
            setLoading(false);
        }
    };
    
    return { downloadHandler, previewHandler, context };
};

export default useDownload;