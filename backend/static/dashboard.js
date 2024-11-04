// Fetch attendance predictions and render chart
fetch('/predict_attendance')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('attendanceChart').getContext('2d');
        const attendanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => item.ds),
                datasets: [{
                    label: 'Predicted Attendance',
                    data: data.map(item => item.yhat),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                scales: { x: { type: 'time' } }
            }
        });
    });

// Fetch feedback sentiment and render chart
fetch('/analyze_sentiment')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('feedbackSentimentChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [{
                    label: 'Feedback Sentiment',
                    data: [data.positive, data.negative, data.neutral],
                    backgroundColor: ['#4CAF50', '#FF5252', '#FFCA28']
                }]
            }
        });
    });

// Fetch social media sentiment data
fetch('/social_media_analysis')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('socialMediaSentimentChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [{
                    data: [data.positive, data.negative, data.neutral],
                    backgroundColor: ['#4CAF50', '#FF5252', '#FFCA28']
                }]
            }
        });
    });

// Fetch follower location data and render on map
fetch('/get_follower_locations')
    .then(response => response.json())
    .then(locations => {
        const map = L.map('locationMap').setView([0, 0], 2); // Adjust as needed
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        locations.forEach(location => {
            L.marker([location.lat, location.lng]).addTo(map)
                .bindPopup(`${location.city}, ${location.country}`);
        });
    });
