import React, { useState } from 'react';
import axios from 'axios';

const FeedbackAnalysis = () => {
    const [feedback, setFeedback] = useState('');
    const [sentiment, setSentiment] = useState('');

    const analyzeFeedback = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/analyze_sentiment', { text: feedback });
            setSentiment(response.data.sentiment);
        } catch (error) {
            console.error("Error analyzing sentiment:", error);
        }
    };

    return (
        <div>
            <h2>Feedback Sentiment Analysis</h2>
            <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter feedback here"
            />
            <button onClick={analyzeFeedback}>Analyze Sentiment</button>
            <p>Sentiment: {sentiment}</p>
        </div>
    );
};

export default FeedbackAnalysis;
