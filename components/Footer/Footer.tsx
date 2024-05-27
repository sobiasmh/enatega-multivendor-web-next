import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const countries = [
  { name: 'Denmark', flag: '/flags/de.png' },
  { name: 'England', flag: '/flags/en.png' },
  { name: 'France', flag: '/flags/fr.png' },
  { name: 'Cambodia', flag: '/flags/km.png' },
  { name: 'Japan', flag: '/flags/zh.png' },
  { name: 'Denmark', flag: '/flags/de.png' },
  { name: 'France', flag: '/flags/fr.png' },
  { name: 'England', flag: '/flags/en.png' },
  { name: 'Japan', flag: '/flags/zh.png' },

  // Add more countries as needed
];

const Footer = () => {
  return (
    <footer className="py-8 mt-8 px-8">
    <div className="container mx-auto">
      <div className="mb-4">
        <span className="text-left text-xl font-bold text-gray-900">Explore Countries</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {countries.map((country, index) => (
          <div key={index} className="p-4 border flex items-center rounded-lg">
            <img src={country.flag} alt={`${country.name} flag`} className="w-8 h-8 mr-4" />
            <span className="text-gray-700 flex-grow">{country.name}</span>
            <FaArrowRight className="text-gray-700" />
          </div>
        ))}
      </div>
    </div>
  </footer>
  );
};

export default Footer;
