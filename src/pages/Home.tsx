import { useEffect, useState } from "react";
import { useProjectsStore } from "../stores/projectStore";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import type { Project } from "../types/project";

export default function Home() {
  const { projects, loading, error, fetchProjects } = useProjectsStore();
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [])

  if (loading) return (
    <p className="text-center text-zinc-400 mt-20">Cargando...</p>
  )
  if (error) return (
    <p className="text-center text-zinc-400 mt-20">{error}</p>
  )
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-8">Proyectos</h1>
      {
        projects.length === 0 ? (
          <p className="text-zinc-400 text-sm">No hay proyectos</p>
        ) :
          (
            <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {
                projects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setSelected(project)} />
                ))
              }
            </div>
          )
      }
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </main>
  )

  return <></>
}