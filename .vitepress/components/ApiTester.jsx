// React component for interactive API testing
import { useState } from 'react';

export default function ApiTester() {
  const [endpoint, setEndpoint] = useState('/api/products');
  const [method, setMethod] = useState('GET');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">API Tester</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Method</label>
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Endpoint</label>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="/api/products"
          />
        </div>
        
        <button
          onClick={testApi}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test API'}
        </button>
        
        {response && (
          <div>
            <label className="block text-sm font-medium mb-2">Response</label>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto text-sm">
              <code>{response}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
