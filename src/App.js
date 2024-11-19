// src/App.js

import React from "react";
import "./chartSetup";
import MyChartComponent from "./components/MyChartComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Attendance from "./pages/Attendance";
import NewVisitors from "./pages/NewVisitors";
import SecondTimers from "./pages/SecondTimers";
import FollowUp from "./pages/FollowUp";
import Events from "./pages/Events";
import AnalyticsDashboard from "./pages/dashboard/AnalyticsDashboard";
import Sidebar from "./components/Sidebar";
import BranchDashboard from "./components/BranchDashboard";
import FileUpload from "./components/FileUpload/FileUpload";
import Map from "./components/Map"; // Import the Map component
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary

// Updated coordinate array with accurate Nigerian locations
const coordinatesArray = [
    { lng: 6.9746, lat: 4.8472 }, // Port Harcourt
    { lng: 7.4922, lat: 5.5250 }, // Umuahia
    { lng: 7.3733, lat: 5.1216 }, // Aba
    { lng: 3.3969, lat: 6.5855 }, // Ketu
    { lng: 3.3515, lat: 6.6018 }, // Ikeja
    { lng: 3.5725, lat: 6.4646 }, // Ajah
];

// Utility function to validate coordinates
const isValidCoordinates = (coords) =>
    Array.isArray(coords) &&
    coords.every(coord => 
        typeof coord.lat === "number" && 
        typeof coord.lng === "number" && 
        !isNaN(coord.lat) &&
        !isNaN(coord.lng)
    );

function App() {
    console.log("App.js - coordinatesArray:", coordinatesArray); // Debugging log

    return (
        <Router>
            <div className="app">
                <Sidebar />
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/members" element={<Members />} />
                        <Route path="/attendance" element={<Attendance />} />
                        <Route path="/new-visitors" element={<NewVisitors />} />
                        <Route path="/second-timers" element={<SecondTimers />} />
                        <Route path="/follow-up" element={<FollowUp />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/analytics" element={<AnalyticsDashboard />} />
                        <Route path="/my-chart" element={<MyChartComponent />} />
                        <Route path="/file-upload" element={<FileUpload />} />
                        <Route path="/branch/:branchName" element={<BranchDashboard />} />
                        <Route
                            path="/map"
                            element={
                                isValidCoordinates(coordinatesArray) ? (
                                    <Map coordinatesArray={coordinatesArray} />
                                ) : (
                                    <div>Error: Invalid coordinates</div>
                                )
                            }
                        />
                    </Routes>
                </ErrorBoundary>
            </div>
        </Router>
    );
}

export default App;
