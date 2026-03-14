// GetDownload.jsx — Drop-in replacement (keeps all your hooks/logic intact)
// Requires: no new deps. Fonts loaded via @import in the SCSS below.

import '../style/GetDownload.scss'
import { useState } from "react";
import useDownload from "../hooks/useDownload";

const GetDownload = () => {
    const [url, setUrl] = useState('');
    const [focused, setFocused] = useState(false);
    const { downloadHandler, previewHandler, context } = useDownload();
    const { Loading } = context;

    async function submitHandler(e) {
        e.preventDefault();
        if (url !== '') {
            await previewHandler(url); // first get video info
            await downloadHandler(url); // then download
        }
    }

    const isValidUrl = url.includes('youtube.com') || url.includes('youtu.be');

    return (
        <div className="gd-root">
            <div className="gd-card">
                {/* Top badge */}
                <div className="gd-badge">
                    <span className="gd-badge__dot" />
                    Free · No sign-up
                </div>

                {/* Icon */}
                <div className="gd-icon-wrap">
                    <svg className="gd-yt-icon" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="68" height="48" rx="12" fill="#FF0000" />
                        <path d="M45 24L27 34V14L45 24Z" fill="white" />
                    </svg>
                    <div className="gd-icon-ring" />
                </div>

                {/* Heading */}
                <h1 className="gd-title">
                    YouTube<br />
                    <span className="gd-title__accent">Downloader</span>
                </h1>
                <p className="gd-sub">Paste any YouTube link. Pick your format. Done.</p>

                {/* Form */}
                <form className="gd-form" onSubmit={submitHandler}>
                    <div className={`gd-input-wrap ${focused ? 'gd-input-wrap--focused' : ''} ${isValidUrl ? 'gd-input-wrap--valid' : ''}`}>
                        {/* Link icon */}
                        <svg className="gd-input-icon" viewBox="0 0 20 20" fill="none">
                            <path d="M12.5 7.5L7.5 12.5M8.5 5.5L9.5 4.5C11.16 2.84 13.84 2.84 15.5 4.5C17.16 6.16 17.16 8.84 15.5 10.5L14.5 11.5M5.5 8.5L4.5 9.5C2.84 11.16 2.84 13.84 4.5 15.5C6.16 17.16 8.84 17.16 10.5 15.5L11.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>

                        <input
                            type="text"
                            placeholder="https://youtube.com/watch?v=..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            className="gd-input"
                            autoComplete="off"
                            spellCheck={false}
                        />

                        {/* Clear button */}
                        {url && (
                            <button
                                type="button"
                                className="gd-clear-btn"
                                onClick={() => setUrl('')}
                                aria-label="Clear"
                            >
                                <svg viewBox="0 0 16 16" fill="none">
                                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`gd-btn ${Loading ? 'gd-btn--loading' : ''}`}
                        disabled={Loading || !url}
                    >
                        {Loading ? (
                            <>
                                <span className="gd-spinner" />
                                Processing…
                            </>
                        ) : (
                            <>
                                <svg className="gd-btn-icon" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 3v10M6 9l4 4 4-4M4 17h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Get Download Link
                            </>
                        )}
                    </button>
                </form>

                {/* Format */}
                <div className="gd-formats">
                    <span className="gd-format-chip">MP4 · Full Quality</span>
                </div>

                {/* Footer */}
                <p className="gd-footer">
                    For personal use only · Respect copyright
                </p>
            </div>
        </div>
    );
};

export default GetDownload;