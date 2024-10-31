// app/login/page.js
import React from 'react';

export default function Login() {
  return (
    <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Let's get started now!</h2>
        <p className="text-gray-500">Or <a href="#" className="text-blue-500 font-semibold">create an account</a> if not registered yet</p>
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Email:</label>
          <input type="email" placeholder="mail@mail.com" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Password:</label>
          <input type="password" placeholder="******" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700">Sign in</button>
      </form>
      <div className="text-center mt-4">
        <a href="#" className="text-sm text-blue-500 font-semibold">Forgot password?</a>
      </div>
    </div>
  );
}
