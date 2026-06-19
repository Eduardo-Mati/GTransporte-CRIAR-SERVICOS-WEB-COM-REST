import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./reports.css";

const emptyForm = {
  travelId: "",
  content: "",
};

// Helper: lê o token do localStorage e monta os headers
const authHeaders = (json = false) => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (json) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

function Reports() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reports, setReports] = useState([]);
  const [travels, setTravels] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);


  const travelIdFilter = searchParams.get("travelId");

 
  useEffect(() => {
    const headers = authHeaders();


    fetch("http://localhost:3000/api/reports", { headers })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setReports(data);
      })
      .catch((err) => console.error("Erro ao buscar relatórios:", err));


    fetch("http://localhost:3000/api/travels", { headers })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTravels(data);
      })
      .catch((err) => console.error("Erro ao buscar viagens:", err));
  }, []);


  const openAdd = () => {
    setForm({
      ...emptyForm,
      travelId: travelIdFilter || "",
    });
    setModal("add");
  };

  const openEdit = (report) => {
    setForm({ travelId: report.travelId, content: report.content });
    setEditId(report.reportId);
    setModal("edit");
  };


  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/reports", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({ travelId: form.travelId, content: form.content }),
      });

      if (res.ok) {
        const created = await res.json();
        setReports((prev) => [...prev, created]);
        setModal(null);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Erro ao adicionar relatório");
      }
    } catch (error) {
      console.error("Erro ao adicionar relatório:", error);
      alert("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };


  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/reports/${editId}`, {
        method: "PUT",
        headers: authHeaders(true),
        body: JSON.stringify({ travelId: form.travelId, content: form.content }),
      });

      if (res.ok) {
        const updated = await res.json();
        setReports((prev) =>
          prev.map((r) => (r.reportId === editId ? updated : r))
        );
        setModal(null);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Erro ao editar relatório");
      }
    } catch (error) {
      console.error("Erro ao editar relatório:", error);
      alert("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/reports/${deleteId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (res.ok) {
        setReports((prev) => prev.filter((r) => r.reportId !== deleteId));
        setModal(null);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Erro ao excluir relatório");
      }
    } catch (error) {
      console.error("Erro ao excluir relatório:", error);
      alert("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };


  const getTravelLabel = (travelId) => {
    const travel = travels.find((t) => String(t.travelId) === String(travelId));
    return travel ? `${travel.origem} → ${travel.destino}` : "Viagem não encontrada";
  };

  const formatDate = (isoString) => {
    if (!isoString) return "—";
    return new Date(isoString).toLocaleString("pt-BR");
  };


  const filtered = travelIdFilter
    ? reports.filter((r) => String(r.travelId) === String(travelIdFilter))
    : reports;

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ travelId: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Relatórios</h1>
          <p className="page-sub">Relatórios cadastrados por viagem</p>
        </div>
        <div className="page-actions">
          <button className="btn-action btn-add" onClick={openAdd}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Adicionar
          </button>
        </div>
      </div>

      <div className="search-bar-wrap">
        <select
          className="search-bar filter-select"
          value={travelIdFilter || ""}
          onChange={handleFilterChange}
        >
          <option value="">Todas as viagens</option>
          {travels.map((t) => (
            <option key={t.travelId} value={t.travelId}>
              {t.origem} → {t.destino}
            </option>
          ))}
        </select>
      </div>

      <div className="reports-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <p>Nenhum relatório cadastrado</p>
            <button className="btn-action btn-add" onClick={openAdd}>
              Adicionar relatório
            </button>
          </div>
        ) : (
          filtered.map((report) => (
            <div key={report.reportId} className="report-card">
              <div className="report-card-header">
                <div>
                  <span className="report-date">{formatDate(report.data)}</span>
                  <span className="report-travel">
                    {getTravelLabel(report.travelId)}
                  </span>
                </div>
                <div className="row-actions">
                  <button
                    className="row-btn row-edit"
                    onClick={() => openEdit(report)}
                    title="Editar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="row-btn row-delete"
                    onClick={() => {
                      setDeleteId(report.reportId);
                      setModal("delete-confirm");
                    }}
                    title="Excluir"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="report-content">{report.content}</p>
            </div>
          ))
        )}
      </div>

      {/* MODAL ADICIONAR / EDITAR */}
      {(modal === "add" || modal === "edit") && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {modal === "add" ? "Adicionar Relatório" : "Editar Relatório"}
              </h2>
              <button className="modal-close" onClick={() => setModal(null)}>
                ✕
              </button>
            </div>
            <form
              onSubmit={modal === "add" ? handleSubmitAdd : handleSubmitEdit}
              className="modal-form"
            >
              <div className="form-group">
                <label>Viagem *</label>
                <select
                  required
                  value={form.travelId}
                  onChange={(e) =>
                    setForm({ ...form, travelId: e.target.value })
                  }
                >
                  <option value="">Selecione uma viagem</option>
                  {travels.map((t) => (
                    <option key={t.travelId} value={t.travelId}>
                      {t.origem} → {t.destino}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Relatório *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Descreva o que aconteceu na viagem..."
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setModal(null)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-confirm ${modal === "add" ? "btn-add" : "btn-edit"}`}
                >
                  {loading
                    ? "Aguarde..."
                    : modal === "add"
                    ? "Adicionar"
                    : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EXCLUIR */}
      {modal === "delete-confirm" && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirmar Exclusão</h2>
              <button className="modal-close" onClick={() => setModal(null)}>
                ✕
              </button>
            </div>
            <p className="modal-desc">
              Tem certeza que deseja excluir este relatório? Esta ação não pode
              ser desfeita.
            </p>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setModal(null)}
              >
                Cancelar
              </button>
              <button
                className="btn-confirm btn-delete"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Aguarde..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
