import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export function Navbar() {
  const { isAuthenticated, signOut } = useAuthStore()

  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:opacity-70 transition-opacity"
        >
          Jorge — portfolio
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/admin"
                className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Admin
              </Link>
              <button
                onClick={signOut}
                className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}