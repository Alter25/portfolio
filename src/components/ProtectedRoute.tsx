import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, loading, checkSession } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkSession();
  }, [])

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [loading, isAuthenticated])

  if (loading) {
    return <p className="text-center text-zinc-400 mt-20">Cargando...</p>
  }

  if (!isAuthenticated) return null;

  return <div>
    {children}
  </div>

}