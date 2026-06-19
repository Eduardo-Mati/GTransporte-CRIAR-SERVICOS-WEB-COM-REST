import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="about-kicker">Sobre o sistema</p>
        <h1>Gestão de transportes com foco em controle e operação</h1>
        <p>
          Esta aplicação centraliza rotas, frotas, motoristas e relatórios em
          uma interface simples para acompanhar a operação do dia a dia.
        </p>

        <div className="about-actions">
          <Link to="/login" className="about-button primary">
            Entrar
          </Link>
          <Link to="/register" className="about-button secondary">
            Criar conta
          </Link>
        </div>
      </section>

      <section className="about-grid">
        <article className="about-card">
          <h2>Frotas</h2>
          <p>Organize veículos e acompanhe a operação por unidade.</p>
        </article>
        <article className="about-card">
          <h2>Motoristas</h2>
          <p>Cadastre e gerencie os profissionais vinculados ao sistema.</p>
        </article>
        <article className="about-card">
          <h2>Rotas</h2>
          <p>Visualize trajetos e mantenha o planejamento atualizado.</p>
        </article>
        <article className="about-card">
          <h2>Relatórios</h2>
          <p>Consulte dados para apoiar decisões rápidas e objetivas.</p>
        </article>
      </section>
    </main>
  );
}

export default About;
