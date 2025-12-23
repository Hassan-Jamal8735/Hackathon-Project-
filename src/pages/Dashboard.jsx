import React from 'react';
import { useAuth } from '../hooks/useAuth';
import HistoryTable from '../components/dashboard/HistoryTable';
import ScanCard from '../components/dashboard/ScanCard';

const Dashboard = () => {
  const { currentUser, userData } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, {userData?.fullName || currentUser?.email}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScanCard 
            title="Total Scans"
            value={userData?.submissionsCount || 0}
            icon="🔍"
          />
          <ScanCard 
            title="Recent Activity"
            value="2 days ago"
            icon="📊"
          />
          <ScanCard 
            title="Account Status"
            value={userData?.role || 'User'}
            icon="👤"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Scans</h2>
        <HistoryTable />
      </div>
    </div>
  );
};

export default Dashboard;