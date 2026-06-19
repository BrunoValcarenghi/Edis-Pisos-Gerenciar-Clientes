import { useState } from 'react';
import api from '../service/api';

export default function ModalPiso({ isOpen, onClose, onSaveSuccess }) {
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [corAtual, setCorAtual] = useState('');
    const [coresLista, setCoresLista] = useState([]);

    if (!isOpen) return null;

    const handleAdicionarCor = () => {
        if (!corAtual.trim()) return;
        if (coresLista.some(c => c.nome.toLowerCase() === corAtual.toLowerCase())) {
            alert('Esta cor ja foi adicionada!');
            return;
        }
        setCoresLista([...coresLista, { nome: corAtual.trim() }]);
        setCorAtual('');
    };

    const handleRemoverCor = (index) => {
        setCoresLista(coresLista.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (coresLista.length === 0) {
            alert('Adicione pelo menos uma cor para este piso!');
            return;
        }

        try {
            const response = await api.post('/pisos', { nome, marca, cores: coresLista });
            if (response.status === 200 || response.status === 201) {
                onSaveSuccess(response.data);
                onClose();
                setNome('');
                setMarca('');
                setCoresLista([]);
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar o piso');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Cadastrar novo piso</h3>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="modal-piso-nome">Nome do piso</label>
                        <input id="modal-piso-nome" type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                    </div>

                    <div className="field">
                        <label htmlFor="modal-piso-marca">Marca</label>
                        <input id="modal-piso-marca" type="text" value={marca} onChange={e => setMarca(e.target.value)} required />
                    </div>

                    <div className="field">
                        <label htmlFor="modal-piso-cor">Cores do piso</label>
                        <div className="inline-fields">
                            <input id="modal-piso-cor" type="text" value={corAtual} onChange={e => setCorAtual(e.target.value)} />
                            <button className="button button-soft" type="button" onClick={handleAdicionarCor}>Adicionar</button>
                        </div>
                    </div>

                    {coresLista.length > 0 && (
                        <div className="chips">
                            {coresLista.map((c, i) => (
                                <span key={i} className="chip">
                                    {c.nome}
                                    <button type="button" onClick={() => handleRemoverCor(i)} aria-label={`Remover ${c.nome}`}>
                                        x
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="modal-actions">
                        <button className="button button-ghost" type="button" onClick={onClose}>Cancelar</button>
                        <button className="button button-danger" type="submit">Salvar piso</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
