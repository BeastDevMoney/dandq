"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const router = useRouter();
  
    useEffect(() => {
      // Verificar si el usuario ya está autenticado
      async function checkAuth() {
        const res = await fetch('/api/check-auth');
        if (res.ok) {
          router.replace('/dashboard');
        }
      }
      checkAuth();
    }, []);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });
  
        if (response.ok) {
          router.push('/dashboard');
        } else {
          alert('Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
      }
    };
  return (
    <div className="min-h-screen bg-[#3E3838] text-[#BEA5A5] font-inter flex flex-col justify-center items-center p-4">
      <Head>
        <title>D&Q Sign In</title>
        <meta name="description" content="D&Q Sign In Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-black text-center mb-40">D&Q</h1>
        <p className="text-white text-center text-xl">
          El principio del cambio<br />y el inicio de un final
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded bg-black text-white transform transition-transform duration-200 hover:scale-110 focus:outline-none"
          >
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;


//min-h-screen bg-[#3E3838] text-[#BEA5A5] font-inter