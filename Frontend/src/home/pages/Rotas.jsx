import { useState} from "react";
import "./rotas.css";

const STORAGE_KEY = "viagens";

const emptyForm = {
  origem: "",
  destino: "",
  motorista: "",
  veiculo: "",
  data: "",
  status: "Em andamento",
};

function Rotas() {
  const [viagens, setViagens] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  const [motoristas, ] = useState(() => JSON.parse(localStorage.getItem("motoristas") || "[]"));
  const [frotas, ] = useState(() => JSON.parse(localStorage.getItem("frotas") || "[]"));
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

  const persist = (data) => {
    setViagens(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const openAdd = () => {
    setForm(emptyForm);
    setModal("add");
  };
  const openDelete = () => {
    setDeleteId(null);
    setModal("delete");
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    persist([...viagens, { ...form, id: Date.now() }]);
    setModal(null);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    persist(
      viagens.map((v) => (v.id === editId ? { ...form, id: editId } : v)),
    );
    setModal(null);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    persist(viagens.filter((v) => v.id !== deleteId));
    setModal(null);
  };

  const statusColor = (s) => {
    if (s === "Em andamento") return "status-andamento";
    if (s === "Concluída") return "status-ativo";
    return "status-inativo";
  };

  const filtered = viagens.filter(
    (v) =>
      v.origem.toLowerCase().includes(search.toLowerCase()) ||
      v.destino.toLowerCase().includes(search.toLowerCase()) ||
      v.motorista.toLowerCase().includes(search.toLowerCase()),
  );

  const formFields = (
    <>
      <div className="form-row">
        <div className="form-group">
          <label>Origem *</label>
          <input
            required
            placeholder="Cidade de partida"
            value={form.origem}
            onChange={(e) => setForm({ ...form, origem: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Destino *</label>
          <input
            required
            placeholder="Cidade de chegada"
            value={form.destino}
            onChange={(e) => setForm({ ...form, destino: e.target.value })}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Motorista</label>
        <select
          value={form.motorista}
          onChange={(e) => setForm({ ...form, motorista: e.target.value })}
        >
          <option value="">Selecione um motorista</option>
          {motoristas.map((m) => (
            <option key={m.id} value={m.nome}>
              {m.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Veículo (Frota)</label>
        <select
          value={form.veiculo}
          onChange={(e) => setForm({ ...form, veiculo: e.target.value })}
        >
          <option value="">Selecione um veículo</option>
          {frotas.map((f) => (
            <option key={f.id} value={f.placa}>
              {f.placa} — {f.modelo}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Data *</label>
          <input
            required
            type="date"
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Em andamento</option>
            <option>Concluída</option>
            <option>Cancelada</option>
            <option>Agendada</option>
          </select>
        </div>
      </div>
    </>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Rotas / Viagens</h1>
          <p className="page-sub">Gerencie as viagens e rotas cadastradas</p>
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
          <button
            className="btn-action btn-edit"
            onClick={() => {
              setEditId(null);
              setForm(emptyForm);
              setModal("edit");
            }}
            disabled={viagens.length === 0}
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
            Editar
          </button>
          <button
            className="btn-action btn-delete"
            onClick={openDelete}
            disabled={viagens.length === 0}
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
            Excluir
          </button>
        </div>
      </div>

      <div className="search-bar-wrap">
        <input
          className="search-bar"
          placeholder="Buscar por origem, destino ou motorista..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p>Nenhuma viagem cadastrada</p>
            <button className="btn-action btn-add" onClick={openAdd}>
              Adicionar viagem
            </button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Origem → Destino</th>
                <th>Motorista</th>
                <th>Veículo</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id}>
                  <td className="td-rota">
                    <span className="rota-texto">
                      {v.origem} → {v.destino}
                    </span>
                  </td>
                  <td>{v.motorista || "—"}</td>
                  <td>
                    <span className="badge-placa">{v.veiculo || "—"}</span>
                  </td>
                  <td>
                    {v.data
                      ? new Date(v.data + "T00:00").toLocaleDateString("pt-BR")
                      : "—"}
                  </td>
                  <td>
                    <span className={`status-badge ${statusColor(v.status)}`}>
                      {v.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="row-btn row-edit"
                        onClick={() => {
                          setEditId(v.id);
                          setForm({ ...v });
                          setModal("edit-form");
                        }}
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
                          setDeleteId(v.id);
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ADD */}
      {modal === "add" && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Adicionar Viagem</h2>
              <button className="modal-close" onClick={() => setModal(null)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitAdd} className="modal-form">
              {formFields}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setModal(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-confirm btn-add">
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SELEÇÃO */}
      {modal === "edit" && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Viagem</h2>
              <button className="modal-close" onClick={() => setModal(null)}>
                ✕
              </button>
            </div>
            <p className="modal-desc">Selecione a viagem que deseja editar:</p>
            <div className="select-list">
              {viagens.map((v) => (
                <div
                  key={v.id}
                  className={`select-item ${editId === v.id ? "selected" : ""}`}
                  onClick={() => {
                    setEditId(v.id);
                    setForm({ ...v });
                  }}
                >
                  <span className="rota-texto">
                    {v.origem} → {v.destino}
                  </span>
                  <span>{v.motorista || "—"}</span>
                  <span className={`status-badge ${statusColor(v.status)}`}>
                    {v.status}
                  </span>
                </div>
              ))}
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
                className="btn-confirm btn-edit"
                disabled={!editId}
                onClick={() => editId && setModal("edit-form")}
              >
                Editar Selecionada
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT FORM */}
      {modal === "edit-form" && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Viagem</h2>
              <button className="modal-close" onClick={() => setModal(null)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitEdit} className="modal-form">
              {formFields}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setModal(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-confirm btn-edit">
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE LISTA */}
      {modal === "delete" && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Excluir Viagem</h2>
              <button className="modal-close" onClick={() => setModal(null)}>
                ✕
              </button>
            </div>
            <p className="modal-desc">Selecione a viagem que deseja excluir:</p>
            <div className="select-list">
              {viagens.map((v) => (
                <div
                  key={v.id}
                  className={`select-item select-item-delete ${deleteId === v.id ? "selected-delete" : ""}`}
                  onClick={() => setDeleteId(v.id)}
                >
                  <span className="rota-texto">
                    {v.origem} → {v.destino}
                  </span>
                  <span>{v.motorista || "—"}</span>
                  <span className={`status-badge ${statusColor(v.status)}`}>
                    {v.status}
                  </span>
                </div>
              ))}
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
                className="btn-confirm btn-delete"
                onClick={handleDelete}
                disabled={!deleteId}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
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
              Tem certeza que deseja excluir a viagem{" "}
              <strong>
                {viagens.find((v) => v.id === deleteId)?.origem} →{" "}
                {viagens.find((v) => v.id === deleteId)?.destino}
              </strong>
              ?
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

export default Rotas;
