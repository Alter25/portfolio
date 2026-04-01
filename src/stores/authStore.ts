import { create } from "zustand";
import { supabase } from "../lib/supabase";

interface AuthState{
  isAuthenticated: boolean;
  loading: boolean;
  checkSession: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<string | null>
  signOut: ()=>Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  loading: false,
  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    set({ isAuthenticated: true })
    return null
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ isAuthenticated: false });
  },
  checkSession: async () =>
  {
    const { data } = await supabase.auth.getSession();
    set({
      isAuthenticated: !!data.session,
      loading:false
    })
  }
}))