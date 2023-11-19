import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom'
import './home.css';
const Home = () => {
    const [bool, setBool] = useState(false);
    const [logData, setLogData] = useState({
        level: '',
        message: '',
        resourceId: '',
        timestamp: '',
        traceId: '',
        spanId: '',
        commit: '',
        metadata: {
            parentResourceId: '',
        },
    });
    const handleLogIngestion = async () => {
        const { level, message, resourceId, traceId, spanId, commit, metadata } = logData;

        if (!level || !message || !resourceId || !traceId || !spanId || !commit || !metadata.parentResourceId) {
            alert('Please fill out all the fields.');
            return;
        }
        try {
            await axios.post('http://localhost:3000/logs', logData);
            console.log('Log ingested successfully');
            setBool(true);
        } catch (error) {
            console.error('Error ingesting log:', error);
        }
        setLogData({
            level: '',
            message: '',
            resourceId: '',
            timestamp: '',
            traceId: '',
            spanId: '',
            commit: '',
            metadata: {
                parentResourceId: '',
            },
        });
    };
    const Alert = ({ onClose }) => {
        useEffect(() => {
            const timeoutId = setTimeout(() => {
                onClose();
            }, 5000);

            return () => {
                clearTimeout(timeoutId);
            };
        }, [onClose]);

        function setbool() {
            setBool(false);
        }

        return (
            <>
                {bool ? (
                    <div
                        id="alert-1"
                        className="fixed top-0 left-0 flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-white-50 dark:bg-gray-800 dark:text-blue-400 w-1/5 transition-opacity duration-500 opacity-100"
                        role="alert"
                    >
                        <svg
                            className="flex-shrink-0 w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                            />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div className="ms-3 text-sm font-medium">Log Inserted</div>
                        <button
                            type="button"
                            onClick={setbool}
                            className="ms-auto -mx-1.5 -my-1.5 bg-white-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                            data-dismiss-target="#alert-1"
                            aria-label="Close"
                        >
                            <button className="sr-only" onClick={setbool}>
                                Close
                            </button>
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>
                ) : null}
            </>
        );
    };

    return (<>
        {bool ? <Alert onClose={() => setBool(false)} /> : null}
            
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-red-700 py-1 flex flex-col justify-center sm:py-4 animate-gradient">
            <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-2 py-5 bg-white shadow-lg sm:rounded-3xl sm:p-8 w-96">
                    <form>
                        <div>
                            <h1 className="text-center text-xl font-bold mb-5">Log Ingestor</h1>
                        </div>
                        
                        <div className="mb-2">
                            <label className="block text-gray-700">Level:</label>
                            <input
                                type="text"
                                className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                                value={logData.level}
                                onChange={(e) => setLogData({ ...logData, level: e.target.value })}
                                placeholder='Type your Level here...'
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Message:</label>
                            <input
                                type="text"
                                className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                                value={logData.message}
                                onChange={(e) => setLogData({ ...logData, message: e.target.value })}
                                placeholder='Type your message here...'
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Resource ID:</label>
                            <input
                                type="text"
                                className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                                value={logData.resourceId}
                                onChange={(e) => setLogData({ ...logData, resourceId: e.target.value })}
                                placeholder='Type your resource ID here...'
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Timestamp:</label>
                            <input
                                type="text"
                                className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                                value={logData.timestamp}
                                onChange={(e) => setLogData({ ...logData, timestamp: e.target.value })}
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setLogData({ ...logData, timestamp: `${new Date().toISOString()}` })}
                        >
                            Current Time
                        </button>
                        <div className="mb-2">
                            <label className="block text-gray-700">Trace ID:</label>
                            <input
                                type="text"
                                className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                                value={logData.traceId}
                                onChange={(e) => setLogData({ ...logData, traceId: e.target.value })}
                                placeholder='Type your trace ID here...'
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Span ID:</label>
                            <input
                                type="text"
                                className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                                value={logData.spanId}
                                onChange={(e) => setLogData({ ...logData, spanId: e.target.value })}
                                placeholder='Type your span ID here...'
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Commit:</label>
                            <input
                                type="text"
                                className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                                value={logData.commit}
                                onChange={(e) => setLogData({ ...logData, commit: e.target.value })}
                                placeholder='Type your commit here...'
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Parent Resource ID:</label>
                            <input
                                type="text"
                                className="w-full border-2 rounded p-1 mt-1 focus:outline-none focus:border-blue-500"
                                value={logData.metadata.parentResourceId}
                                onChange={(e) => setLogData({ ...logData, metadata: { ...logData.metadata, parentResourceId: e.target.value } })}
                                placeholder='Type your parent resource ID here...'
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleLogIngestion}
                        >
                            Log Ingestion
                        </button>
                        <Link to='/logs'>

                            <button
                                type="button"
                                className="w-full mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                See The Logs
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
            </div>
        {/* </div> */}
    </>
    );
};

export default Home;