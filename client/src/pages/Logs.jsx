import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Logs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterField, setFilterField] = useState(''); // Dropdown filter field
    const [filterValue, setFilterValue] = useState(''); // Search bar filter value
    const [startDate, setStartDate] = useState(''); // Start date for date range filter
    const [endDate, setEndDate] = useState(''); // End date for date range filter
    const [filteredLogs, setFilteredLogs] = useState([]); // State to store filtered logs

    const Loader = () => {
        return (
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    };

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/logs');
            setLogs(response.data);

            // Apply filters only if filter criteria are present
            if (filterField || filterValue || (startDate && endDate)) {
                applyFilters(response.data);
            } else {
                // If no filters, display all logs
                setFilteredLogs(response.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = (data) => {
        let filteredData = [...data];

        // Apply dropdown filter
        if (filterField) {
            filteredData = filteredData.filter((log) => log[filterField].toLowerCase().includes(filterValue.toLowerCase()));
        }

        // Apply search bar filter
        if (filterValue) {
            filteredData = filteredData.filter((log) =>
                Object.values(log).some((value) => String(value).toLowerCase().includes(filterValue.toLowerCase()))
            );
        }
        if (startDate && endDate) {
            filteredData = filteredData.filter((log) => {
                const logTimestamp = new Date(log.timestamp);
                return logTimestamp >= new Date(startDate) && logTimestamp <= new Date(endDate);
            });
        }

        // setFilteredLogs(filteredData);
        setFilteredLogs(filteredData);
    };

    useEffect(() => {
        fetchLogs();
    }, [filterField, filterValue,startDate,endDate]);

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-6 mt-2 text-left">Logs</h1>
                <div className="flex mb-2">
                    <div className="mr-2 w-1/4">
                        <label className="block text-gray-700">Filter Field:</label>
                        <select
                            className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                            value={filterField}
                            onChange={(e) => setFilterField(e.target.value)}
                        >
                            <option value="">Select a field</option>
                            <option value="level">Level</option>
                            <option value="message">Message</option>
                            <option value="resourceId">Resource ID</option>
                            <option value="timestamp">Timestamp</option>
                            <option value="traceId">Trace ID</option>
                            <option value="spanId">Span ID</option>
                            <option value="commit">Commit</option>
                            <option value="metadata.parentResourceId">Parent Resource ID</option>
                        </select>
                    </div>

                    <div className="w-1/4">
                        <label className="block text-gray-700">Search:</label>
                        <input
                            type="text"
                            className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            placeholder="Type your search here..."
                        />
                    </div>
                </div>

                <div className="flex mb-2">
                    <div className="mr-2">
                        <label className="block text-gray-700">Start Date:</label>
                        <input
                            type="date"
                            className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">End Date:</label>
                        <input
                            type="date"
                            className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    
                </div>

                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={fetchLogs}
                >
                    Refresh
                </button>

                {loading ? (
                    <Loader />
                ) : (
                    <table className="w-full border rounded mt-2">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left min-w-max">Level</th>
                                <th className="border border-gray-300 px-4 py-2 text-left min-w-max">Message</th>
                                <th className="border border-gray-300 px-4 py-2 text-left min-w-max">Resource ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left min-w-max">Timestamp</th>
                                <th className="border border-gray-300 px-4 py-2 text-left min-w-max">Trace ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left min-w-max">Span ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left min-w-max">Commit</th>
                                <th className="border border-gray-300 px-4 py-2 text-left min-w-max">Parent Resource ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-100'}>
                                    <td className="border border-gray-300 px-4 py-2 text-left min-w-max">{log.level}</td>
                                    <td
                                        className="border border-gray-300 px-4 py-2 text-left min-w-max max-w-[300px] truncate"
                                        title={log.message}
                                    >
                                        {log.message}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-left min-w-max">{log.resourceId}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-left min-w-max">{log.timestamp}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-left min-w-max">{log.traceId}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-left min-w-max">{log.spanId}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-left min-w-max">{log.commit}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-left min-w-max">
                                        {log.metadata.parentResourceId}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default Logs;
