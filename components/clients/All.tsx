'use client';
import React, { useState, useMemo } from 'react';
import initialData from '../../data/data.json';

const All = () => {
  const [clients, setClients] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterBalance, setFilterBalance] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 6;
  const [editClient, setEditClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = useMemo(() => 
    clients.filter(client => 
      (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       client.clientId.toString().includes(searchTerm)) &&
      (filterStatus === 'All' || client.status === filterStatus) &&
      (filterBalance === 'All' || 
        (filterBalance === '100' && client.balance >= 100 && client.balance < 500) ||
        (filterBalance === '500' && client.balance >= 500 && client.balance < 1000) ||
        (filterBalance === '1000' && client.balance >= 1000 && client.balance < 5000) ||
        (filterBalance === '5000' && client.balance >= 5000 && client.balance < 10000) ||
        (filterBalance === '10000' && client.balance >= 10000))
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
    if (action === 'Block') {
      setClients(prevClients => prevClients.map(client => 
        client.clientId === clientId ? { ...client, status: 'Blocked' } : client
      ));
    } else if (action === 'Activate') {
      setClients(prevClients => prevClients.map(client => 
        client.clientId === clientId ? { ...client, status: 'Active' } : client
      ));
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 underline">Registered Clients</h1>

      {/* Search and Filter Bar */}
      <div className="flex items-center mb-4 space-x-4">
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
              className="ml-2 border-none outline-none bg-transparent w-1/3 text-gray-700"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              autoFocus 
            />
          )}
        </div>

        <select 
          className="border p-2 rounded" 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Idle">Idle</option>
          <option value="Closed">Closed</option>
        </select>

        <select 
          className="border p-2 rounded" 
          value={filterBalance} 
          onChange={(e) => setFilterBalance(e.target.value)}
        >
          <option value="All">All Balances</option>
          <option value="100">100 - 499</option>
          <option value="500">500 - 999</option>
          <option value="1000">1000 - 4999</option>
          <option value="5000">5000 - 9999</option>
          <option value="10000">10000 and above</option>
        </select>
      </div>

      {/* Modern Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentClients.map(client => (
          <div key={client.clientId} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
            <img src={client.photo} alt={`${client.name}'s photo`} className="w-full h-32 object-cover rounded-t-lg mb-2" />
            <h2 className="font-bold text-lg">{client.name}</h2>
            <p><strong>Nationality:</strong> {client.nationality}</p>
            <p><strong>Contact:</strong> {client.contact}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Balance:</strong> ${client.balance.toFixed(2)}</p>

            {/* Status Indicator and Action Buttons */}
            <div className="flex justify-between items-center mt-4">
              <div className={`h-3 w-3 rounded-full ${client.status === 'Active' ? 'bg-green-500' : client.status === 'Idle' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <div className="flex space-x-2">
                {client.status === 'Active' && (
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleAction('Block', client.clientId)}>Block</button>
                )}
                {(client.status === 'Idle' || client.status === 'Blocked') && (
                  <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleAction('Activate', client.clientId)}>Activate</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {renderPagination()}

      {/* Update Modal */}
      {isModalOpen && (
        <Modal 
          client={editClient} 
          onClose={() => setIsModalOpen(false)} 
          onUpdate={handleUpdate} 
        />
      )}
    </div>
  );
};

const Modal = ({ client, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(client);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Update Client</h2>
        <form onSubmit={handleSubmit}>
          <input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full mb-4"
          />
          <input 
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Nationality"
            className="border p-2 w-full mb-4"
          />
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="border p-2 w-full mb-4"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full mb-4"
          />
          <input
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            placeholder="Balance"
            className="border p-2 w-full mb-4"
            type="number"
          />
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default All;
