import type { Project } from "../types/project";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 " onClick={onClose}>
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          {
            project.image_url ? (
              <img
                src={project.image_url}
                alt={project.name}
                className="w-full h-full object-cover"
              />) : (
              <span className="text-zinc-300 dark:text-zinc-700 text-sm">sin imagen</span>
            )
          }
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <h2 className="font-medium text-zinc-900 dark:text-zinc-100">
              {project.name}
            </h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors text-lg leading-none"
            ></button>
          </div>
          {
            project.description && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{project.description}</p>
            )
          }
          {
            project.tags && project.tags.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-zinc-400 mb-2">Stack</p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{tag}</span>
                  ))}
                </div>
              </div>
            )
          }
          <div className="flex gap-2">
            {
              project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >GitHub</a>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}