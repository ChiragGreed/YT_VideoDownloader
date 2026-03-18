import { useContext } from "react";
import { downloadContext } from "../state/download.context.jsx";
import { downloadVideoApi } from "../services/downloadApi.js";

const useDownload = () => {

    const context = useContext(downloadContext);
    const { setLoading, setDownloadUrl, setVideo, setError } = context;

    const downloadHandler = async (url) => {
        setLoading(true);
        setError(null); // clear previous error
        try {
            const response = await downloadVideoApi(url);
            if (response.data.message) {
                // backend returned an error message
                setError(response.data.message);
            } else {
                setVideo(response.data);
                setDownloadUrl(response.data.downloadUrl);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error("Download error:", err);
        } finally {
            setLoading(false);
        }
    };

    return { downloadHandler, context };
};

export default useDownload;