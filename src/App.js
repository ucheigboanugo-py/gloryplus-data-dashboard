import React from 'react';
import './chartSetup';
import MyChartComponent from './MyChartComponent'; // Adjust the path if necessary
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Attendance from './pages/Attendance';
import NewVisitors from './pages/NewVisitors';
import SecondTimers from './pages/SecondTimers';
import FollowUp from './pages/FollowUp';
import Events from './pages/Events';
import AnalyticsDashboard from './pages/dashboard/AnalyticsDashboard'; // Make sure this import path matches
import Sidebar from './components/Sidebar';

function App() {
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
                    <Route path="/analytics" element={<AnalyticsDashboard />} /> {/* New Analytics route */}
                    <Route path="/my-chart" element={<MyChartComponent />} /> {/* New route for the chart component */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

