'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdEmail, MdLock } from 'react-icons/md'; // Importing React Icons

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const hardCodedUsername = 'admin';
  const hardCodedPassword = 'admin';

  const handleLogin = () => {
    if (username === hardCodedUsername && password === hardCodedPassword) {
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen bg-violet-500">
      <div className="flex flex-col w-full max-w-md rounded-2xl shadow-lg bg-white bg-opacity-90 p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome Back!</h2>
        <p className="text-gray-500 mb-6 text-center">Please login to your account to continue.</p>
        <div className="relative mb-4">
          <MdEmail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Email Address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-600"
          />
        </div>
        <div className="relative mb-4">
          <MdLock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-600"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-violet-600 text-sm">Forgot Password?</a>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition-colors mb-4"
        >
          LOGIN
        </button>
        <button
          className="w-full bg-violet-100 text-violet-600 py-3 rounded-lg hover:bg-violet-200 transition-colors"
        >
          SIGNUP
        </button>
        <p className="text-gray-500 text-xs text-center mt-4">
          By signing up, you agree to our company's <a href="#" className="text-violet-600">Terms and Conditions</a> and <a href="#" className="text-violet-600">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
