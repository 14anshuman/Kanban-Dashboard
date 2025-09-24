import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import SummaryCard from '../components/dashboard/SummaryCard';
import StatusChart from '../components/dashboard/StatusChart';
import OverdueTasks from '../components/dashboard/OverdueTasks';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

// Icons
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const ClipboardListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const ExclamationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const DashboardPage = () => {
  const { getProjects, getTasks } = useApi();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projectsData, tasksData] = await Promise.all([getProjects(), getTasks()]);
        setProjects(projectsData || []);
        setTasks(tasksData || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setProjects([]);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getProjects, getTasks]);

  if (loading) return <div className="text-center p-8">Loading dashboard...</div>;

  const overdueCount = tasks.filter(t => new Date(t.deadline) < new Date() && t.status !== 'done').length;

  return (
    <div className="flex h-full w-full bg-bunker text-gray-200">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        {/* Header */}
        <Header />

        <main className="flex-1 p-6 md:p-8 space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SummaryCard title="Total Projects" value={projects.length} icon={<FolderIcon />} className="shadow-lg rounded-xl" />
            <SummaryCard title="Total Tasks" value={tasks.length} icon={<ClipboardListIcon />} className="shadow-lg rounded-xl" />
            <SummaryCard title="Overdue Tasks" value={overdueCount} icon={<ExclamationIcon />} className="shadow-lg rounded-xl bg-red-600 text-white" />
          </div>

          {/* Charts and Overdue Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 shadow-lg rounded-xl bg-bunker-light p-4">
              <StatusChart tasks={tasks} />
            </div>
            <div className="shadow-lg rounded-xl bg-bunker-light p-4">
              <OverdueTasks tasks={tasks} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
