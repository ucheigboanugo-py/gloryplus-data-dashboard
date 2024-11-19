// Enhanced fetchData with robust error handling
const fetchData = async (endpoint, options = {}) => {
    const baseUrl = "http://localhost:3000";
    const url = endpoint ? `${baseUrl}${endpoint}` : baseUrl;

    // Default headers
    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    const config = {
        method: "GET",
        headers: {
            ...defaultHeaders,
            ...(options.headers || {}), // Merge custom headers
        },
        ...options, // Allow method, body, etc.
    };

    try {
        console.log(`Fetching data from ${url}...`);
        const response = await fetch(url, config);

        // Check for HTTP errors
        if (!response.ok) {
            const errorDetails = await response.text(); // Try to fetch additional error info
            throw new Error(
                `HTTP Error! Status: ${response.status} (${response.statusText}). Response: ${errorDetails}`
            );
        }

        const data = await response.json();
        console.log(`Fetched data successfully from ${endpoint || "/"}`, data);
        return data;
    } catch (error) {
        // Handle network or other unexpected errors
        console.error(
            `Error fetching data from ${url}: ${error.message}. Request config:`,
            config
        );
        throw new Error(
            `Failed to fetch data from ${endpoint || "/"}: ${error.message}`
        );
    }
};

// Formatter for branch growth data with error resilience
const formatBranchGrowthData = (data = []) => {
    if (!Array.isArray(data)) {
        console.warn("Invalid data format: Expected an array", data);
        return [];
    }

    return data.map((item, index) => ({
        name: item?.branchName || `Branch ${index + 1}`,
        value: item?.growthPercentage || 0,
    }));
};

// Export for reuse
export { fetchData, formatBranchGrowthData };


