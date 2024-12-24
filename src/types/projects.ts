interface ProjectInfo {
  order: number;
  id: number;
  title: string;
  detail: string;
}

interface ProjectImage {
  id: number;
  url: string;
  project_id: number;
}

export interface Project {
  id: number;
  title: string;
  tags: string[];
  featured: boolean;
  description: string;
  details: ProjectInfo[];
  images: ProjectImage[];
}

export interface ProjectCardProps {
  project: Project;
}

export interface AllProjectProps {
  projects: Project[];
}
