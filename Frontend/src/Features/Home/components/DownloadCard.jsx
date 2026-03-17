import useDownload from "../hooks/useDownload";
import "../style/DownloadCard.scss";

const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
};

const DownloadCard = () => {
    const { context } = useDownload();
    const { DownloadUrl, Loading, Video } = context;

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = DownloadUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    if (Loading) {
        return (
            <div className="dc-loading">
                <div className="dc-loading__bar">
                    <div className="dc-loading__fill" />
                </div>
                <p className="dc-loading__text">Fetching video info…</p>
            </div>
        );
    }

    if (!DownloadUrl) return null;

    return (
        <div className="dc-wrap">
            <div className="dc-card">
                {/* Thumbnail */}
                <div className="dc-thumb">
                    <img src={Video.thumbnail} alt={Video.title} />
                    <div className="dc-thumb__overlay">
                        <span className="dc-duration">{formatDuration(Video.duration)}</span>
                    </div>
                    <div className="dc-thumb__play">
                        <svg viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.55)" />
                            <path d="M10 8.5l6 3.5-6 3.5V8.5z" fill="white" />
                        </svg>
                    </div>
                </div>

                {/* Info */}
                <div className="dc-info">
                    <div className="dc-info__top">
                        <span className="dc-tag">YouTube</span>
                        <span className="dc-tag dc-tag--dim">MP4</span>
                    </div>

                    <h3 className="dc-title">{Video.title}</h3>

                    <div className="dc-meta">
                        <span className="dc-meta__item">
                            <svg viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M2.5 13c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            {Video.uploader}
                        </span>
                        <span className="dc-meta__dot" />
                        <span className="dc-meta__item">
                            <svg viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M8 5.5V8l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            {formatDuration(Video.duration)}
                        </span>
                    </div>

                    <button onClick={handleDownload} className="dc-btn">
                        <svg className="dc-btn__icon" viewBox="0 0 20 20" fill="none">
                            <path d="M10 3v10M6 9l4 4 4-4M4 17h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Download MP4
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadCard;