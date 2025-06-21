import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Past3MonthsReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchPast3MonthsReports();
  }, []);

  const fetchPast3MonthsReports = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get(`${API_PATHS.REPORTS.GET_RECENT}?limit=3`);
      
      console.log("Full API Response:", response.data);
      
      if (response.data && response.data.success) {
        setReports(response.data.data);
        console.log("Reports Array:", response.data.data);
        console.log("Reports Length:", response.data.data.length);
      } else {
        setError('Failed to fetch reports');
        console.log("API Error:", response.data);
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
      console.error('Error details:', err.response?.data);
      setError(`Error loading reports: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateCurrentMonthReport = async () => {
    try {
      setGenerating(true);
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      
      console.log('Frontend date values:', { currentDate, year, month });
      console.log(`Generating report for ${month}/${year}...`);
      console.log('API URL:', API_PATHS.REPORTS.GENERATE(year, month));
      
      const response = await axiosInstance.post(API_PATHS.REPORTS.GENERATE(year, month));
      
      if (response.data && response.data.success) {
        console.log('Report generated successfully!', response.data);
        await fetchPast3MonthsReports();
      } else {
        console.error('Failed to generate report:', response.data);
        setError('Failed to generate report');
      }
    } catch (err) {
      console.error('Error generating report:', err);
      setError(`Error generating report: ${err.response?.data?.message || err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Past 3 Months Reports</h2>
        <div className="text-red-500 text-center py-4">
          {error}
        </div>
        <div className="text-center mt-4 space-x-3">
          <button
            onClick={fetchPast3MonthsReports}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
          <button
            onClick={generateCurrentMonthReport}
            disabled={generating}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {generating ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Past 3 Months Reports</h2>
        <div className="text-gray-500 text-center py-8">
          <p>No reports available yet.</p>
          <p className="text-sm mt-2">Generate your first monthly report to see insights here.</p>
          <button
            onClick={generateCurrentMonthReport}
            disabled={generating}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {generating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              `Generate Report for ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`
            )}
          </button>
        </div>
      </div>
    );
  }

  const totalSpent = reports.reduce((sum, report) => sum + report.totalSpent, 0);
  const averageSpent = totalSpent / reports.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Past 3 Months Reports</h2>
        <button
          onClick={generateCurrentMonthReport}
          disabled={generating}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {generating ? 'Generating...' : 'Generate Current Month'}
        </button>
      </div>
      
      <div className="space-y-4 mb-6">
        {reports.map((report, index) => (
          <div 
            key={report.id} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-700">
                {report.monthName} {report.year}
              </h3>
              <span className="text-2xl font-bold text-blue-600">
                Rs {report.totalSpent.toFixed(2)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Top Category:</span>
                <span className="ml-2 font-medium text-gray-700">
                  {report.topCategory || 'N/A'}
                </span>
              </div>
              
              <div>
                <span className="text-gray-500">Report Generated:</span>
                <span className="ml-2 text-gray-700">
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {report.overbudgetCategories && report.overbudgetCategories.length > 0 && (
              <div className="mt-3">
                <span className="text-red-500 text-sm font-medium">Over Budget: </span>
                <span className="text-sm text-red-600">
                  {report.overbudgetCategories.join(', ')}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-3">3-Month Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              Rs {totalSpent.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              Rs {averageSpent.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Average per Month</div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {reports.length}
            </div>
            <div className="text-sm text-gray-600">Reports Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Past3MonthsReports;