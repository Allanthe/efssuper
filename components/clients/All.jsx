
'use client'
import React, { useState, useMemo } from 'react';
import initialData from '../../data/data.json';
import Select from 'react-select';
import { FaFlag, FaEnvelope, FaPhone, FaWallet, FaTrash } from 'react-icons/fa';

const All = () => {
  const [clients, setClients] = useState(() => {
    const storedClients = localStorage.getItem('clients');
    return storedClients ? JSON.parse(storedClients) : initialData;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterBalance, setFilterBalance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 8;
  const [alertMessage, setAlertMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionClientId, setActionClientId] = useState(null);
  const [actionType, setActionType] = useState('');

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
        filterBalance.value === 'All' || 
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

  const updateLocalStorage = (updatedClients) => {
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };

  const handleAction = (clientId, type) => {
    setActionClientId(clientId);
    setActionType(type);
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    setClients(prevClients => {
      const updatedClients = prevClients.map(client => {
        if (client.clientId === actionClientId) {
          return {
            ...client,
            status: actionType === 'change' ? (client.status === 'Active' ? 'Blocked' : 'Active') : client.status
          };
        }
        return client;
      });
      if (actionType === 'delete') {
        return updatedClients.filter(client => client.clientId !== actionClientId);
      }
      updateLocalStorage(updatedClients);
      setAlertMessage(actionType === 'change' ? 'Client status updated successfully.' : 'Client deleted successfully.');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return updatedClients;
    });
    setIsModalOpen(false);
  };

  const handleDelete = (clientId) => {
    setActionClientId(clientId);
    setActionType('delete');
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 underline">Registered Clients</h1>

      {alertMessage && (
        <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
          {alertMessage}
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="flex justify-between items-center mb-4 space-x-4 bg-white p-4 rounded-lg shadow-md">
        {/* Left Section: Select components */}
        <div className="flex space-x-4">
          <div className="w-[200px]">
            <Select 
              className="w-full rounded-lg shadow-sm"
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="Select Status"
            />
          </div>

          <div className="w-[200px]">
            <Select 
              className="w-full rounded-lg shadow-sm"
              options={balanceOptions}
              value={filterBalance}
              onChange={setFilterBalance}
              placeholder="Select Range"
            />
          </div>
        </div>

        {/* Right Section: Search Input (aligned to the right) */}
        <div className="flex items-center relative ml-auto">
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
              className="ml-2 border-none outline-none bg-transparent w-[300px] text-gray-700 rounded-lg"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              autoFocus 
            />
          )}
        </div>
      </div>
{/* Unified Client Cards with Square Photo on the Left */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {currentClients.map(client => (
    <div key={client.clientId} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      <div className="flex items-start space-x-4">
        {/* Image */}
        <div className="relative w-24 h-24">
          <img 
            src={client.photo} 
            alt={`${client.name}'s photo`} 
            className="w-full h-full object-cover rounded-lg border-2 border-violet-500" 
          />
        </div>

        {/* Client Info */}
        <div className="flex flex-col justify-between flex-grow">
          <h2 className="font-bold text-lg">{client.name}</h2>
          
          {/* Nationality */}
          <p className="flex items-center text-sm">
            <FaFlag className="mr-2 text-violet-950" />
            <span>{client.nationality}</span>
          </p>

          {/* Contact */}
          <p className="flex items-center text-sm">
            <FaPhone className="mr-2 text-violet-950" />
            <span>{client.contact}</span>
          </p>

          {/* Email */}
          <p className="flex items-center text-sm">
            <FaEnvelope className="mr-2 text-violet-950" />
            <span>{client.email}</span>
          </p>

          {/* Balance */}
          <p className="flex items-center text-sm">
            <FaWallet className="mr-2 text-violet-950" />
            <span>${client.balance.toFixed(2)}</span>
          </p>

          {/* Status and Actions */}
          <div className="flex justify-between items-center mt-4">
            <span className={`text-sm font-semibold ${client.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
              {client.status}
            </span>

            <div className="space-x-2">
              {/* Toggle Action */}
              <button 
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleAction(client.clientId, 'change')}
              >
                {client.status === 'Active' ? 'Block' : 'Activate'}
              </button>

              {/* Delete Button */}
              <button 
                className=" text-black px-2 py-1 rounded"
                onClick={() => handleDelete(client.clientId)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


      {renderPagination()}

      {/* Modal with Backdrop */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-lg p-4 relative z-10">
            <h2 className="text-lg font-bold">Confirm Action</h2>

            {/* Fetch the client using the actionClientId */}
      {clients && clients.length > 0 && (
        <p>
        {actionType === 'change' 
          ? `Are you sure you want to permanently block ` 
          : `Are you sure you want to delete`}
        <span className="font-bold">
          {clients.find(client => client.clientId === actionClientId)?.name}
        </span>?
      </p>
      
      )}
            <div className="mt-4">
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={confirmAction}
              >
                Yes
              </button>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default All;
