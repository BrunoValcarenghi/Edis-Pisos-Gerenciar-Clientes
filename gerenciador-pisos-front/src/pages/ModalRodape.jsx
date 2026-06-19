import { useState } from 'react';

export default function ModalRodape({ isOpen, onClose, onSaveSuccess }) {
    const [marca, setMarca] = useState('');
    const [altura, setAltura] = useState('');
    const [cor, setCor] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novoRodape = { marca, altura: parseFloat(altura), cor };

        try {
            const response = await fetch('http://localhost:8080/api/rodapes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoRodape),
            });

            if (response.ok) {
                const dadosSalvos = await response.json();
                onSaveSuccess(dadosSalvos);
                onClose();
                setMarca('');
                setAltura('');
                setCor('');
            } else {
                alert('Erro ao salvar o rodape');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Cadastrar novo rodapé</h3>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="modal-rodape-marca">Marca</label>
                        <input id="modal-rodape-marca" type="text" value={marca} onChange={e => setMarca(e.target.value)} required />
                    </div>

                    <div className="field">
                        <label htmlFor="modal-rodape-altura">Altura em cm</label>
                        <input id="modal-rodape-altura" type="number" step="0.1" value={altura} onChange={e => setAltura(e.target.value)} required />
                    </div>

                    <div className="field">
                        <label htmlFor="modal-rodape-cor">Cor</label>
                        <input id="modal-rodape-cor" type="text" value={cor} onChange={e => setCor(e.target.value)} required />
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
