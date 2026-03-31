export interface Project {
  id: string;
  name: string;
  description: string | null;
  tags: string[] | null;
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  created_at: string;
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at'>