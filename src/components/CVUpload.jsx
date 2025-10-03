import React, { useState } from "react"; // <-- FIX: Ensure React and useState are imported

const CVUpload = ({ onNext, setData, T }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = () => {
        if (!file) return;
        setUploading(true);
        // Simulate file upload and processing time
        setTimeout(() => {
            setData({ name: file.name });
            setUploading(false);
            onNext();
        }, 1500);
    };

    return (
        <div className="cv-upload">
            <h2>{T('upload_cv_title')}</h2>
            <div className="upload-area">
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                {file && <p>{T('selected_file')} {file.name}</p>}
            </div>
            <button className="upload-btn" onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? T('uploading') : T('next_btn')}
            </button>
        </div>
    );
};

export default CVUpload;
