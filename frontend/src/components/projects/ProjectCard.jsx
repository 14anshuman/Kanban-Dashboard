import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react"; // small close/delete icon
import Button from "../ui/Button";

const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="relative bg-bunker-light p-6 rounded-lg border border-bunker-lighter hover:border-primary transition-all duration-200">
      {/* Delete button in top-right */}
      <button
        onClick={() => onDelete(project._id)}
        className="absolute top-3 right-3 w-4 h-4 flex items-center justify-center 
                   rounded-full bg-red-400 text-white text-sm shadow-md
                   hover:bg-red-700 hover:shadow-lg  cursor-pointer
                   focus:outline-none focus:ring-2 focus:ring-offset-2 
                   focus:ring-red-500 focus:ring-offset-bunker-light 
                   transition-all duration-200"
        aria-label="Delete project"
      >
        <X size={10} />
      </button>

      <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
      <p className="text-gray-700 mt-2 h-12 overflow-hidden">
        {project.description}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-xs text-gray-600">
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </p>

        {/* View button */}
        <Button
          asChild
          className="bg-black px-5 py-2 rounded-xl font-semibold text-sm shadow-md 
                     hover:bg-primary-hover hover:shadow-lg 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-primary focus:ring-offset-bunker-light 
                     transition-all duration-200"
        >
          <Link to={`/project/${project._id}`}>View Board</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
