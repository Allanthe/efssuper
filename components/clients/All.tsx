'use client';
import React, { useState, useMemo } from 'react';
import initialData from '../../data/data.json';

const All = () => {
  const [clients, setClients] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [menuOpen, setMenuOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 9;
  const [editClient, setEditClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = useMemo(() => 
    clients.filter(client => 
      (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       client.clientId.toString().includes(searchTerm)) &&
      (filterStatus === 'All' || client.status === filterStatus)
    ), [searchTerm, filterStatus, clients]
  );

  const totalPages = Math.ceil(filteredData.length / clientsPerPage);

  const currentClients = useMemo(() => {
    const startIndex = (currentPage - 1) * clientsPerPage;
    return filteredData.slice(startIndex, startIndex + clientsPerPage);
  }, [filteredData, currentPage]);

  const handleActionClick = (clientId: number | React.SetStateAction<null>) => {
    setMenuOpen(menuOpen === clientId ? null : clientId);
  };

  const handleAction = (action: string, clientId: number) => {
    if (action === 'Delete') {
      const confirmDelete = window.confirm(`Are you sure you want to delete client ${clientId}?`);
      if (confirmDelete) {
        setClients(clients.filter(client => client.clientId !== clientId));
      }
    } else if (action === 'Update') {
      setEditClient(clients.find(client => client.clientId === clientId));
      setIsModalOpen(true);
    }
    setMenuOpen(null);
  };

  const handleUpdate = (updatedClient: { clientId: number; }) => {
    setClients(prevClients => prevClients.map(client => 
      client.clientId === updatedClient.clientId ? updatedClient : client
    ));
    setIsModalOpen(false);
    setEditClient(null);
  };

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => (
    <div className="flex justify-center mt-4">
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

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Registered Clients</h1>

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
      </div>

      {/* Modern Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentClients.map(client => (
          <div key={client.clientId} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
            <h2 className="font-bold text-lg">{client.name}</h2>
            <p><strong>Client ID:</strong> {client.clientId}</p>
            <p><strong>Nationality:</strong> {client.nationality}</p>
            <p><strong>Balance:</strong> ${client.balance.toFixed(2)}</p>
            <p><strong>Date Created:</strong> {new Date(client.dateCreated).toLocaleDateString()}</p>
            <button 
              onClick={() => handleActionClick(client.clientId)} 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-sm px-1 py-0.5 rounded-full">
              {/* Three-Dots Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 4.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0-10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
            {menuOpen === client.clientId && (
              <div className="absolute bg-white border border-gray-300 rounded mt-1 right-2">
                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => handleAction('Update', client.clientId)}>Update</button>
                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => handleAction('Delete', client.clientId)}>Delete</button>
                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => handleAction('Block', client.clientId)}>Block</button>
              </div>
            )}
            <p className={`mt-2 text-xs px-2 py-1 rounded-full text-white truncate ${client.status === 'Active' ? 'bg-green-500' : client.status === 'Idle' ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: '100px' }}>
              {client.status}
            </p>
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

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
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
