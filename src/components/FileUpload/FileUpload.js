// FileUpload.js
import React, { useState } from 'react';

function FileUpload() {
    const [fileType, setFileType] = useState("attendance");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    const handleFileTypeChange = (event) => {
        setFileType(event.target.value);
        setError(""); // Clear any existing error when file type changes
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "text/csv") {
            setFile(selectedFile);
            setError("");
        } else {
            setError("Please upload a valid CSV file.");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!file) {
            setError("Please select a CSV file to upload.");
            return;
        }

        // Custom validation based on selected file type
        const expectedHeaders = {
            attendance: ["Member ID", "Name", "Date", "Status", "Branch"],
            social_media: ["Member ID", "Name", "Platform", "Handle", "Engagement Score"],
            members: ["Member ID", "First Name", "Last Name", "Email", "Phone", "Address", "Membership Date"],
            visitors: ["Visitor ID", "First Name", "Last Name", "Visit Date", "Referral Source", "Contact"],
            events: ["Event ID", "Event Name", "Date", "Location", "Attendees Count"],
            followup: ["Follow-up ID", "Member ID", "Date", "Contact Method", "Notes"],
            secondtimers: ["Visitor ID", "First Name", "Last Name", "Second Visit Date", "Referral Source", "Contact"],
            branch: ["Branch ID", "Branch Name", "Location", "Leader Name", "Contact"]
        };

        const reader = new FileReader();
        reader.onload = (e) => {
            const csvData = e.target.result;
            const [headers] = csvData.split("\n");

            const uploadedHeaders = headers.trim().split(",");
            const requiredHeaders = expectedHeaders[fileType];

            const isValid = requiredHeaders.every((header, index) => header === uploadedHeaders[index]);

            if (!isValid) {
                setError(`Invalid CSV format for ${fileType}. Expected headers: ${requiredHeaders.join(", ")}`);
                return;
            }

            // Process the CSV file here
            console.log("File uploaded successfully:", file);
            setError(""); // Clear error on successful upload
        };

        reader.readAsText(file);
    };

    return (
        <div className="file-upload">
            <h2>Upload a CSV</h2>
            <label>Select file type:</label>
            <select value={fileType} onChange={handleFileTypeChange}>
                <option value="attendance">Attendance</option>
                <option value="social_media">Social Media</option>
                <option value="members">Members</option>
                <option value="visitors">Visitors</option>
                <option value="events">Events</option>
                <option value="followup">Follow-Up</option>
                <option value="secondtimers">Second Timers</option>
                <option value="branch">Branch</option>
            </select>

            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Submit</button>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default FileUpload;
