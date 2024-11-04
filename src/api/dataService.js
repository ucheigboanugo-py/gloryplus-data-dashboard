// src/api/dataService.js

// Define fetchData function
const fetchData = async (endpoint) => {
    const url = `http://localhost:3000${endpoint}`; // Ensure backend port matches here

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`Fetched data from ${endpoint}:`, data); // Log data for verification
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};

// Define formatBranchGrowthData function
const formatBranchGrowthData = (data) => {
    // Replace with your actual formatting logic
    return data.map(item => ({
        name: item.branchName,
        value: item.growthPercentage,
    }));
};

export { fetchData, formatBranchGrowthData };
