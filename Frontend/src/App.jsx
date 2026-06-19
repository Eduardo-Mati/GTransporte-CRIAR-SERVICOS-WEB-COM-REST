import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './login/Login.jsx'
import Home from './home/home.jsx'
import Register from './register/Register.jsx'
import Frotas from './home/pages/Frotas.jsx'
import Rotas from './home/pages/Rotas.jsx'
import Motoristas from './home/pages/Motoristas.jsx'
import LayoutHome from './home/LayoutHome.jsx'
import About from './login/pages/About.jsx'
import Contact from './login/pages/Contact.jsx'
import Reports from './home/pages/Reports.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Navigate to="/login" />}></Route>
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/home" element={<LayoutHome />}>
          <Route index path="/home/main" element={<Home />} />
          <Route path="/home/frotas" element={<Frotas />} />
          <Route path="/home/rotas" element={<Rotas />} />
          <Route path="/home/motoristas" element={<Motoristas />} />
          <Route path="/home/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
