export interface Project {
  id: number;
  title: string;
  description: string;
}

export interface ProjectCardProps {
  project: Project;
}

export interface ClientSideProjectsProps {
  projects: Project[];
}
