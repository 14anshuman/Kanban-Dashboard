import React, { useState, useEffect } from 'react';
import { PRIORITIES, PRIORITY_MAP } from '../../constants';
import Button from '../ui/Button';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium'); // default priority
  const [deadline, setDeadline] = useState('');
  const [description,setDescription]=useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setDeadline(task.deadline.split('T')[0]); // Format for date input
    } else {
      setTitle('');
      setPriority('medium');
      setDeadline('');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) {
      setError('Title and deadline are required.');
      return;
    }
    setError('');
    onSave({
      title,
      description,
      priority,
      deadline: new Date(deadline).toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-800">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder='Enter title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full bg-bunker-lighter border-bunker-lighter rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-gray-600 p-2"
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-800">
          Description
        </label>
        <input
          type="textarea"
          id="description"
          placeholder='Enter title'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full bg-bunker-lighter border-bunker-lighter rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-gray-600 p-2"
        />
      </div>
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-800">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="mt-1 block w-full bg-bunker-lighter border-bunker-lighter rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-gray-500 p-2"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_MAP[p]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-800">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="mt-1 block w-full bg-bunker-lighter border-bunker-lighter rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-gray-500 p-2"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} className='bg-black'>
          Cancel
        </Button>
        <Button type="submit" variant='secondary' className='bg-black'>{task ? 'Save Changes' : 'Create Task'}</Button>
      </div>
    </form>
  );
};

export default TaskForm;
