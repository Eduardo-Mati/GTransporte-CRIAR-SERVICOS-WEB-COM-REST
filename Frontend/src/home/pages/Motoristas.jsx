import { useState, useEffect } from 'react';
import './Motoristas.css';

const STORAGE_KEY = 'motoristas';

const emptyForm = {
  nome: '',
  cnh: '',
  categoria: 'B',
  telefone: '',
  status: 'Ativo',
};

function Motoristas() {
  const [motoristas, setMotoristas] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    
  }, []);

  const persist = (data) => {
    setMotoristas(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const openAdd = () => { setForm(emptyForm); setModal('add'); };
  const openEdit = () => { setEditId(null); setForm(emptyForm); setModal('edit'); };
  const openDelete = () => { setDeleteId(null); setModal('delete'); };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    persist([...motoristas, { ...form, id: Date.now() }]);
    setModal(null);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    persist(motoristas.map((m) => (m.id === editId ? { ...form, id: editId } : m)));
    setModal(null);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    persist(motoristas.filter((m) => m.id !== deleteId));
    setModal(null);
  };

  const filtered = motoristas.filter(
    (m) =>
      m.nome.toLowerCase().includes(search.toLowerCase()) ||
      m.cnh.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Motoristas</h1>
          <p className="page-sub">Gerencie os motoristas cadastrados</p>
        </div>
        <div className="page-actions">
          <button className="btn-action btn-add" onClick={openAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Adicionar
          </button>
          <button className="btn-action btn-edit" onClick={openEdit} disabled={motoristas.length === 0}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Editar
          </button>
          <button className="btn-action btn-delete" onClick={openDelete} disabled={motoristas.length === 0}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            Excluir
          </button>
        </div>
      </div>

      <div className="search-bar-wrap">
        <input className="search-bar" placeholder="Buscar por nome ou CNH..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="table-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <p>Nenhum motorista cadastrado</p>
            <button className="btn-action btn-add" onClick={openAdd}>Adicionar motorista</button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNH</th>
                <th>Categoria</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td className="td-name">{m.nome}</td>
                  <td><span className="badge-placa">{m.cnh}</span></td>
                  <td><span className="badge-categoria">{m.categoria}</span></td>
                  <td>{m.telefone}</td>
                  <td><span className={`status-badge ${m.status === 'Ativo' ? 'status-ativo' : 'status-inativo'}`}>{m.status}</span></td>
                  <td>
                    <div className="row-actions">
                      <button className="row-btn row-edit" onClick={() => { setEditId(m.id); setForm({ ...m }); setModal('edit-form'); }} title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="row-btn row-delete" onClick={() => { setDeleteId(m.id); setModal('delete-confirm'); }} title="Excluir">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL ADICIONAR */}
      {modal === 'add' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Adicionar Motorista</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <form onSubmit={handleSubmitAdd} className="modal-form">
              <div className="form-group">
                <label>Nome Completo *</label>
                <input required placeholder="Ex: João da Silva" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>CNH *</label>
                  <input required placeholder="00000000000" value={form.cnh} onChange={(e) => setForm({ ...form, cnh: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Categoria *</label>
                  <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
                    {['A','B','C','D','E','AB','AC','AD','AE'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input placeholder="(00) 00000-0000" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Ativo</option>
                  <option>Inativo</option>
                  <option>De férias</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancelar</button>
                <button type="submit" className="btn-confirm btn-add">Adicionar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR (seleção de lista) */}
      {modal === 'edit' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Motorista</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <p className="modal-desc">Selecione o motorista que deseja editar:</p>
            <div className="select-list">
              {motoristas.map((m) => (
                <div key={m.id} className={`select-item ${editId === m.id ? 'selected' : ''}`} onClick={() => { setEditId(m.id); setForm({ ...m }); }}>
                  <span className="td-name">{m.nome}</span>
                  <span className="badge-placa">{m.cnh}</span>
                  <span className={`status-badge ${m.status === 'Ativo' ? 'status-ativo' : 'status-inativo'}`}>{m.status}</span>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn-confirm btn-edit" disabled={!editId} onClick={() => editId && setModal('edit-form')}>Editar Selecionado</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR FORM */}
      {modal === 'edit-form' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Motorista</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <form onSubmit={handleSubmitEdit} className="modal-form">
              <div className="form-group">
                <label>Nome Completo *</label>
                <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>CNH *</label>
                  <input required value={form.cnh} onChange={(e) => setForm({ ...form, cnh: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Categoria *</label>
                  <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
                    {['A','B','C','D','E','AB','AC','AD','AE'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Ativo</option>
                  <option>Inativo</option>
                  <option>De férias</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancelar</button>
                <button type="submit" className="btn-confirm btn-edit">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EXCLUIR (lista) */}
      {modal === 'delete' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Excluir Motorista</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <p className="modal-desc">Selecione o motorista que deseja excluir:</p>
            <div className="select-list">
              {motoristas.map((m) => (
                <div key={m.id} className={`select-item select-item-delete ${deleteId === m.id ? 'selected-delete' : ''}`} onClick={() => setDeleteId(m.id)}>
                  <span className="td-name">{m.nome}</span>
                  <span className="badge-placa">{m.cnh}</span>
                  <span className={`status-badge ${m.status === 'Ativo' ? 'status-ativo' : 'status-inativo'}`}>{m.status}</span>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn-confirm btn-delete" onClick={handleDelete} disabled={!deleteId}>Confirmar Exclusão</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EXCLUIR RÁPIDO */}
      {modal === 'delete-confirm' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirmar Exclusão</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <p className="modal-desc">Tem certeza que deseja excluir o motorista <strong>{motoristas.find(m => m.id === deleteId)?.nome}</strong>?</p>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn-confirm btn-delete" onClick={handleDelete}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Motoristas;
