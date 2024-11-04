import React from 'react';
import './chartSetup';
import MyChartComponent from './components/MyChartComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Attendance from './pages/Attendance';
import NewVisitors from './pages/NewVisitors';
import SecondTimers from './pages/SecondTimers';
import FollowUp from './pages/FollowUp';
import Events from './pages/Events';
import AnalyticsDashboard from './pages/dashboard/AnalyticsDashboard';
import Sidebar from './components/Sidebar';
import BranchDashboard from './components/BranchDashboard';
import FileUpload from './components/FileUpload/FileUpload';
import Map from './components/Map';  // Import the Map component

function App() {
    // Set coordinates for the map (modify if needed)
    const coordinates = { lng: -74.5, lat: 40 };

    return (
        <Router>
            <div className="app">
                <Sidebar />
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
                    {/* Add the new Map route */}
                    <Route path="/map" element={<Map coordinates={coordinates} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;



