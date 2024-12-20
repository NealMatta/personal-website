interface ProjectInfo {
  order: number;
  id: number;
  title: string;
  detail: string;
}

export interface Project {
  id: number;
  title: string;
  tags: string[];
  featured: boolean;
  description: string;
  details: ProjectInfo[];
  images: string[];
}

export interface ProjectCardProps {
  project: Project;
}

export interface ClientSideProjectsProps {
  projects: Project[];
}
