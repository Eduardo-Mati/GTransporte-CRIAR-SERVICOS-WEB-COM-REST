import { useState, useEffect, useCallback } from 'react';
import './Frotas.css';

const STORAGE_KEY = 'frotas';

const emptyForm = {
  placa: '',
  modelo: '',
  ano: '',
  capacidade: '',
  status: 'Ativo',
};

function Frotas() {
  const [frotas, setFrotas] = useState([]);
  const [modal, setModal] = useState(null); // 'add' | 'edit' | 'delete'
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);


  const handleSubmitAdd = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch('http://localhost:3000/api/fleets', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newFrota = await res.json();
        const updated = [...frotas, newFrota];
        setFrotas(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setModal(null);
        setForm({ placa: '', modelo: '', ano: '', capacidade: '', status: 'Ativo' });
      }else{
        alert('Erro ao adicionar frota. Verifique os dados e tente novamente.');
      }
    }catch(error){
      alert('Erro ao adicionar frota');
      console.error(error);
    };
  };

  const handleSubmitEdit = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch(`http://localhost:3000/api/fleets/${editId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = frotas.map((f) => (f.fleetId === editId ? { ...f, ...form } : f));
        setFrotas(updated);
        localStorage.setItem('frotas', JSON.stringify(updated));
        setModal(null);
      }else{
        alert('Erro ao editar frota. Verifique os dados e tente novamente.');
      }
    }catch(error){
      alert('Erro ao editar frota');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try{
      const res = await fetch(`http://localhost:3000/api/fleets/${deleteId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if(res.ok){
        const updated = frotas.filter((f) => f.fleetId !== deleteId);
        setFrotas(updated);
        localStorage.setItem('frotas', JSON.stringify(updated));
        setModal(null);
      }else{
        alert('Erro ao excluir frota. Tente novamente.');
      }
    }catch(error){
      alert('Erro ao excluir frota');
      console.error(error);
    }
  };

  const filtered = frotas.filter(
    (f) =>
      (f.placa ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (f.modelo ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  };

  const fetchFrotas = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/fleets', { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        const frotasList = Array.isArray(data) ? data : [];
        setFrotas(frotasList);
        localStorage.setItem('frotas', JSON.stringify(frotasList));
      } else {
        const cached = JSON.parse(localStorage.getItem('frotas') || '[]');
        setFrotas(cached);
      }
    } catch (error) {
      console.error('Error fetching frotas:', error);
      const cached = JSON.parse(localStorage.getItem('frotas') || '[]');
      setFrotas(cached);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchFrotas();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [fetchFrotas]);

  if (loading)
    return (
      <div className="page-container">
        <p>Carregando frotas...</p>
      </div>
    );


return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Frotas</h1>
          <p className="page-sub">Gerencie os veículos da frota</p>
        </div>
        <div className="page-actions">
          <button className="btn-action btn-add" onClick={() => { setForm({ placa: '', modelo: '', ano: '', capacidade: '', status: 'Ativo' }); setModal('add'); }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Adicionar
          </button>
        </div>
      </div>

      <div className="search-bar-wrap">
        <input
          className="search-bar"
          placeholder="Buscar por placa ou modelo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <p>Nenhuma frota cadastrada</p>
            <button className="btn-action btn-add" onClick={() => { setForm({ placa: '', modelo: '', ano: '', capacidade: '', status: 'Ativo' }); setModal('add'); }}>Adicionar frota</button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Capacidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.fleetId}>
                  <td><span className="badge-placa">{f.placa}</span></td>
                  <td>{f.modelo}</td>
                  <td>{f.ano}</td>
                  <td>{f.capacidade} pess.</td>
                  <td>
                    <span className={`status-badge ${f.status === 'Ativo' ? 'status-ativo' : 'status-inativo'}`}>
                      {f.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="row-btn row-edit" onClick={() => { setForm({ ...f }); setEditId(f.fleetId); setModal('edit'); }} title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="row-btn row-delete" onClick={() => { setDeleteId(f.fleetId); setModal('delete-confirm'); }} title="Excluir">
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
              <h2>Adicionar Frota</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <form onSubmit={handleSubmitAdd} className="modal-form">
              <div className="form-group">
                <label>Placa *</label>
                <input required placeholder="ABC-1234" value={form.placa} onChange={(e) => setForm({ ...form, placa: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Modelo *</label>
                <input required placeholder="Ex: Volkswagen 17.230" value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ano *</label>
                  <input required type="number" placeholder="2024" value={form.ano} onChange={(e) => setForm({ ...form, ano: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Capacidade *</label>
                  <input required type="number" placeholder="45" value={form.capacidade} onChange={(e) => setForm({ ...form, capacidade: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Ativo</option>
                  <option>Inativo</option>
                  <option>Em manutenção</option>
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

      {/* MODAL EDITAR */}
      {modal === 'edit' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Frota</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <form onSubmit={handleSubmitEdit} className="modal-form">
              <div className="form-group">
                <label>Placa *</label>
                <input required value={form.placa} onChange={(e) => setForm({ ...form, placa: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Modelo *</label>
                <input required value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ano *</label>
                  <input required type="number" value={form.ano} onChange={(e) => setForm({ ...form, ano: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Capacidade *</label>
                  <input required type="number" value={form.capacidade} onChange={(e) => setForm({ ...form, capacidade: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Ativo</option>
                  <option>Inativo</option>
                  <option>Em manutenção</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancelar</button>
                <button type="submit" className="btn-confirm btn-edit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EXCLUIR */}
      {modal === 'delete-confirm' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirmar Exclusão</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <p className="modal-desc">Tem certeza que deseja excluir <strong>{frotas.find(f => f.id === deleteId)?.placa}</strong>?</p>
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

export default Frotas;
