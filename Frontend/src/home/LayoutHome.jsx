import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./LayoutHome.css";

function LayoutHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Sessão encerrada.");
    navigate("/login");
  };
  return (
    <>
      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <div className="nav-brand">
            <img
              className="nav-logo"
              src="https://imgs.search.brave.com/JFqLwhlpK-TzoE5XVo_fmQyRkT6KVTACfCrboQv33r8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTQv/MTI4LzY5Ni9zbWFs/bC9hLXN0eWxpemVk/LWJsdWUtZGVsaXZl/cnktdHJ1Y2staWxs/dXN0cmF0aW9uLWZv/ci10cmFuc3BvcnQt/YW5kLWxvZ2lzdGlj/cy10aGVtZXMtcG5n/LnBuZw"
              alt="Bus Logo"
            />
            <span className="nav-brand-name">GTransporte</span>
          </div>

          <ul className="nav-links">
            <li className="active">
              <a onClick={() => navigate("/home/main")} href="/home/main">
                Home
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/home/frotas")} href="/home/frotas">
                Frotas
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/home/rotas")} href="/home/rotas">
                Rotas
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/home/motoristas")} href="/home/motoristas">
                Motoristas
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/home/reports")} href="/home/reports">
                Relatórios
              </a>
            </li>
          </ul>

          <div className="nav-profile">
            
            <img
            className="avatar"
            src="https://imgs.search.brave.com/vgTiX1UVJWxFqIuZ7JizAkeSs9Mm5igjGG5sN-68f0E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Qcm9m/aWxlLnBuZw"
            alt="Profile"
            />
            
            <div className="user-info">
              <span className="user-name">Eduardo Mattias</span>
              <span className="user-role">Administrador</span>
            </div>
            <button
              className="btn-logout"
              onClick={handleLogout}
              title="Sair do Sistema"
            >
              <span>Sair</span>
              <svg
                className="icon-logout"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default LayoutHome;
