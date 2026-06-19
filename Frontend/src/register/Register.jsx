import { useState } from "react";
import "./Register.css";
import "../scripts/stars_animation.jsx";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendRegister = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      await response.json();
      if (response.ok) {
        alert("Registro realizado com sucesso");
        navigate("/login");
      } else {
        alert("Erro ao realizar registro");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Ocorreu um erro ao tentar registrar");
    }
  };


  return (
    <div className="page">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="deco-m" aria-hidden="true"></div>

      <nav>
        <ul className="nav-links">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <div className="brand">
          <img
            className="logo-bus"
            src="https://imgs.search.brave.com/JFqLwhlpK-TzoE5XVo_fmQyRkT6KVTACfCrboQv33r8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTQv/MTI4LzY5Ni9zbWFs/bC9hLXN0eWxpemVk/LWJsdWUtZGVsaXZl/cnktdHJ1Y2staWxs/dXN0cmF0aW9uLWZv/ci10cmFuc3BvcnQt/YW5kLWxvZ2lzdGlj/cy10aGVtZXMtcG5n/LnBuZw"
            alt="Bus"
          />
          <span>Gerenciamento de Transportes</span>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <h2>Bem-vindo ao Gerenciamento de Transportes</h2>
          <h1>Registro</h1>

          <form
            className="signup-form"
            method="POST"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-field">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn-next" type="submit" onClick={() => sendRegister(name, email, password)}>
              Registrar
            </button>

            <button
              className="btn-register"
              onClick={() => {
                navigate("/login");
              }}
            >
              Já possui uma conta?
            </button>
          </form>

          <p className="disclaimer">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="hero-right">
          <div className="photo-glow"></div>
          <div className="photo-overlay" id="stars-container"></div>
        </div>
      </section>
    </div>
  );
}

export default Register;
