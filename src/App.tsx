import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import Admin from "./pages/Admin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import { Navbar } from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
