import React from 'react';

const Navigator = () => {
  return (
    <div className="flex items-center space-x-2 p-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-grey-500">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      </svg>
      <span className="text-lg ">Islamabad, Pakistan</span>
    </div>
  );
};

export default Navigator;
