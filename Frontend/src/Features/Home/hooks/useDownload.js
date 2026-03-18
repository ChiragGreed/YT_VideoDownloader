import { useContext } from "react";
import { downloadContext } from "../state/download.context.jsx";
import { downloadVideoApi } from "../services/downloadApi.js";

const useDownload = () => {

    const context = useContext(downloadContext);
    const { setLoading, setDownloadUrl, setVideo, setError } = context;

    const downloadHandler = async (url) => {
        setLoading(true);
        setError(null);
        try {
            const response = await downloadVideoApi(url);
            setVideo(response.data);
            setDownloadUrl(response.data.downloadUrl);
        } catch (err) {
            const message = err.response?.data?.message || "Something went wrong. Please try again.";
            setError(message);
            console.error("Download error:", err);
        } finally {
            setLoading(false);
        }
    };

    return { downloadHandler, context };
};

export default useDownload;