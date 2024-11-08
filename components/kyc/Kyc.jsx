'use client';
import React, { useState, useEffect } from 'react';
import {
  FaIdBadge,
  FaPhone,
  FaMapMarkerAlt,
  FaFingerprint,
  FaVenusMars,
  FaPassport,
  FaBriefcase,
  FaFilePdf,
  FaFileAlt,
  FaMapMarkedAlt,
  FaSearch,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaTimes,
  FaBirthdayCake,
  FaFlag,
  FaTransgenderAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaIdCard,
  FaCalendarAlt,
  FaBan,
  FaWallet,
  FaCircle,
  FaDesktop,
  FaWifi,
  FaCamera,
  FaMoneyBillAlt,
  FaCreditCard,
  FaChartLine,FaShieldAlt
} from 'react-icons/fa';
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

  const handleApproveClient = () => {
    if (selectedClient) {
      const updatedClients = clients.map((c) =>
        c.personalIdentification.fullName === selectedClient.personalIdentification.fullName
          ? { ...c, status: 'Approved' }
          : c
      );
      setClients(updatedClients);
      localStorage.setItem('kycData', JSON.stringify(updatedClients));
      setAlertMessage(`Approved: ${selectedClient.personalIdentification.fullName}`);
    }
    handleCloseModal();
  };
  
  const handleRejectClient = () => {
    if (selectedClient) {
      const updatedClients = clients.map((c) =>
        c.personalIdentification.fullName === selectedClient.personalIdentification.fullName
          ? { ...c, status: 'Rejected' }
          : c
      );
      setClients(updatedClients);
      localStorage.setItem('kycData', JSON.stringify(updatedClients));
      setAlertMessage(`Rejected: ${selectedClient.personalIdentification.fullName}`);
    }
    handleCloseModal();
  };
  
  const handleBlockClient = () => {
    if (selectedClient) {
      const updatedClients = clients.map((c) =>
        c.personalIdentification.fullName === selectedClient.personalIdentification.fullName
          ? { ...c, status: 'Blocked' }
          : c
      );
      setClients(updatedClients);
      localStorage.setItem('kycData', JSON.stringify(updatedClients));
      setAlertMessage(`Blocked: ${selectedClient.personalIdentification.fullName}`);
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
      <h1 className="text-3xl font-bold mb-6">Client KYC</h1>

      {/* Alert Message */}
      {alertMessage && (
        <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
          {alertMessage}
        </div>
      )}

     {/* Filters */}
     <div className="mb-6 flex items-center gap-6 bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
  {/* KYC Status Filter */}
  <div className="w-full sm:w-[220px]">
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
      className="w-full rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200 ease-in-out"
    />
  </div>

  

  {/* Name Filter (Right-Aligned) */}
  <div className="relative w-full sm:w-[220px] ml-auto">
    <input
      type="text"
      placeholder="Search by name"
      value={nameFilter}
      onChange={(e) => setNameFilter(e.target.value)}
      className="w-full p-3 pl-12 pr-4 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-600"
    />
    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl relative overflow-auto z-60">
      <button 
        onClick={handleCloseModal} 
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
        <FaTimes size={18} />
      </button>

      <form className="space-y-6 text-sm">
        {/* Client Profile */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={selectedClient.photo || '/fallback-image.jpg'}
            alt={selectedClient.personalIdentification.fullName}
            className="w-24 h-24 rounded-full border-2 border-violet-500 mb-2"
          />
          <h2 className="text-lg font-semibold">{selectedClient.personalIdentification.fullName}</h2>
        </div>

        {/* 3 Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Column: Personal Info */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
              <p className="flex items-center">
                <FaIdBadge className="mr-2 text-violet-500" /> {selectedClient.personalIdentification.dateOfBirth}
              </p>
              <p className="flex items-center">
                <FaFlag className="mr-2 text-violet-500" /> {selectedClient.personalIdentification.nationality}
              </p>
              <p className="flex items-center">
                <FaVenusMars className="mr-2 text-violet-500" /> {selectedClient.personalIdentification.gender}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
              <p className="flex items-center">
                <FaPhone className="mr-2 text-violet-500" /> {selectedClient.contactInformation.phoneNumber}
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2 text-violet-500" /> {selectedClient.contactInformation.emailAddress}
              </p>
            </div>
          </div>

          {/* Second Column: Address & Financial Info */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-violet-500" /> {selectedClient.addressVerification.residentialAddress}
              </p>
              <p className="flex items-center">
                <FaFilePdf className="mr-2 text-violet-500" /> {selectedClient.addressVerification.proofOfAddressDocument}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
              <p className="flex items-center">
                <FaMoneyBillAlt className="mr-2 text-violet-500" /> {selectedClient.financialInformation.sourceOfIncome}
              </p>
              <p className="flex items-center">
                <FaBriefcase className="mr-2 text-violet-500" /> {selectedClient.financialInformation.employmentInformation.jobTitle} at {selectedClient.financialInformation.employmentInformation.employerName}
              </p>
              <p className="flex items-center">
                <FaCreditCard className="mr-2 text-violet-500" /> Bank: {selectedClient.financialInformation.bankAccountDetails.bankName}
              </p>
            </div>
          </div>

          {/* Third Column: Risk Assessment Info */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
              <p className="flex items-center">
                <FaShieldAlt className="mr-2 text-violet-500" /> Purpose: {selectedClient.riskAssessmentInformation.purposeOfAccount}
              </p>
              <p className="flex items-center">
                <FaChartLine className="mr-2 text-violet-500" /> Activity: {selectedClient.riskAssessmentInformation.expectedAccountActivity}
              </p>
            </div>
          </div>
        </div>

        {/* Digital Identity Verification - 2 Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
            <p className="flex items-center">
              <FaFingerprint className="mr-2 text-violet-500" /> Fingerprint: {selectedClient.digitalIdentityVerification.biometricData.fingerprint}
            </p>
            <p className="flex items-center">
              <FaCamera className="mr-2 text-violet-500" /> Facial Recognition: {selectedClient.digitalIdentityVerification.biometricData.facialRecognition}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
            <p className="flex items-center">
              <FaDesktop className="mr-2 text-violet-500" /> Device ID: {selectedClient.digitalIdentityVerification.deviceInformation.deviceID}
            </p>
            <p className="flex items-center">
              <FaWifi className="mr-2 text-violet-500" /> IP Address: {selectedClient.digitalIdentityVerification.deviceInformation.ipAddress}
            </p>
          </div>
        </div>

        {/* Status and Date */}
        <div className="flex justify-between items-center mt-6 text-xs text-gray-600">
          <p className="flex items-center">
            <FaCircle className={`mr-2 ${selectedClient.status === 'Approved' ? 'text-green-500' : 'text-gray-400'}`} /> 
            {selectedClient.status}
          </p>
          <p className="flex items-center">
            <FaCalendarAlt className="mr-2" /> {selectedClient.Date}
          </p>
        </div>

        {/* Conditional Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          {selectedClient.status === 'Approved' && (
            <button
              onClick={handleBlockClient}
              className="bg-red-500 text-white py-1 px-4 rounded text-sm hover:bg-red-600 focus:outline-none"
            >
              Block
            </button>
          )}

          {selectedClient.status === 'Pending' && (
            <>
              <button
                onClick={handleApproveClient}
                className="bg-green-500 text-white py-1 px-4 rounded text-sm hover:bg-green-600 focus:outline-none"
              >
                Approve
              </button>
              <button
                onClick={handleRejectClient}
                className="bg-yellow-500 text-white py-1 px-4 rounded text-sm hover:bg-yellow-600 focus:outline-none"
              >
                Reject
              </button>
            </>
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
