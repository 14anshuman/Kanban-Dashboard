import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import ProjectCard from '../components/projects/ProjectCard';
import Modal from '../components/ui/Modal';
import ProjectForm from '../components/projects/ProjectForm';
import Button from '../components/ui/Button';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const ProjectsPage= () => {
  const { getProjects, createProject,deleteProject } = useApi();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const projectsData = await getProjects();
      setProjects(projectsData || []);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveProject = async (projectData) => {
    await createProject(projectData);
    setIsModalOpen(false);
    fetchProjects();
  };

  const handleDeleteProject = async (projectId) => {
  try {
    if(window.confirm("Are you sure you want to delete this project")){
await deleteProject(projectId);
    fetchProjects(); 
    }
    // refresh list after deletion
  } catch (err) {
    console.error("Failed to delete project:", err);
  }
};

  if (loading) return <div className="text-center p-8">Loading projects...</div>;

  return (
    <div className="flex h-full w-full bg-bunker text-gray-200">
          {/* Sidebar */}
          <Sidebar />
    
          <div className="flex flex-col flex-1 w-full overflow-y-auto">
            {/* Header */}
            <Header />

        <main className="flex-1 p-0 md:p-4 lg:p-6">
          <div className="flex justify-between items-center mb-6 p-4">
            <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary bg-black rounded-2xl cursor-pointer px-6 py-2 hover:bg-primary-hover"
            >
              Create Project
            </Button>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 mx-4 bg-bunker-light rounded-lg border border-bunker-lighter">
              <h3 className="text-xl text-gray-800 font-semibold">No Projects Found</h3>
              <p className="text-gray-700 mt-4">Get started by creating a new project.</p>
            </div>
          )}

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Create New Project"
          >
            <ProjectForm
              onSave={handleSaveProject}
              onCancel={() => setIsModalOpen(false)}
            />
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;
