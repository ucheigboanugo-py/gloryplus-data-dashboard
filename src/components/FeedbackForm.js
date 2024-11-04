import React, { useState } from 'react';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        attendeeName: '',
        rating: '',
        feedbackText: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Event Name</label>
            <input type="text" onChange={e => setFormData({ ...formData, eventName: e.target.value })} />

            <label>Attendee Name</label>
            <input type="text" onChange={e => setFormData({ ...formData, attendeeName: e.target.value })} />

            <label>Rating</label>
            <input type="number" min="1" max="5" onChange={e => setFormData({ ...formData, rating: e.target.value })} />

            <label>Feedback</label>
            <textarea onChange={e => setFormData({ ...formData, feedbackText: e.target.value })}></textarea>

            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default FeedbackForm;
