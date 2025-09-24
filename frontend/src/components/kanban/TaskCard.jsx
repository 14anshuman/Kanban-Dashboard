import React from 'react';
import { PRIORITY_COLOR_MAP, PRIORITY_MAP } from '../../constants';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColor = PRIORITY_COLOR_MAP[task.priority];
  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'done';

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task._id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-bunker-light p-4 mb-4 rounded-lg border border-bunker-lighter shadow-md cursor-grab active:cursor-grabbing"
    >
      {/* Title and Edit/Delete Buttons */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-gray-700 break-words">{task.title}</p>
          {task.description && (
            <p className="text-gray-500 text-sm mt-1 break-words">{task.description}</p>
          )}
        </div>

        <div className="flex space-x-1">
          <button onClick={() => onEdit(task)} className="text-gray-500 hover:text-black">
            ✏️
          </button>
          <button onClick={() => onDelete(task._id)} className="text-gray-500 hover:text-red-500">
            🗑️
          </button>
        </div>
      </div>

      {/* Priority Badge, Overdue Indicator, Deadline */}
      <div className="flex items-center justify-between mt-2">
        <span className={`px-1 py-0.5 text-xs font-semibold rounded-full ${priorityColor} text-black`}>
          {PRIORITY_MAP[task.priority]}
        </span>
        {isOverdue && <span className="text-xs text-red-500 font-semibold">Overdue</span>}
        <p className="text-xs text-gray-400">{new Date(task.deadline).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TaskCard;
