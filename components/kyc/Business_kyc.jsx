'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaBuilding, FaPhoneAlt, FaEnvelope, FaDollarSign, FaEye, FaCheckCircle, FaTimesCircle, FaSpinner, FaTimes } from 'react-icons/fa';
import Select from 'react-select';

const BusinessKyc = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kycStatusFilter, setKycStatusFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('businessKycData');
    if (storedData) {
      setBusinesses(JSON.parse(storedData));
    } else {
      const initialData = require('../../data/data2.json'); // Path to your data file
      setBusinesses(initialData.businesses);
      localStorage.setItem('businessKycData', JSON.stringify(initialData.businesses));
    }
  }, []);

  const handleOpenModal = (business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBusiness(null);
    setIsModalOpen(false);
  };

  const handleApproval = (business) => {
    if (business) {
      const updatedBusinesses = businesses.map((b) =>
        b.businessIdentification.businessRegistrationNumber === business.businessIdentification.businessRegistrationNumber
          ? { ...b, status: 'Approved' }
          : b
      );
      setBusinesses(updatedBusinesses);
      localStorage.setItem('businessKycData', JSON.stringify(updatedBusinesses));
      setAlertMessage(`Approved: ${business.businessIdentification.businessName}`);
    }
    handleCloseModal();
  };

  const handleRejection = (business) => {
    if (business) {
      const updatedBusinesses = businesses.map((b) =>
        b.businessIdentification.businessRegistrationNumber === business.businessIdentification.businessRegistrationNumber
          ? { ...b, status: 'Rejected' }
          : b
      );
      setBusinesses(updatedBusinesses);
      localStorage.setItem('businessKycData', JSON.stringify(updatedBusinesses));
      setAlertMessage(`Rejected: ${business.businessIdentification.businessName}`);
    }
    handleCloseModal();
  };

  const handleBlock = (business) => {
    if (business) {
      const updatedBusinesses = businesses.map((b) =>
        b.businessIdentification.businessRegistrationNumber === business.businessIdentification.businessRegistrationNumber
          ? { ...b, status: 'Blocked' }
          : b
      );
      setBusinesses(updatedBusinesses);
      localStorage.setItem('businessKycData', JSON.stringify(updatedBusinesses));
      setAlertMessage(`Blocked: ${business.businessIdentification.businessName}`);
    }
    handleCloseModal();
  };

  // Filter and sort businesses
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesKycStatus = kycStatusFilter ? business.status === kycStatusFilter : true;
      const matchesName = business.businessIdentification.businessName.toLowerCase().includes(nameFilter.toLowerCase());
      return matchesKycStatus && matchesName;
    });
  }, [businesses, kycStatusFilter, nameFilter]);

  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => new Date(b.Date) - new Date(a.Date));

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Business KYC</h1>

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

      {/* Business Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedBusinesses.length > 0 ? (
          sortedBusinesses.map((business) => (
            <div key={business.businessIdentification.businessRegistrationNumber} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 max-w-sm mx-auto">
              <div className="flex items-center">
                {/* Image Section */}
                <div className="w-24 h-24 mr-4">
                  {business.photo && (
                    <img
                      src={business.photo}
                      alt={business.businessIdentification.businessName}
                      className="w-full h-full object-cover rounded-md border-2 border-violet-500"
                    />
                  )}
                </div>

                {/* Business Info Section */}
                <div className="flex flex-col justify-between">
                  <h2 className="text-xl font-bold mb-2">{business.businessIdentification.businessName}</h2>

                  {/* Industry */}
                  <div className="flex items-center mb-2">
                    <FaBuilding size={20} className="mr-2 text-violet-500" />
                    <p className="text-sm text-gray-500">{business.businessIdentification.industry}</p>
                  </div>

                  {/* Contact Email */}
                  <div className="flex items-center mb-2">
                    <FaEnvelope size={20} className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-500">{business.contactInformation.emailAddress}</p>
                  </div>

                  {/* Contact Number */}
                  <div className="flex items-center mb-2">
                    <FaPhoneAlt size={20} className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-500">{business.contactInformation.phoneNumber}</p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center mb-2">
                    {business.status === 'Approved' && <FaCheckCircle className="text-green-500 mr-1" />}
                    {business.status === 'Pending' && <FaSpinner className="text-yellow-500 animate-spin mr-1" />}
                    {business.status === 'Rejected' && <FaTimesCircle className="text-red-500 mr-1" />}
                    {business.status === 'Blocked' && <FaTimesCircle className="text-orange-500 mr-1" />}
                    <p className="text-sm text-gray-500">{business.status}</p>
                  </div>

                  {/* Eye Icon to Open Modal */}
                  <div className="mt-4 flex justify-end">
                    <button onClick={() => handleOpenModal(business)} className="text-blue-600 hover:underline">
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
{/* Modal for Business Details */}
{isModalOpen && selectedBusiness && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-2xl relative overflow-auto z-60">
      {/* Close Button */}
      <button
        onClick={handleCloseModal}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        <FaTimes size={18} />
      </button>

      <form className="space-y-4">
        {/* Business Info Section */}
        <div className="flex flex-col items-center mb-2">
          {selectedBusiness.photo && (
            <img
              src={selectedBusiness.photo}
              alt={selectedBusiness.businessIdentification.businessName}
              className="w-20 h-20 rounded-full border-2 border-violet-500 mb-1"
            />
          )}
          <h2 className="text-lg font-bold mb-1">{selectedBusiness.businessIdentification.businessName}</h2>
          <p className="text-sm text-gray-500">{selectedBusiness.businessIdentification.industry}</p>
          <p className="text-xs text-gray-400">{selectedBusiness.businessLocation.officeAddress}</p>
        </div>

        {/* Grid Layout for Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Business Identification */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm space-y-1">
            <h3 className="text-md font-semibold text-violet-600">Business ID</h3>
            <div className="flex items-center text-sm">
              <FaBuilding className="mr-1 text-violet-500" />
              <p>{selectedBusiness.businessIdentification.businessName}</p>
            </div>
            <p className="text-xs text-gray-400">{selectedBusiness.businessIdentification.businessRegistrationNumber}</p>
            <p className="text-xs text-gray-400">{selectedBusiness.businessIdentification.taxIdentificationNumber}</p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm space-y-1">
            <h3 className="text-md font-semibold text-green-600">Contact</h3>
            <div className="flex items-center text-sm">
              <FaPhoneAlt className="mr-1 text-green-500" />
              <p>{selectedBusiness.contactInformation.phoneNumber}</p>
            </div>
            <div className="flex items-center text-sm">
              <FaEnvelope className="mr-1 text-green-500" />
              <p>{selectedBusiness.contactInformation.emailAddress}</p>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm space-y-1">
            <h3 className="text-md font-semibold text-indigo-600">Financials</h3>
            <div className="text-sm">
              <FaDollarSign className="mr-1 text-indigo-500" /> 
              Revenue: ${selectedBusiness.financialInformation.revenue}
            </div>
            <p className="text-xs">Expenses: ${selectedBusiness.financialInformation.operatingExpenses}</p>
            <p className="text-xs">Net Profit: ${selectedBusiness.financialInformation.netProfit}</p>
          </div>

          {/* Employees */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm space-y-1">
            <h3 className="text-md font-semibold text-blue-600">Employees</h3>
            <ul className="space-y-1 text-sm">
              {selectedBusiness.employees.map((employee) => (
                <li key={employee.employeeID} className="flex justify-between">
                  <p>{employee.employeeName}</p>
                  <span className="text-xs text-gray-500">{employee.employeePosition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={() => handleRejection(selectedBusiness)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
          >
            Reject
          </button>
          <button
            onClick={() => handleApproval(selectedBusiness)}
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm"
          >
            Approve
          </button>
          {selectedBusiness.status === 'Approved' && (
            <button
              onClick={() => handleBlock(selectedBusiness)}
              className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 text-sm"
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

export default BusinessKyc;
