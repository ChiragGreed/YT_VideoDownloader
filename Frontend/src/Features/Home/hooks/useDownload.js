import { useContext } from "react";
import { downloadContext } from "../state/download.context.jsx";
import { downloadVideoApi } from "../services/downloadApi.js";

const useDownload = () => {

    const context = useContext(downloadContext);
    const { setLoading, setDownloadUrl, setVideo } = context;

    const downloadHandler = async (url) => {
        setLoading(true);
        try {
            const response = await downloadVideoApi(url);
            setVideo(response.data);
            setDownloadUrl(response.data.downloadUrl);
        } catch (err) {
            console.error("Download error:", err);
        } finally {
            setLoading(false);
        }
    };

    return { downloadHandler, context };
};

export default useDownload;