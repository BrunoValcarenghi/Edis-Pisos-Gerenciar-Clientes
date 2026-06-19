import { useEffect, useState } from 'react';
import api from '../service/api';

function ListaServicos({ onVerDetalhes, onIrParaCadastro }) {
    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        const carregarServicos = async () => {
            try {
                const resposta = await api.get('/servicos');
                setServicos(resposta.data);
            } catch (erro) {
                console.error('Erro ao buscar servicos:', erro);
            }
        };

        carregarServicos();
    }, []);

    return (
        <main className="app-shell">
            <header className="page-header">
                <div>
                    <p className="eyebrow">Edis Pisos</p>
                    <h1>Banco de Dados</h1>
                    <p className="subtle">Pisos, rodapés e materiais em um painel claro e direto.</p>
                </div>

                <div className="toolbar">
                    <button className="button button-danger" onClick={onIrParaCadastro}>
                        Novo
                    </button>
                </div>
            </header>

            <section className="panel">
                <div className="table-wrap">
                    <table className="data-table" style={{ tableLayout: 'fixed', width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>Cliente</th>
                                <th>Data</th>
                                <th>Valor total</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicos.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="empty-state">Nenhum serviço cadastrado.</td>
                                </tr>
                            ) : (
                                servicos.map((servico) => (
                                    <tr key={servico.id}>
                                        <td
                                            style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                width: '200px'
                                            }}
                                            title={servico.nome}
                                        >
                                            {servico.nome}
                                        </td>
                                        <td
                                            style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                width: '200px'
                                            }}
                                            title={servico.nomeCliente}
                                        >
                                            {servico.nomeCliente}
                                        </td>
                                        <td>{servico.data ? new Date(servico.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : '-'}</td>
                                        <td className="price">R$ {servico.valor}</td>
                                        <td>
                                            <button
                                                className="button button-soft"
                                                onClick={() => onVerDetalhes(servico.id)}
                                            >
                                                Visualizar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default ListaServicos;
