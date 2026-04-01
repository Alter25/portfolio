import { useEffect, useState } from "react";
import { useProjectsStore } from "../stores/projectStore";
import ProjectForm from "../components/ProjectForm";
import type { ProjectInsert } from "../types/project";

export default function Admin() {
  const { projects, fetchProjects, addProject, deleteProject } = useProjectsStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [])

  async function handleAdd(data: ProjectInsert, imageFile?: File) {
    await addProject(data, imageFile);
    setShowForm(false);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">Admin</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm px-4 py-2 rounded-lg border border-zinc-200 dark:border-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >{showForm ? "Cancelar" : "Agregar Proyecto"}</button>
      </div>
      {
        showForm && (
          <div className="mb-8 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <ProjectForm
              onSubmit={handleAdd}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )
      }
      <div className="flex flex-col gap-3">

        {
          projects.map(project => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100"> {project.name}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{project.tags?.join(', ')}</p>
              </div>
              <button
                onClick={() => deleteProject(project.id)}
                className="text-xs px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 tansition-colors">
                Eliminar
              </button>
            </div>
          ))
        }
      </div>
    </main>
  )
}
