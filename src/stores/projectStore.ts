import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type { Project, ProjectInsert } from "../types/project";

interface ProjectState{
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>
  addProject: (project: ProjectInsert, imageFile?: File) => Promise<void>
  updateProject: (id: string, project: Partial<ProjectInsert>, imageFile?: File) => Promise<void>
  deleteProject:(id:string)=>Promise<void>
}

export const useProjectsStore = create<ProjectState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null })
    const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    if (error) set({ error: error.message })
    else set({ projects: data ?? [] })
    set({loading:false})
  },
  addProject: async (project, imageFile) => {
    let image_url = project.image_url ?? null;

    if (imageFile) {
      const path = `${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(path, imageFile)
      if (uploadError) { set({ error: uploadError.message }); return }
      const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(path)
      image_url = urlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('projects')
      .insert({ ...project, image_url })
      .select()
      .single()
    if (error)  set({ error: error.message })
    else set({projects:[data,...get().projects]})
  },

  updateProject: async (id, project, imageFile?) => {
    let image_url = project.image_url

    if (imageFile) {
      const path = `${Date.now()}-${imageFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(path, imageFile)
      if (uploadError) { set({ error: uploadError.message }); return }
      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(path)
      image_url = urlData.publicUrl
    }

    const { data, error } = await supabase
      .from('projects')
      .update({...project,image_url})
      .eq('id', id)
      .select()
      .single()

    if (error) set({ error: error.message })
    else set({ projects: get().projects.map(p => p.id === id ? data : p) })
  },
  deleteProject: async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) set({ error: error.message })
    else set({ projects: get().projects.filter(p => p.id !== id) })
  },
}))