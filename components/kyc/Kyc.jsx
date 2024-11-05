'use client';
import React, { useState, useEffect } from 'react';
import {FaLaptop,FaFingerprint,FaRegListAlt,FaUserShield,FaBriefcase, FaDollarSign,FaFileAlt,FaMapMarkedAlt,FaSearch, FaEye, FaCheckCircle, FaTimesCircle, FaSpinner, FaTimes, FaBirthdayCake, FaFlag, FaTransgenderAlt, FaPhoneAlt, FaEnvelope, FaIdCard, FaCalendarAlt, FaBan, FaWallet } from 'react-icons/fa';
import Select from 'react-select';

const Kyc = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kycStatusFilter, setKycStatusFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('kycData');
    if (storedData) {
      setClients(JSON.parse(storedData));
    } else {
      const initialData = require('../../data/data2.json');
      setClients(initialData.clients);
      localStorage.setItem('kycData', JSON.stringify(initialData.clients));
    }
  }, []);

  const handleOpenModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  const handleApproval = (client) => {
    if (client) {
      const updatedClients = clients.map((c) =>
        c.personalIdentification.fullName === client.personalIdentification.fullName
          ? { ...c, status: 'Approved' }
          : c
      );
      setClients(updatedClients);
      localStorage.setItem('kycData', JSON.stringify(updatedClients));
      setAlertMessage(`Approved: ${client.personalIdentification.fullName}`);
    }
    handleCloseModal();
  };

  const handleRejection = (client) => {
    if (client) {
      const updatedClients = clients.map((c) =>
        c.personalIdentification.fullName === client.personalIdentification.fullName
          ? { ...c, status: 'Rejected' }
          : c
      );
      setClients(updatedClients);
      localStorage.setItem('kycData', JSON.stringify(updatedClients));
      setAlertMessage(`Rejected: ${client.personalIdentification.fullName}`);
    }
    handleCloseModal();
  };

  const handleBlock = (client) => {
    if (client) {
      const updatedClients = clients.map((c) =>
        c.personalIdentification.fullName === client.personalIdentification.fullName
          ? { ...c, status: 'Blocked' }
          : c
      );
      setClients(updatedClients);
      localStorage.setItem('kycData', JSON.stringify(updatedClients));
      setAlertMessage(`Blocked: ${client.personalIdentification.fullName}`);
    }
    handleCloseModal();
  };

  const filteredClients = clients.filter((client) => {
    const matchesKycStatus = kycStatusFilter ? client.status === kycStatusFilter : true;
    const matchesName = client.personalIdentification.fullName.toLowerCase().includes(nameFilter.toLowerCase());
    return matchesKycStatus && matchesName;
  });

  const sortedClients = [...filteredClients].sort((a, b) => new Date(b.Date) - new Date(a.Date));

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">KYC Details</h1>

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

      {/* Client Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {sortedClients.length > 0 ? (
    sortedClients.map((client) => (
      <div key={client.personalIdentification.fullName} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 max-w-sm mx-auto">
        <div className="flex items-center">
          {/* Image Section */}
          <div className="w-24 h-24 mr-4">
            <img
              src={client.photo}
              alt={client.personalIdentification.fullName}
              className="w-full h-full object-cover rounded-md border-2 border-violet-500"
            />
          </div>

          {/* Client Info Section */}
          <div className="flex flex-col justify-between">
            <h2 className="text-xl font-bold mb-2">{client.personalIdentification.fullName}</h2>

            {/* Nationality */}
            <div className="flex items-center mb-2">
              <FaFlag size={20} className="mr-2 text-violet-500" />
              <p className="text-sm text-gray-500">{client.personalIdentification.nationality}</p>
            </div>

            {/* Email */}
            <div className="flex items-center mb-2">
              <FaEnvelope size={20} className="mr-2 text-gray-500" />
              <p className="text-sm text-gray-500">{client.contactInformation.emailAddress}</p>
            </div>

            {/* Contact Number */}
            <div className="flex items-center mb-2">
              <FaPhoneAlt size={20} className="mr-2 text-gray-500" />
              <p className="text-sm text-gray-500">{client.contactInformation.phoneNumber}</p>
            </div>

            {/* Status */}
            <div className="flex items-center mb-2">
              {client.status === 'Approved' && <FaCheckCircle className="text-green-500 mr-1" />}
              {client.status === 'Pending' && <FaSpinner className="text-yellow-500 animate-spin mr-1" />}
              {client.status === 'Rejected' && <FaTimesCircle className="text-red-500 mr-1" />}
              {client.status === 'Blocked' && <FaTimesCircle className="text-orange-500 mr-1" />}
              <p className="text-sm text-gray-500">{client.status}</p>
            </div>

            {/* Eye Icon to Open Modal */}
            <div className="mt-4 flex justify-end">
              <button onClick={() => handleOpenModal(client)} className="text-blue-600 hover:underline">
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


      

      {isModalOpen && selectedClient && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl relative overflow-auto">
      
      {/* Close Button */}
      <button 
        onClick={handleCloseModal} 
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <FaTimes size={20} />
      </button>

      <form className="space-y-8">
        {/* Client Info Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={selectedClient.photo}
            alt={selectedClient.personalIdentification.fullName}
            className="w-32 h-32 rounded-full border-4 border-violet-500 mb-2"
          />
          <h2 className="text-2xl font-bold">{selectedClient.personalIdentification.fullName}</h2>
          <p className="text-gray-500">{selectedClient.personalIdentification.dateOfBirth}</p>
        </div>

        {/* Client Info Grid (3 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Left Column: Personal Info & Contact */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-violet-600">Personal Identification</h3>
            <div className="flex items-center">
              <FaBirthdayCake size={20} className="mr-2 text-violet-500" />
              <p>{selectedClient.personalIdentification.dateOfBirth}</p>
            </div>
            <div className="flex items-center">
              <FaFlag size={20} className="mr-2 text-violet-500" />
              <p>{selectedClient.personalIdentification.nationality}</p>
            </div>
            <div className="flex items-center">
              <FaTransgenderAlt size={20} className="mr-2 text-violet-500" />
              <p>{selectedClient.personalIdentification.gender}</p>
            </div>

            {/* Contact Info */}
            <h3 className="text-xl font-semibold text-green-600 mt-6">Contact Info</h3>
            <div className="flex items-center">
              <FaPhoneAlt size={20} className="mr-2 text-green-500" />
              <p>{selectedClient.contactInformation.phoneNumber}</p>
            </div>
            <div className="flex items-center">
              <FaEnvelope size={20} className="mr-2 text-green-500" />
              <p>{selectedClient.contactInformation.emailAddress}</p>
            </div>
          </div>

          {/* Middle Column: Documents & Financial Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
            {/* Identification Documents */}
            <h3 className="text-xl font-semibold text-orange-600">Identification Documents</h3>
            <div className="flex items-center">
              <FaIdCard size={20} className="mr-2 text-orange-500" />
              <p>{selectedClient.identificationDocuments.idType}: {selectedClient.identificationDocuments.idNumber}</p>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt size={20} className="mr-2 text-orange-500" />
              <p>Expires: {selectedClient.identificationDocuments.expirationDate}</p>
            </div>

            {/* Address Verification */}
            <h3 className="text-xl font-semibold text-blue-600 mt-6">Address Info</h3>
            <div className="flex items-center">
              <FaMapMarkedAlt size={20} className="mr-2 text-blue-500" />
              <p>{selectedClient.addressVerification.residentialAddress}</p>
            </div>
            <div className="flex items-center">
              <FaFileAlt size={20} className="mr-2 text-blue-500" />
              <p>{selectedClient.addressVerification.proofOfAddressDocument}</p>
            </div>

            {/* Financial Info */}
            <h3 className="text-xl font-semibold text-teal-600 mt-6">Financial Info</h3>
            <div className="flex items-center">
              <FaBan size={20} className="mr-2 text-teal-500" />
              <p>{selectedClient.financialInformation.bankAccountDetails.bankName}</p>
            </div>
            <div className="flex items-center">
              <FaWallet size={20} className="mr-2 text-teal-500" />
              <p>{selectedClient.financialInformation.bankAccountDetails.accountNumber}</p>
            </div>
          </div>

          {/* Right Column: Risk Assessment & Digital Identity */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
            {/* Risk Assessment */}
            <h3 className="text-xl font-semibold text-yellow-600">Risk Assessment</h3>
            <div className="flex items-center">
              <FaUserShield size={20} className="mr-2 text-yellow-500" />
              <p>Account Purpose: {selectedClient.riskAssessmentInformation.purposeOfAccount}</p>
            </div>
            <div className="flex items-center">
              <FaRegListAlt size={20} className="mr-2 text-yellow-500" />
              <p>Expected Activity: {selectedClient.riskAssessmentInformation.expectedAccountActivity}</p>
            </div>

            {/* Digital Identity Verification */}
            <h3 className="text-xl font-semibold text-purple-600 mt-6">Digital Identity Verification</h3>
            <div className="flex items-center">
              <FaFingerprint size={20} className="mr-2 text-purple-500" />
              <p>Facial Recognition: {selectedClient.digitalIdentityVerification.biometricData.facialRecognition}</p>
            </div>
            <div className="flex items-center">
              <FaFingerprint size={20} className="mr-2 text-purple-500" />
              <p>Fingerprint: {selectedClient.digitalIdentityVerification.biometricData.fingerprint}</p>
            </div>
            <div className="flex items-center">
              <FaLaptop size={20} className="mr-2 text-purple-500" />
              <p>Device ID: {selectedClient.digitalIdentityVerification.deviceInformation.deviceID}</p>
            </div>
            <div className="flex items-center">
              <FaLaptop size={20} className="mr-2 text-purple-500" />
              <p>IP Address: {selectedClient.digitalIdentityVerification.deviceInformation.ipAddress}</p>
            </div>
          </div>

        </div>

        {/* Status & Action Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={() => handleRejection(selectedClient)}
            className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ${selectedClient.status === 'Pending' || selectedClient.status === 'Approved' ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={selectedClient.status !== 'Pending' && selectedClient.status !== 'Approved'}
          >
            Reject
          </button>
          <button
            onClick={() => handleApproval(selectedClient)}
            className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ${selectedClient.status === 'Approved' || selectedClient.status === 'Rejected' ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={selectedClient.status === 'Approved' || selectedClient.status === 'Rejected'}
          >
            Approve
          </button>
          {selectedClient.status === 'Approved' && (
            <button
              onClick={() => handleBlock(selectedClient)}
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

export default Kyc;
