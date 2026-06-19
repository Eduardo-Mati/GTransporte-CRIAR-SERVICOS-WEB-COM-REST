import { useState, useEffect } from 'react';
import "./home.css";

const Home = () => {
  const [stats, setStats] = useState({
    totalFrotas: 0,
    motoristasAtivos: 0,
    viagensEmAndamento: 0,
  });

  

  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const [frotasRes, motoristasRes, viagensRes] = await Promise.all([
      fetch('http://localhost:3000/api/fleets', { headers }),
      fetch('http://localhost:3000/api/drivers', { headers }),
      fetch('http://localhost:3000/api/travels', { headers }),
    ]);

    if (frotasRes.ok && motoristasRes.ok && viagensRes.ok) {
      const frotasData = await frotasRes.json();
      const motoristasData = await motoristasRes.json();
      const viagensData = await viagensRes.json();

      setStats({
        totalFrotas: frotasData.length,
        motoristasAtivos: motoristasData.filter(d => d.status === 'Ativo').length,
        viagensEmAndamento: viagensData.filter(v => v.status === 'Em andamento').length,
      });
    } else {
      console.error('Failed to fetch stats');
    }
  }
  useEffect(() => {
    setTimeout(() => {
      fetchStats();
    }, 500);
  }, []);

  return (
    <div className="home-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Painel de Controle</h1>
        <p className="dashboard-subtitle">
          Visão geral do sistema de transporte
        </p>
      </div>

      {/* Linha superior: Frotas (esquerda) + Motoristas (direita) */}
      <div className="stats-top-row">
        <div className="stat-card card-frotas">
          <div className="card-icon-wrap card-icon-frotas">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2"/>
              <path d="M16 8h4l3 4v4h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <div className="card-info">
            <span className="card-label">Total de Frotas</span>
            <span className="card-value">{stats.totalFrotas}</span>
          </div>
          <div className="card-trend">
            <span className="trend-badge trend-up">Cadastradas</span>
          </div>
        </div>

        <div className="stat-card card-motoristas">
          <div className="card-icon-wrap card-icon-motoristas">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className="card-info">
            <span className="card-label">Motoristas Ativos</span>
            <span className="card-value">{stats.motoristasAtivos}</span>
          </div>
          <div className="card-trend">
            <span className="trend-badge trend-green">Ativos</span>
          </div>
        </div>
      </div>

      {/* Linha inferior: Viagens em andamento — lista/card mais amplo */}
      <div className="stats-bottom-row">
        <div className="stat-card card-viagens card-wide">
          <div className="card-icon-wrap card-icon-viagens">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div className="card-info">
            <span className="card-label">Viagens em Andamento</span>
            <span className="card-value">{stats.viagensEmAndamento}</span>
          </div>
          <div className="card-trend">
            <span className="trend-badge trend-yellow">Em andamento</span>
          </div>
          <div className="viagens-list-preview">
            {(() => {
              const viagens = JSON.parse(localStorage.getItem("viagens") || "[]");
              const emAndamento = viagens.filter((v) => v.status === "Em andamento");
              if (emAndamento.length === 0) {
                return <p className="no-viagens">Nenhuma viagem em andamento no momento.</p>;
              }
              return emAndamento.slice(0, 5).map((v) => (
                <div key={v.id} className="viagem-item">
                  <span className="viagem-rota">{v.origem} → {v.destino}</span>
                  <span className="viagem-motorista">{v.motorista}</span>
                  <span className="viagem-status-dot" />
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;