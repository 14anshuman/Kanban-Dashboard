import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { STATUS_MAP, TASK_STATUS } from '../../constants';

const StatusChart = ({ tasks }) => {
  const data = Object.values(TASK_STATUS).map(status => ({
    name: STATUS_MAP[status],
    count: tasks.filter(task => task.status === status).length,
  }));

  return (
    <div className="bg-bunker-light p-6 rounded-lg border border-bunker-lighter h-96">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasks by Status</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#161b22',
              borderColor: '#21262d'
            }}
            cursor={{ fill: 'rgba(110, 118, 129, 0.1)' }}
          />
          <Legend />
          <Bar dataKey="count" fill="#2f81f7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;
