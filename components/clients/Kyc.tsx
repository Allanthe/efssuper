'use client';
import React, { useState } from 'react';
import kycData from '../../data/data2.json'; // Adjust the path to your JSON data file
import { FaSearch } from 'react-icons/fa'; // Import search icon

const Kyc = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [kycStatusFilter, setKycStatusFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  // Set a threshold for considering records as "new"
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() - 7); // Adjust to your desired time frame

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
      <div className="mb-4 flex items-center gap-4">
        <select
          value={kycStatusFilter}
          onChange={(e) => setKycStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All KYC Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>

        <div className="relative">
          <input
            type="text"
            placeholder="Search by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="p-2 border rounded pl-10" // Add padding for the icon
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" /> {/* Icon in the input field */}
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
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
              const isNew = new Date(client.Date) >= thresholdDate;
              return (
                <tr key={client.personalIdentification.fullName} className="hover:bg-gray-50 transition duration-200">
                  <td className="py-2 px-6 border-b">
                    <img src={client.photo} alt={client.personalIdentification.fullName} className="w-16 h-16 rounded-full" />
                  </td>
                  <td className="py-2 px-6 border-b flex items-center">
                    {client.personalIdentification.fullName}
                    {isNew && <span className="ml-2 text-sm text-green-500 bg-green-100 rounded-full px-2">New</span>}
                  </td>
                  <td className="py-2 px-6 border-b">{client.status}</td>
                  <td className="py-2 px-6 border-b">{client.Date}</td>
                  <td className="py-2 px-6 border-b">
                    <button onClick={() => handleOpenModal(client)} className="text-blue-600 hover:underline">
                      View Details
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
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
            <div className="flex flex-col items-center mb-6">
              <img src={selectedClient.photo} alt={selectedClient.personalIdentification.fullName} className="w-32 h-32 rounded-full mb-2" />
              <h2 className="text-2xl font-bold">{selectedClient.personalIdentification.fullName}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold">Personal Identification</h3>
                <p><strong>Date of Birth:</strong> {selectedClient.personalIdentification.dateOfBirth}</p>
                <p><strong>Nationality:</strong> {selectedClient.personalIdentification.nationality}</p>
                <p><strong>Gender:</strong> {selectedClient.personalIdentification.gender}</p>

                <h3 className="text-xl font-semibold mt-4">Identification Documents</h3>
                <p><strong>ID Type:</strong> {selectedClient.identificationDocuments.idType}</p>
                <p><strong>ID Number:</strong> {selectedClient.identificationDocuments.idNumber}</p>
                <p><strong>Expiration Date:</strong> {selectedClient.identificationDocuments.expirationDate}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Address Verification</h3>
                <p><strong>Residential Address:</strong> {selectedClient.addressVerification.residentialAddress}</p>
                <p><strong>Proof of Address Document:</strong> {selectedClient.addressVerification.proofOfAddressDocument}</p>

                <h3 className="text-xl font-semibold mt-4">Contact Information</h3>
                <p><strong>Phone Number:</strong> {selectedClient.contactInformation.phoneNumber}</p>
                <p><strong>Email Address:</strong> {selectedClient.contactInformation.emailAddress}</p>

                <h3 className="text-xl font-semibold mt-4">Financial Information</h3>
                <p><strong>Bank Account Number:</strong> {selectedClient.financialInformation.bankAccountDetails.accountNumber}</p>
                <p><strong>Bank Name:</strong> {selectedClient.financialInformation.bankAccountDetails.bankName}</p>
                <p><strong>Source of Income:</strong> {selectedClient.financialInformation.sourceOfIncome}</p>
                <p><strong>Employer Name:</strong> {selectedClient.financialInformation.employmentInformation.employerName}</p>
                <p><strong>Job Title:</strong> {selectedClient.financialInformation.employmentInformation.jobTitle}</p>
                
                <h3 className="text-xl font-semibold mt-4">Digital Identity Verification</h3>
                <p><strong>IP Address:</strong> {selectedClient.digitalIdentityVerification.deviceInformation.ipAddress}</p>
                <p><strong>Device ID:</strong> {selectedClient.digitalIdentityVerification.deviceInformation.deviceID}</p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={handleRejection} className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600">Reject</button>
              <button onClick={handleApproval} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Approve</button>
              <button onClick={handleCloseModal} className="bg-gray-300 px-4 py-2 rounded ml-2 hover:bg-gray-400">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kyc;
