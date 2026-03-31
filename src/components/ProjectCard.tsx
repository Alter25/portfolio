import type { Project } from "@/type/project";

interface Props {
  project?: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <div onClick={onClick} className="">
      <p>{project.name}</p>
    </div>
  )
}