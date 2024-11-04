document.addEventListener('DOMContentLoaded', () => {
    // Fetch overview data
    fetch('/api/overview_data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('num-branches').innerText = data.num_branches;
            document.getElementById('num-first-timers').innerText = data.num_first_timers;
            document.getElementById('num-second-timers').innerText = data.num_second_timers;
            document.getElementById('num-cells').innerText = data.num_cells;
            document.getElementById('num-members').innerText = data.num_members;
            document.getElementById('num-attendees').innerText = data.num_attendees;
        })
        .catch(error => console.error('Error loading overview data:', error));

    // Fetch location analysis data for map
    fetch('/api/location_analysis')
        .then(response => response.json())
        .then(data => {
            // Map setup for branch locations and attendees
            var map = L.map('branches-map').setView([9.0820, 8.6753], 6); // Centered on Nigeria
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Adding branch markers from fetched data
            data.branches.forEach(branch => {
                L.marker([branch.lat, branch.lng]).addTo(map)
                    .bindPopup(`<b>${branch.name}</b>`);
            });
        })
        .catch(error => console.error('Error loading location analysis:', error));

    // Fetch feedback sentiment data
    fetch('/api/feedback_sentiment')
        .then(response => response.json())
        .then(data => {
            // Display feedback sentiment chart with `data`
            var ctxFeedback = document.getElementById('feedback-chart').getContext('2d');
            new Chart(ctxFeedback, {
                type: 'bar',
                data: {
                    labels: data.labels,  // Expected labels for feedback ratings (e.g., ["Excellent", "Good", etc.])
                    datasets: [{
                        label: 'Feedback Ratings',
                        data: data.values,  // Expected data values for each rating
                        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        })
        .catch(error => console.error('Error loading feedback sentiment data:', error));

    // Fetch social media data
    fetch('/api/social_media_data')
        .then(response => response.json())
        .then(data => {
            // Populate social media widgets and charts
            document.getElementById('num-followers').innerText = data.total_followers;
            document.getElementById('top-location').innerText = data.top_location;

            var ctxSocial = document.getElementById('social-media-chart').getContext('2d');
            new Chart(ctxSocial, {
                type: 'pie',
                data: {
                    labels: data.platforms,  // Platforms like ["Facebook", "Instagram", "Twitter", etc.]
                    datasets: [{
                        label: 'Social Media Reach',
                        data: data.engagement,  // Engagement data for each platform
                        backgroundColor: ['#3b5998', '#E1306C', '#1da1f2', '#cccccc']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        })
        .catch(error => console.error('Error loading social media data:', error));

    // Static Map for Branch Locations
    var branches = [
        { name: "Aba", coords: [5.1054, 7.3668] },
        { name: "Umuahia", coords: [5.5249, 7.4946] },
        { name: "Port Harcourt", coords: [4.8156, 7.0498] },
        { name: "Ikeja", coords: [6.6018, 3.3515] },
        { name: "Ajah", coords: [6.4679, 3.6015] },
        { name: "Ketu", coords: [6.5833, 3.3833] }
    ];

    var map = L.map('branches-map').setView([9.0820, 8.6753], 6); // Centered on Nigeria
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    branches.forEach(branch => {
        L.marker(branch.coords).addTo(map)
            .bindPopup(`<b>${branch.name}</b>`)
            .openPopup();
    });

    // Sample Charts for Feedback and Follow-up
    var ctxFeedback = document.getElementById('feedback-chart').getContext('2d');
    var ctxFollowup = document.getElementById('followup-chart').getContext('2d');

    // Follow-up Chart
    new Chart(ctxFollowup, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                label: 'Follow-up Progress',
                data: [40, 55, 60, 70, 90],
                borderColor: '#ff5722',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});
