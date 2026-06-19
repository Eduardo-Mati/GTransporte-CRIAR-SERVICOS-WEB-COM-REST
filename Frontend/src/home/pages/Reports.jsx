import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./reports.css";

const STORAGE_KEY = "reports";

const emptyForm = {
  travelId: "",
  content: "",
};

// Mock temporário só pra visualizar o layout — depois isso vem da API /api/travels
const mockTravels = [
  { id: 1, origem: "João Pessoa", destino: "Recife" },
  { id: 2, origem: "Campina Grande", destino: "Natal" },
  { id: 3, origem: "Patos", destino: "João Pessoa" },
];

function Reports() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reports, setReports] = useState([]);
  const [travels] = useState(mockTravels);
  const [modal, setModal] = useState(null); // 'add' | 'edit' | 'delete-confirm'
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Lê o travelId da URL (ex: /home/reports?travelId=3), se existir
  const travelIdFilter = searchParams.get("travelId");

  useEffect(() => {

  }, []);

  const persist = (data) => {
    setReports(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const openAdd = () => {
    setForm({
      ...emptyForm,
      // Se já veio filtrado por uma viagem, pré-seleciona ela no form
      travelId: travelIdFilter || "",
    });
    setModal("add");
  };

  const openEdit = (report) => {
    setForm({ ...report });
    setEditId(report.id);
    setModal("edit");
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const novo = {
      ...form,
      id: Date.now(),
      data: new Date().toISOString(),
    };
    persist([...reports, novo]);
    setModal(null);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const atualizados = reports.map((r) =>
      r.id === editId ? { ...r, ...form } : r,
    );
    persist(atualizados);
    setModal(null);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    persist(reports.filter((r) => r.id !== deleteId));
    setModal(null);
  };

  const getTravelLabel = (travelId) => {
    const travel = travels.find((t) => String(t.id) === String(travelId));
    return travel
      ? `${travel.origem} → ${travel.destino}`
      : "Viagem não encontrada";
  };

  const formatDate = (isoString) => {
    if (!isoString) return "—";
    return new Date(isoString).toLocaleString("pt-BR");
  };

  // Filtra a lista se houver um travelId na URL
  const filtered = travelIdFilter
    ? reports.filter((r) => String(r.travelId) === String(travelIdFilter))
    : reports;

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ travelId: value });
    } else {
      setSearchParams({}); // remove o filtro, volta pra URL limpa
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
            <option key={t.id} value={t.id}>
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
            <div key={report.id} className="report-card">
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
                      setDeleteId(report.id);
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

      {/* MODAL ADICIONAR/EDITAR */}
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
                    <option key={t.id} value={t.id}>
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
                  className={`btn-confirm ${modal === "add" ? "btn-add" : "btn-edit"}`}
                >
                  {modal === "add" ? "Adicionar" : "Salvar Alterações"}
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
              <button className="btn-confirm btn-delete" onClick={handleDelete}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
