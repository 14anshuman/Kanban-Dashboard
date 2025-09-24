import React from 'react';
import { Link } from 'react-router-dom';

const OverdueTasks = ({ tasks = [] }) => {
  const now = new Date();
  const overdue = tasks.filter(task => task.deadline && new Date(task.deadline) < now && task.status !== 'done');

  return (
    <div className="bg-bunker-light p-6 rounded-lg border border-bunker-lighter">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Overdue Tasks ({overdue.length})
      </h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {overdue.length === 0 ? (
          <p className="text-gray-600">No overdue tasks. Great job!</p>
        ) : (
          overdue.map(task => (
            <div key={task.id} className="p-3 bg-bunker-lighter rounded-md border border-red-500/50">
              <Link to={`/project/${task.projectId}`} className="font-semibold text-gray-700 hover:text-primary">
                {task.title}
              </Link>
              <p className="text-sm text-gray-400">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OverdueTasks;
