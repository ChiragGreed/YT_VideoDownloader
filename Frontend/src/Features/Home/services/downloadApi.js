import axios from 'axios'

const api = axios.create({
    baseURL: 'https://yt-videodownloader-chfj.onrender.com/api',
    withCredentials: true
})

export const downloadVideoApi = async (url) => {
    const response = await api.post('/getVideoDets', { url: url });
    return response;
}
