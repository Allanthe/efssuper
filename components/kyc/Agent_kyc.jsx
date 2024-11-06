'use client'; // for Next.js apps, or you can omit this if using Create React App

import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserShield, FaEnvelope, FaPhoneAlt, FaFlag, FaEye, FaCheckCircle, FaTimesCircle, FaSpinner, FaTimes } from 'react-icons/fa';
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

  const handleBlock = (agent) => {
    if (agent) {
      const updatedAgents = agents.map((a) =>
        a.agentIdentification.agentID === agent.agentIdentification.agentID
          ? { ...a, status: 'Blocked' }
          : a
      );
      setAgents(updatedAgents);
      localStorage.setItem('agentKycData', JSON.stringify(updatedAgents));
      setAlertMessage(`Blocked: ${agent.agentIdentification.agentName}`);
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
      <h1 className="text-3xl font-bold mb-6">Agent KYC Details</h1>

      {/* Alert Message */}
      {alertMessage && (
        <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
          {alertMessage}
        </div>
      )}

      {/* Filters */}
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
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedAgents.length > 0 ? (
          sortedAgents.map((agent) => (
            <div key={agent.agentIdentification.agentID} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 max-w-sm mx-auto">
              <div className="flex items-center">
                {/* Image Section */}
                <div className="w-24 h-24 mr-4">
                  <img
                    src={agent.productInformation.productsListed[0].productImages[0]} // Example image of the first product
                    alt={agent.agentIdentification.agentName}
                    className="w-full h-full object-cover rounded-md border-2 border-violet-500"
                  />
                </div>

                {/* Agent Info Section */}
                <div className="flex flex-col justify-between">
                  <h2 className="text-xl font-bold mb-2">{agent.agentIdentification.agentName}</h2>

                  {/* Business Name */}
                  <div className="flex items-center mb-2">
                    <FaFlag size={20} className="mr-2 text-violet-500" />
                    <p className="text-sm text-gray-500">{agent.agentIdentification.businessName}</p>
                  </div>

                  {/* Email */}
                  <div className="flex items-center mb-2">
                    <FaEnvelope size={20} className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-500">{agent.contactInformation.emailAddress}</p>
                  </div>

                  {/* Contact Number */}
                  <div className="flex items-center mb-2">
                    <FaPhoneAlt size={20} className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-500">{agent.contactInformation.phoneNumber}</p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center mb-2">
                    {agent.status === 'Approved' && <FaCheckCircle className="text-green-500 mr-1" />}
                    {agent.status === 'Pending' && <FaSpinner className="text-yellow-500 animate-spin mr-1" />}
                    {agent.status === 'Rejected' && <FaTimesCircle className="text-red-500 mr-1" />}
                    {agent.status === 'Blocked' && <FaTimesCircle className="text-orange-500 mr-1" />}
                    <p className="text-sm text-gray-500">{agent.status}</p>
                  </div>

                  {/* Eye Icon to Open Modal */}
                  <div className="mt-4 flex justify-end">
                    <button onClick={() => handleOpenModal(agent)} className="text-blue-600 hover:underline">
                      <FaEye />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">No matching records found.</div>
        )}
      </div>

      {/* Modal for Agent Details */}
      {isModalOpen && selectedAgent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl relative overflow-auto">
            {/* Close Button */}
            <button 
              onClick={handleCloseModal} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>

            <form className="space-y-8">
              {/* Agent Info Section */}
              <div className="flex flex-col items-center mb-6">
                <img
                  src={selectedAgent.productInformation.productsListed[0].productImages[0]} // Example image of the first product
                  alt={selectedAgent.agentIdentification.agentName}
                  className="w-32 h-32 rounded-full border-4 border-violet-500 mb-2"
                />
                <h2 className="text-2xl font-bold mb-2">{selectedAgent.agentIdentification.agentName}</h2>
                <p className="text-xl text-gray-600">{selectedAgent.agentIdentification.businessName}</p>
              </div>

              {/* Agent Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Left Column: Identification */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
                  <h3 className="text-xl font-semibold text-violet-600">Agent Identification</h3>
                  <div className="flex items-center">
                    <FaUserShield size={20} className="mr-2 text-violet-500" />
                    <p>{selectedAgent.agentIdentification.agentID}</p>
                  </div>
                  <div className="flex items-center">
                    <FaFlag size={20} className="mr-2 text-violet-500" />
                    <p>{selectedAgent.agentIdentification.businessName}</p>
                  </div>
                  <div className="flex items-center">
                    <FaFlag size={20} className="mr-2 text-violet-500" />
                    <p>{selectedAgent.agentIdentification.taxIdentificationNumber}</p>
                  </div>
                </div>

                {/* Right Column: Contact */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
                  <h3 className="text-xl font-semibold text-green-600">Contact Information</h3>
                  <div className="flex items-center">
                    <FaPhoneAlt size={20} className="mr-2 text-green-500" />
                    <p>{selectedAgent.contactInformation.phoneNumber}</p>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope size={20} className="mr-2 text-green-500" />
                    <p>{selectedAgent.contactInformation.emailAddress}</p>
                  </div>
                </div>

                {/* Business Details */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
                  <h3 className="text-xl font-semibold text-indigo-600">Business Details</h3>
                  <div className="flex items-center">
                    <p>{selectedAgent.businessDetails.businessType}</p>
                  </div>
                  <div className="flex items-center">
                    <p>{selectedAgent.businessDetails.businessRegistrationNumber}</p>
                  </div>
                  <div className="flex items-center">
                    <p>{selectedAgent.businessDetails.businessAddress}</p>
                  </div>
                </div>

                {/* Product Information */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
                  <h3 className="text-xl font-semibold text-teal-600">Product Information</h3>
                  <div className="space-y-2">
                    {selectedAgent.productInformation.productsListed.map((product) => (
                      <div key={product.productID} className="flex items-center">
                        <img
                          src={product.productImages[0]} // First image of the product
                          alt={product.productName}
                          className="w-16 h-16 object-cover rounded-md border-2 border-teal-500"
                        />
                        <p className="ml-4">{product.productName} - ${product.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => handleRejection(selectedAgent)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApproval(selectedAgent)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Approve
                </button>
                {selectedAgent.status === 'Approved' && (
                  <button
                    onClick={() => handleBlock(selectedAgent)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                  >
                    Block
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentKyc;
