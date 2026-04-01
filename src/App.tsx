import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import Admin from "./pages/Admin";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
