import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const downloadContext = createContext();

const DownloadContextProvider = ({ children }) => {

    const [Loading, setLoading] = useState(false);
    const [VideoBlob, setVideoBlob] = useState(null);
    const [DownloadUrl, setDownloadUrl] = useState(null);
    const [Video, setVideo] = useState(null);



    return (
        <downloadContext.Provider value={{ Loading, setLoading, VideoBlob, setVideoBlob, DownloadUrl, setDownloadUrl, Video, setVideo }}>
            {children}
        </downloadContext.Provider>
    )
}

export default DownloadContextProvider
