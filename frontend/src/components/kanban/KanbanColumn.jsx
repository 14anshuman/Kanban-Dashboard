import React from 'react';
import TaskCard from './TaskCard';

const KanbanColumn = ({ status, title, tasks, onDrop, onEditTask, onDeleteTask }) => {
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) onDrop(taskId, status);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="bg-bunker w-full md:w-1/3 p-4 rounded-lg border border-bunker-lighter flex-shrink-0"
    >
      <h3 className="font-bold text-lg mb-4 text-gray-800 flex justify-between items-center">
        <span>{title}</span>
        <span className="text-sm bg-bunker-lighter text-gray-700 rounded-full px-2 py-1">{tasks.length}</span>
      </h3>

      <div className="space-y-4 h-full overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
