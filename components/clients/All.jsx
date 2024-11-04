'use client';
import React, { useState, useMemo } from 'react';
import initialData from '../../data/data.json';
import Select from 'react-select';
import { FaFlag, FaEnvelope, FaPhone, FaWallet } from 'react-icons/fa';

const All = () => {
  const [clients, setClients] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterBalance, setFilterBalance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 8;
  const [editClient, setEditClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Options for status and balance
  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Idle', label: 'Idle' },
    { value: 'Closed', label: 'Closed' },
  ];

  const balanceOptions = [
    { value: 'All', label: 'All Balances' },
    { value: '100', label: '100 - 499' },
    { value: '500', label: '500 - 999' },
    { value: '1000', label: '1000 - 4999' },
    { value: '5000', label: '5000 - 9999' },
    { value: '10000', label: '10000 and above' },
  ];

  const filteredData = useMemo(() => 
    clients.filter(client => 
      (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       client.clientId.toString().includes(searchTerm)) &&
      (filterStatus === null || filterStatus.value === 'All' || client.status === filterStatus.value) &&
      (filterBalance === null || 
        (filterBalance.value === '100' && client.balance >= 100 && client.balance < 500) ||
        (filterBalance.value === '500' && client.balance >= 500 && client.balance < 1000) ||
        (filterBalance.value === '1000' && client.balance >= 1000 && client.balance < 5000) ||
        (filterBalance.value === '5000' && client.balance >= 5000 && client.balance < 10000) ||
        (filterBalance.value === '10000' && client.balance >= 10000))
    ), [searchTerm, filterStatus, filterBalance, clients]
  );

  const totalPages = Math.ceil(filteredData.length / clientsPerPage);
  
  const currentClients = useMemo(() => {
    const startIndex = (currentPage - 1) * clientsPerPage;
    return filteredData.slice(startIndex, startIndex + clientsPerPage);
  }, [filteredData, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => (
    <div className="flex justify-end mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button 
          key={index + 1} 
          onClick={() => handlePageChange(index + 1)} 
          className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-violet-950 text-white' : 'bg-gray-200'}`}>
          {index + 1}
        </button>
      ))}
    </div>
  );

  const handleAction = (action, clientId) => {
    const confirmed = window.confirm(`Are you sure you want to ${action === 'Block' ? 'block' : 'activate'} this client?`);
    if (!confirmed) return; // Exit if the user cancels

    setClients(prevClients => {
      const updatedClients = prevClients.map(client => 
        client.clientId === clientId ? { ...client, status: action === 'Block' ? 'Blocked' : 'Active' } : client
      );
      setAlertMessage(`Client has been successfully ${action === 'Block' ? 'blocked' : 'activated'}.`);
      return updatedClients;
    });

    // Automatically hide the alert after a few seconds
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 underline">Registered Clients</h1>

      {/* Alert Message */}
      {alertMessage && (
        <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
          {alertMessage}
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="flex items-center mb-4 space-x-4 bg-white p-4 rounded-lg shadow-md">
        <div className="relative flex items-center">
          <button 
            className="text-gray-500 cursor-pointer p-2"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197M15.803 15.803A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
            </svg>
          </button>

          {isSearchVisible && (
            <input 
              type="text" 
              placeholder="Search by Client ID or Name..." 
              className="ml-2 border-none outline-none bg-transparent w-1/3 text-gray-700 rounded-lg"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              autoFocus 
            />
          )}
        </div>

        <Select 
          className="w-1/6 rounded-lg shadow-sm"
          options={statusOptions}
          value={filterStatus}
          onChange={setFilterStatus}
          placeholder="Select Status"
        />

        <Select 
          className="w-1/6 rounded-lg shadow-sm"
          options={balanceOptions}
          value={filterBalance}
          onChange={setFilterBalance}
          placeholder="Select Balance"
        />
      </div>

      {/* Modern Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {currentClients.map(client => (
    <div key={client.clientId} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      <div className="flex justify-center mb-2"> {/* Center the image */}
        <div className="relative w-24 h-24"> {/* Circular image container */}
          <img 
            src={client.photo} 
            alt={`${client.name}'s photo`} 
            className="absolute top-0 left-0 w-full h-full object-cover rounded-full" 
          />
        </div>
      </div>
      <h2 className="font-bold text-lg mt-2">{client.name}</h2>
      <p className="flex items-center"><FaFlag className="mr-1 text-violet-950" /><span>{client.nationality}</span></p>
      <p className="flex items-center"><FaPhone className="mr-1 text-violet-950" /><span>{client.contact}</span></p>
      <p className="flex items-center"><FaEnvelope className="mr-1 text-violet-950" /><span>{client.email}</span></p>
      <p className="flex items-center"><FaWallet className="mr-1 text-violet-950" /><span>${client.balance.toFixed(2)}</span></p>

      {/* Status Indicator and Action Buttons */}
      <div className="flex justify-between items-center mt-2">
        <span className={`text-sm font-semibold ${client.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{client.status}</span>
        <div className="space-x-2">
          <button 
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleAction(client.status === 'Active' ? 'Block' : 'Activate', client.clientId)}
          >
            {client.status === 'Active' ? 'Block' : 'Activate'}
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


      {renderPagination()}
    </div>
  );
};

export default All;
