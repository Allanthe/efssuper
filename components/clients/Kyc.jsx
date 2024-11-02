'use client'
import React, { useState } from 'react';
import kycData from '../../data/data2.json'; // Adjust the path to your JSON data file
import { FaSearch, FaEye, FaTimes } from 'react-icons/fa'; // Import search, view, and close icons
import Select from 'react-select';

const Kyc = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [kycStatusFilter, setKycStatusFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const kycStatusOptions = [
    { value: '', label: 'All KYC Status' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const handleOpenModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  const handleApproval = () => {
    console.log('Approved:', selectedClient);
    handleCloseModal();
  };

  const handleRejection = () => {
    console.log('Rejected:', selectedClient);
    handleCloseModal();
  };

  // Filter clients based on the filters
  const filteredClients = kycData.clients.filter((client) => {
    const matchesKycStatus = kycStatusFilter ? client.status === kycStatusFilter : true;
    const matchesName = client.personalIdentification.fullName.toLowerCase().includes(nameFilter.toLowerCase());
    return matchesKycStatus && matchesName;
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">KYC Details</h1>
      
      {/* Filters */}
      <div className="mb-4 flex items-center gap-4 rounded-lg bg-white p-4 shadow-md">
        <Select
          value={kycStatusOptions.find(option => option.value === kycStatusFilter)}
          onChange={(option) => setKycStatusFilter(option.value)}
          options={kycStatusOptions}
          className="w-1/6 border-r-amber-300 rounded-lg"
        />
        
        <div className="relative w-1/6">
          <input
            type="text"
            placeholder="Search by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="p-2 border rounded-lg pl-10 w-full" // Add padding for the icon
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" /> {/* Icon in the input field */}
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-6 border-b text-left">Image</th>
            <th className="py-3 px-6 border-b text-left">Full Name</th>
            <th className="py-3 px-6 border-b text-left">Status</th>
            <th className="py-3 px-6 border-b text-left">Date</th>
            <th className="py-3 px-6 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => {
              const isNew = new Date(client.Date) >= new Date(new Date().setDate(new Date().getDate() - 7));
              return (
                <tr key={client.personalIdentification.fullName} className="hover:bg-gray-50 transition duration-200">
                  <td className="py-2 px-6 border-b">
                    <img src={client.photo} alt={client.personalIdentification.fullName} className="w-14 h-14 rounded-full border-2 border-violet-500" />
                  </td>
                  <td className="py-2 px-6 border-b flex items-center">
                    {client.personalIdentification.fullName}
                    {isNew && <span className="ml-2 text-sm text-green-500 bg-green-100 rounded-full px-2">New</span>}
                  </td>
                  <td className="py-2 px-6 border-b">{client.status}</td>
                  <td className="py-2 px-6 border-b">{client.Date}</td>
                  <td className="py-2 px-6 border-b">
                    <button onClick={() => handleOpenModal(client)} className="text-blue-600 hover:underline">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="py-2 px-6 border-b text-center">No matching records found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Client Details */}
      {isModalOpen && selectedClient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
            <div className="flex flex-col items-center mb-6">
              <img 
                src={selectedClient.photo} 
                alt={selectedClient.personalIdentification.fullName} 
                className="w-32 h-32 rounded-full border-4 border-violet-500 mb-2" 
              />
              <h2 className="text-2xl font-bold">{selectedClient.personalIdentification.fullName}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold">Personal Identification</h3>
                <p><strong>Date of Birth:</strong> {selectedClient.personalIdentification.dateOfBirth}</p>
                <p><strong>Nationality:</strong> {selectedClient.personalIdentification.nationality}</p>
                <p><strong>Gender:</strong> {selectedClient.personalIdentification.gender}</p>
                
                <h3 className="text-xl font-semibold mt-4">Contact Information</h3>
                <p><strong>Phone Number:</strong> {selectedClient.contactInformation.phoneNumber}</p>
                <p><strong>Email Address:</strong> {selectedClient.contactInformation.emailAddress}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Identification Documents</h3>
                <p><strong>ID Type:</strong> {selectedClient.identificationDocuments.idType}</p>
                <p><strong>ID Number:</strong> {selectedClient.identificationDocuments.idNumber}</p>
                <p><strong>Expiration Date:</strong> {selectedClient.identificationDocuments.expirationDate}</p>
                
                <h3 className="text-xl font-semibold mt-4">Financial Information</h3>
                <p><strong>Bank Account Number:</strong> {selectedClient.financialInformation.bankAccountDetails.accountNumber}</p>
                <p><strong>Bank Name:</strong> {selectedClient.financialInformation.bankAccountDetails.bankName}</p>
                <p><strong>Source of Income:</strong> {selectedClient.financialInformation.sourceOfIncome}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold">Address Verification</h3>
                <p><strong>Residential Address:</strong> {selectedClient.addressVerification.residentialAddress}</p>
                <p><strong>Proof of Address Document:</strong> {selectedClient.addressVerification.proofOfAddressDocument}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Digital Identity Verification</h3>
                <p><strong>IP Address:</strong> {selectedClient.digitalIdentityVerification.deviceInformation.ipAddress}</p>
                <p><strong>Device ID:</strong> {selectedClient.digitalIdentityVerification.deviceInformation.deviceID}</p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={handleRejection} className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600">Reject</button>
              <button onClick={handleApproval} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Approve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kyc;