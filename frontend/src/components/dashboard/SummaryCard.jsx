import React from 'react';

const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="bg-bunker-light p-6 rounded-lg border border-bunker-lighter flex items-center space-x-4">
      <div className="p-3 bg-bunker-lighter rounded-full text-primary text-gray-700">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-2xl font-bold text-gray-600">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
