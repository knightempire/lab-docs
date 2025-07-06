// React component for system status dashboard
import { useState, useEffect } from 'react';

export default function SystemStatus() {
  const [status, setStatus] = useState({
    backend: 'checking',
    database: 'checking',
    email: 'checking',
    lastUpdated: null
  });

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      
      setStatus({
        backend: response.ok ? 'online' : 'offline',
        database: data.services?.database === 'connected' ? 'online' : 'offline',
        email: data.services?.email === 'configured' ? 'online' : 'offline',
        lastUpdated: new Date().toLocaleTimeString()
      });
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        backend: 'offline',
        database: 'offline',
        email: 'offline',
        lastUpdated: new Date().toLocaleTimeString()
      }));
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (serviceStatus) => {
    switch (serviceStatus) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = (serviceStatus) => {
    switch (serviceStatus) {
      case 'online': return '✅';
      case 'offline': return '❌';
      default: return '⏳';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">System Status</h3>
        <button
          onClick={checkStatus}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>
      
      <div className="space-y-3">
        {Object.entries(status).map(([service, serviceStatus]) => {
          if (service === 'lastUpdated') return null;
          
          return (
            <div key={service} className="flex justify-between items-center">
              <span className="capitalize font-medium">{service}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(serviceStatus)}`}>
                {getStatusIcon(serviceStatus)} {serviceStatus}
              </span>
            </div>
          );
        })}
      </div>
      
      {status.lastUpdated && (
        <div className="mt-4 text-sm text-gray-500">
          Last updated: {status.lastUpdated}
        </div>
      )}
    </div>
  );
}
