'use client';
import React, { useState, useEffect } from 'react';
import { FaFlag, FaEnvelope, FaPhoneAlt, FaDollarSign, FaMapMarkedAlt, FaFileAlt, FaCalendarAlt, FaEye, FaCheckCircle, FaTimesCircle, FaSpinner, FaTimes } from 'react-icons/fa';
import Select from 'react-select';

const EnterpriseKyc = () => {
  const [enterprises, setEnterprises] = useState([]);
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Load the enterprise data from localStorage or data2.json
  useEffect(() => {
    const storedData = localStorage.getItem('enterpriseData');
    if (storedData) {
      setEnterprises(JSON.parse(storedData));
    } else {
      // Import the data from data2.json
      const initialData = require('../../data/data2.json');
      setEnterprises(initialData.enterprises);
      localStorage.setItem('enterpriseData', JSON.stringify(initialData.enterprises));
    }
  }, []);

  const handleOpenModal = (enterprise) => {
    setSelectedEnterprise(enterprise);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEnterprise(null);
    setIsModalOpen(false);
  };

  const handleApproval = (enterprise) => {
    if (enterprise) {
      const updatedEnterprises = enterprises.map((e) =>
        e.enterpriseIdentification.enterpriseID === enterprise.enterpriseIdentification.enterpriseID
          ? { ...e, status: 'Approved' }
          : e
      );
      setEnterprises(updatedEnterprises);
      localStorage.setItem('enterpriseData', JSON.stringify(updatedEnterprises));
      setAlertMessage(`Approved: ${enterprise.enterpriseIdentification.enterpriseName}`);
    }
    handleCloseModal();
  };

  const handleRejection = (enterprise) => {
    if (enterprise) {
      const updatedEnterprises = enterprises.map((e) =>
        e.enterpriseIdentification.enterpriseID === enterprise.enterpriseIdentification.enterpriseID
          ? { ...e, status: 'Rejected' }
          : e
      );
      setEnterprises(updatedEnterprises);
      localStorage.setItem('enterpriseData', JSON.stringify(updatedEnterprises));
      setAlertMessage(`Rejected: ${enterprise.enterpriseIdentification.enterpriseName}`);
    }
    handleCloseModal();
  };

  const filteredEnterprises = enterprises.filter((enterprise) => {
    const matchesStatus = statusFilter ? enterprise.status === statusFilter : true;
    const matchesName = enterprise.enterpriseIdentification.enterpriseName.toLowerCase().includes(nameFilter.toLowerCase());
    return matchesStatus && matchesName;
  });

  const sortedEnterprises = [...filteredEnterprises].sort((a, b) => new Date(b.Date) - new Date(a.Date));

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Enterprise KYC Details</h1>

      {/* Alert Message */}
      {alertMessage && (
        <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
          {alertMessage}
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 flex items-center gap-4 rounded-lg bg-white p-4 shadow-md">
        <Select
          value={{ value: statusFilter, label: statusFilter || 'All Status' }}
          onChange={(option) => setStatusFilter(option.value)}
          options={[
            { value: '', label: 'All Status' },
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
            { value: 'Approved', label: 'Approved' },
            { value: 'Rejected', label: 'Rejected' },
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

      {/* Enterprise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedEnterprises.length > 0 ? (
          sortedEnterprises.map((enterprise) => (
            <div key={enterprise.enterpriseIdentification.enterpriseID} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 max-w-sm mx-auto">
              <div className="flex items-center">
                {/* Image Section */}
                <div className="w-24 h-24 mr-4">
                  <img
                    src={enterprise.photo || '/default-image.jpg'}
                    alt={enterprise.enterpriseIdentification.enterpriseName}
                    className="w-full h-full object-cover rounded-md border-2 border-violet-500"
                  />
                </div>

                {/* Enterprise Info Section */}
                <div className="flex flex-col justify-between">
                  <h2 className="text-xl font-bold mb-2">{enterprise.enterpriseIdentification.enterpriseName}</h2>
                  <div className="flex items-center mb-2">
                    <FaFlag size={20} className="mr-2 text-violet-500" />
                    <p className="text-sm text-gray-500">{enterprise.industry}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaEnvelope size={20} className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-500">{enterprise.contactInformation.emailAddress}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaPhoneAlt size={20} className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-500">{enterprise.contactInformation.phoneNumber}</p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center mb-2">
                    {enterprise.status === 'Approved' && <FaCheckCircle className="text-green-500 mr-1" />}
                    {enterprise.status === 'Pending' && <FaSpinner className="text-yellow-500 animate-spin mr-1" />}
                    {enterprise.status === 'Rejected' && <FaTimesCircle className="text-red-500 mr-1" />}
                    <p className="text-sm text-gray-500">{enterprise.status}</p>
                  </div>

                  {/* Eye Icon to Open Modal */}
                  <div className="mt-4 flex justify-end">
                    <button onClick={() => handleOpenModal(enterprise)} className="text-blue-600 hover:underline">
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

      {/* Modal for Enterprise Details */}
      {isModalOpen && selectedEnterprise && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl relative overflow-auto">
            {/* Close Button */}
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>

            <form className="space-y-8">
              {/* Enterprise Info Section */}
              <div className="flex flex-col items-center mb-6">
                <img
                  src={selectedEnterprise.photo || '/default-image.jpg'}
                  alt={selectedEnterprise.enterpriseIdentification.enterpriseName}
                  className="w-32 h-32 rounded-full border-4 border-violet-500 mb-2"
                />
                <h2 className="text-2xl font-bold">{selectedEnterprise.enterpriseIdentification.enterpriseName}</h2>
                <p className="text-gray-500">{selectedEnterprise.enterpriseIdentification.enterpriseID}</p>
              </div>

              {/* Enterprise Info Grid (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Left Column: Financial & Contact Info */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
                  <h3 className="text-xl font-semibold text-violet-600">Financial Information</h3>
                  <div className="flex items-center">
                    <FaDollarSign size={20} className="mr-2 text-violet-500" />
                    <p>Annual Revenue: ${selectedEnterprise.financialInformation.annualRevenue}</p>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign size={20} className="mr-2 text-violet-500" />
                    <p>Profit Margin: {selectedEnterprise.financialInformation.profitMargin}%</p>
                  </div>
                  <h3 className="text-xl font-semibold text-violet-600">Contact Info</h3>
                  <div className="flex items-center">
                    <FaPhoneAlt size={20} className="mr-2 text-violet-500" />
                    <p>{selectedEnterprise.contactInformation.phoneNumber}</p>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope size={20} className="mr-2 text-violet-500" />
                    <p>{selectedEnterprise.contactInformation.emailAddress}</p>
                  </div>
                </div>

                {/* Right Column: Location & Team Info */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
                  <h3 className="text-xl font-semibold text-violet-600">Location</h3>
                  <div className="flex items-center">
                    <FaMapMarkedAlt size={20} className="mr-2 text-violet-500" />
                    <p>{selectedEnterprise.enterpriseLocation.headquartersAddress}</p>
                  </div>

                  <h3 className="text-xl font-semibold text-violet-600">Team Members</h3>
                  <ul className="space-y-2">
                    {selectedEnterprise.team.map((member) => (
                      <li key={member.employeeID} className="flex justify-between">
                        <span>{member.teamMemberName} - {member.role}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold text-violet-600">Status</h3>
                  <div className="flex items-center">
                    <p>{selectedEnterprise.status}</p>
                  </div>
                </div>
              </div>

              {/* Approval / Rejection Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleApproval(selectedEnterprise)}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRejection(selectedEnterprise)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterpriseKyc;
