import type { Project } from '../types/project'

interface Props {
  project?: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <div onClick={onClick} className="cursor:pointer rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
      <div>
        {
          project?.image_url ? (
            <img
              src={project?.image_url}
              alt={project?.name}
              className="w-full h-full object-cover" />)
            : (
              <span className="text-zinc-300 dark:text-zinc-700 text-sm">sin imagen</span>
            )}
      </div>
      <div className="p-3">
        <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100 mb-2">{project?.name}</p>
        <div>
          {
            project?.tags?.slice(0, 3).map((tag: string | null) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{tag}</span>
            ))
          }
        </div>
      </div>
    </div>
  )
}