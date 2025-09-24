import React, { useState } from "react";
import Button from "../ui/Button";


const ProjectForm = ({ onSave, onCancel }) => {
 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    try {
      setError("");
      const projectData = {
        name: name.trim(),
        description: description.trim(),
      };

  

      // Update parent state if onSave is passed down
      if (onSave) onSave(projectData);

      // Reset form fields
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Error creating project:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong while creating the project.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-800"
        >
          Project Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full bg-bunker-lighter border-bunker-lighter border-1 rounded-md shadow-sm 
                     focus:ring-primary focus:border-primary sm:text-sm text-gray-800 p-2"
          autoFocus
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-800"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full bg-bunker-lighter border-1 border-bunker-lighter rounded-md shadow-sm 
                     focus:ring-primary focus:border-primary sm:text-sm text-gray-800 p-2"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="bg-black cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="secondary"
          className="bg-black cursor-pointer"
        >
          Save Project
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
