import { useState } from 'react';
import api from '../service/api';

export default function ModalInsumo({ isOpen, onClose, onSaveSuccess }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/insumos', { nome, descricao });
            if (response.status === 200 || response.status === 201) {
                onSaveSuccess(response.data);
                onClose();
                setNome('');
                setDescricao('');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar o insumo');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Cadastrar novo insumo</h3>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="modal-insumo-nome">Nome</label>
                        <input id="modal-insumo-nome" type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                    </div>

                    <div className="field">
                        <label htmlFor="modal-insumo-descricao">Descrição</label>
                        <input id="modal-insumo-descricao" type="text" value={descricao} onChange={e => setDescricao(e.target.value)} />
                    </div>

                    <div className="modal-actions">
                        <button className="button button-ghost" type="button" onClick={onClose}>Cancelar</button>
                        <button className="button button-danger" type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
