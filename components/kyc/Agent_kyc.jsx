'use client'; // For Next.js or can be omitted if using Create React App

import React, { useState, useEffect } from 'react';
import { FaBoxes,FaCircle,FaCalendarAlt,FaIdBadge,FaBuilding,FaPhone,FaTags,FaMapMarkerAlt,FaBox,FaMobileAlt, FaUserShield, FaEnvelope, FaPhoneAlt, FaFlag, FaEye, FaCheckCircle, FaTimesCircle, FaSpinner, FaTimes } from 'react-icons/fa';
import Select from 'react-select';

const AgentKyc = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kycStatusFilter, setKycStatusFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('agentKycData');
    if (storedData) {
      setAgents(JSON.parse(storedData));
    } else {
      const initialData = require('../../data/data2.json'); // Path to your data file
      setAgents(initialData.agents);
      localStorage.setItem('agentKycData', JSON.stringify(initialData.agents));
    }
  }, []);

  const handleOpenModal = (agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAgent(null);
    setIsModalOpen(false);
  };

  const handleApproval = (agent) => {
    if (agent) {
      const updatedAgents = agents.map((a) =>
        a.agentIdentification.agentID === agent.agentIdentification.agentID
          ? { ...a, status: 'Approved' }
          : a
      );
      setAgents(updatedAgents);
      localStorage.setItem('agentKycData', JSON.stringify(updatedAgents));
      setAlertMessage(`Approved: ${agent.agentIdentification.agentName}`);
    }
    handleCloseModal();
  };

  const handleRejection = (agent) => {
    if (agent) {
      const updatedAgents = agents.map((a) =>
        a.agentIdentification.agentID === agent.agentIdentification.agentID
          ? { ...a, status: 'Rejected' }
          : a
      );
      setAgents(updatedAgents);
      localStorage.setItem('agentKycData', JSON.stringify(updatedAgents));
      setAlertMessage(`Rejected: ${agent.agentIdentification.agentName}`);
    }
    handleCloseModal();
  };

  const filteredAgents = agents.filter((agent) => {
    const matchesKycStatus = kycStatusFilter ? agent.status === kycStatusFilter : true;
    const matchesName = agent.agentIdentification.agentName.toLowerCase().includes(nameFilter.toLowerCase());
    return matchesKycStatus && matchesName;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => new Date(b.Date) - new Date(a.Date));

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Agent KYC</h1>

      {alertMessage && (
        <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
          {alertMessage}
        </div>
      )}

      <div className="mb-4 flex items-center gap-4 rounded-lg bg-white p-4 shadow-md">
        <Select
          value={{ value: kycStatusFilter, label: kycStatusFilter || 'All KYC Status' }}
          onChange={(option) => setKycStatusFilter(option.value)}
          options={[
            { value: '', label: 'All KYC Status' },
            { value: 'Approved', label: 'Approved' },
            { value: 'Pending', label: 'Pending' },
            { value: 'Rejected', label: 'Rejected' },
            { value: 'Blocked', label: 'Blocked' },
          ]}
          className="w-1/6 border-r-amber-300 rounded-lg"
        />

        <div className="relative w-1/6">
          <input
            type="text"
            placeholder="Search by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="p-2 border rounded-lg pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedAgents.length > 0 ? (
          sortedAgents.map((agent) => {
            const agentPhoto = agent.photo || '/fallback-image.jpg';

            return (
              <div key={agent.agentIdentification.agentID} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 max-w-sm mx-auto">
                <div className="flex items-center">
                  <div className="w-24 h-24 mr-4">
                    <img
                      src={agentPhoto}
                      alt={agent.agentIdentification.agentName}
                      className="w-full h-full object-cover rounded-md border-2 border-violet-500"
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <h2 className="text-xl font-bold mb-2">{agent.agentIdentification.agentName}</h2>
                    <div className="flex items-center mb-2">
                      <FaFlag size={20} className="mr-2 text-violet-500" />
                      <p className="text-sm text-gray-500">{agent.agentIdentification.businessName}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <FaEnvelope size={20} className="mr-2 text-gray-500" />
                      <p className="text-sm text-gray-500">{agent.contactInformation.emailAddress}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <FaPhoneAlt size={20} className="mr-2 text-gray-500" />
                      <p className="text-sm text-gray-500">{agent.contactInformation.phoneNumber}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      {agent.status === 'Approved' && <FaCheckCircle className="text-green-500 mr-1" />}
                      {agent.status === 'Pending' && <FaSpinner className="text-yellow-500 animate-spin mr-1" />}
                      {agent.status === 'Rejected' && <FaTimesCircle className="text-red-500 mr-1" />}
                      {agent.status === 'Blocked' && <FaTimesCircle className="text-orange-500 mr-1" />}
                      <p className="text-sm text-gray-500">{agent.status}</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button onClick={() => handleOpenModal(agent)} className="text-blue-600 hover:underline">
                        <FaEye />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-4 text-center text-gray-500">No matching records found.</div>
        )}
      </div>

      {/* Modal for Agent Details */}
{isModalOpen && selectedAgent && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative overflow-auto z-60">
      <button 
        onClick={handleCloseModal} 
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
        <FaTimes size={18} />
      </button>

      <form className="space-y-4 text-sm">
        {/* Agent Profile */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={selectedAgent.photo || '/fallback-image.jpg'}
            alt={selectedAgent.agentIdentification.agentName}
            className="w-24 h-24 rounded-full border-2 border-violet-500 mb-2"
          />
          <h2 className="text-lg font-semibold">{selectedAgent.agentIdentification.agentName}</h2>
        </div>

        {/* Compact Info with Icons */}
        <div className="grid grid-cols-2 gap-4">
          {/* Agent Details */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm space-y-1">
            <p className="flex items-center">
              <FaIdBadge className="mr-2 text-violet-500" /> {selectedAgent.agentIdentification.agentID}
            </p>
            <p className="flex items-center">
              <FaBuilding className="mr-2 text-violet-500" /> {selectedAgent.agentIdentification.businessName}
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm space-y-1">
            <p className="flex items-center">
              <FaPhone className="mr-2 text-violet-500" /> {selectedAgent.contactInformation.phoneNumber}
            </p>
            <p className="flex items-center">
              <FaEnvelope className="mr-2 text-violet-500" /> {selectedAgent.contactInformation.emailAddress}
            </p>
          </div>
        </div>

        {/* Business and Product Details */}
        <div className="bg-gray-50 p-3 rounded-lg shadow-sm space-y-1 mt-4">
          <p className="flex items-center">
            <FaTags className="mr-2 text-violet-500" /> {selectedAgent.businessDetails.businessType}
          </p>
          <p className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-violet-500" /> {selectedAgent.businessDetails.businessAddress}
          </p>
        </div>

        {/* Product Info Section */}
        <div className="bg-gray-50 p-3 rounded-lg shadow-sm space-y-1 mt-4">
          <h3 className="text-sm font-semibold text-violet-600 flex items-center">
            <FaBox className="mr-2" /> Product Info
          </h3>
          {selectedAgent.productInformation.productsListed.map((product) => (
            <div key={product.productID} className="mt-2">
              <p className="flex items-center">
                <FaMobileAlt className="mr-2 text-violet-500" /> {product.productName} (${product.price})
              </p>
              <p className="flex items-center">
                <FaBoxes className="mr-2 text-violet-500" /> Stock: {product.stock}
              </p>
            </div>
          ))}
        </div>

        {/* Status and Date */}
        <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
          <p className="flex items-center">
            <FaCircle className={`mr-2 ${selectedAgent.status === 'Active' ? 'text-green-500' : 'text-gray-400'}`} /> 
            {selectedAgent.status}
          </p>
          <p className="flex items-center">
            <FaCalendarAlt className="mr-2" /> {selectedAgent.Date}
          </p>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default AgentKyc;
