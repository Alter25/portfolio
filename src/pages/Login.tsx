import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!email || !password) return;
    setLoading(true);
    setError(null);
    const err = await signIn(email, password);
    if (err) {
      setError(err);
      setLoading(false);
      return
    }
    navigate('/admin')
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-8">
          Acceder
        </h1>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="text-sm px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-80 disabled:opacity-40 transition-opacity mt-2"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </div>
    </main>
  )
}