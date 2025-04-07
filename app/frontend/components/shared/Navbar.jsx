import React from 'react';
import { usePage, router } from '@inertiajs/react';

const Navbar = () => {
    const { auth } = usePage().props;
    const currentPath = window.location.pathname; // Get the current path

    const handleLogout = () => {
        router.delete('/logout');
    };

    return (
        <nav className="bg-blue-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <a href="/" className="flex items-center">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <span className="text-white text-2xl font-bold ml-2">Placebook</span>
                    </a>
                    {currentPath === '/' && ( // Check if the current path is the home page
                        <a
                            href="/locations"
                            className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold
                       transform hover:scale-105 transition-transform duration-200 animate-bounce hover:animate-none
                       shadow-md hover:shadow-lg"
                        >
                            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Add Pin
                        </a>
                    )}
                </div>
                <div>
                    {auth?.user?.admin && (
                        <a
                            href="/admin/users"
                            className="inline-flex items-center px-4 py-2 mr-2 bg-red-500 text-white rounded-lg font-semibold
                transform hover:scale-105 transition-transform duration-200
                shadow-md hover:shadow-lg"
                        >
                            Admin
                        </a>
                    )}
                    {auth?.user ? (
                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-2 px-4 rounded-lg
                       transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            Logout
                        </button>
                    ) : (
                        <a
                            href="/login"
                            className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-2 px-4 rounded-lg
                       transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            Login
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;