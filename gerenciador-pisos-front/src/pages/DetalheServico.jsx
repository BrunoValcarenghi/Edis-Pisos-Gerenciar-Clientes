import { useEffect, useState } from 'react';
import api from '../service/api';

function DetalheServico({ idServico, onVoltar }) {
    const [servico, setServico] = useState(null);

    useEffect(() => {
        const buscarDetalhes = async () => {
            try {
                const resposta = await api.get(`/servicos/${idServico}`);
                setServico(resposta.data);
            } catch (erro) {
                console.error('Erro ao buscar detalhes:', erro);
                alert('Erro ao carregar os dados completos do servico.');
            }
        };

        if (idServico) buscarDetalhes();
    }, [idServico]);

    if (!servico) {
        return (
            <main className="app-shell">
                <section className="panel section">
                    <p className="subtle">Carregando dados do orçamento...</p>
                </section>
            </main>
        );
    }

    return (
        <main className="app-shell">
            <header className="page-header">
                <div>
                    <p className="eyebrow">Detalhes</p>
                    <h1 style={{ wordBreak: 'break-word', display: 'block', maxWidth: 1000 }}>{servico.nome || `Serviço ${servico.id}`}</h1>
                    <p className="subtle">Data: {servico.data ? new Date(servico.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : '-'}</p>
                </div>

                <button className="button button-ghost" onClick={onVoltar}>
                    Voltar para lista
                </button>
            </header>

            <article className="panel">
                <div className="detail-hero">
                    <h2>Resumo do orçamento</h2>
                    <p className="subtle" >Cliente, medidas, materiais e observações do serviço.</p>
                </div>

                <section className="section material-list">
                    <h3>Dados do cliente</h3>
                    <div className="detail-grid detail-grid-2 ">
                        <Info
                            label="Nome do cliente"
                            value={<span style={{ wordBreak: 'break-word', display: 'block' }}>{servico.nomeCliente}</span>}
                        />
                        <Info label="Telefone" value={servico.telefone || 'Não informado'} />
                    </div>

                    <Info
                        label="Endereço"
                        value={<span style={{ wordBreak: 'break-word', display: 'block' }}>{servico.endereco || 'Não informado'}</span>}
                    />

                </section>

                <section className="section">
                    <h3>Valores e dimensões</h3>
                    <div className="detail-grid">
                        <Info label="Área total" value={`${servico.area} m²`} />
                        <Info label="Valor por m²" value={`R$ ${servico.valorM2 || servico.valorm2 || '0,00'}`} />
                        <Info label="Valor total" value={`R$ ${servico.valor}`} className="price" />
                    </div>
                </section>

                <section className="section">
                    <h3>Especificações do piso</h3>
                    <div className="detail-grid">
                        <Info label="Piso" value={servico.piso?.nome || 'Não especificado'} />
                        <Info label="Marca" value={servico.piso?.marca || 'Não especificada'} />
                        <Info label="Cor / modelo" value={servico.cor?.nome || 'Não especificada'} />
                    </div>
                </section>

                <section className="section">
                    <h3>Acabamento / rodapé</h3>
                    <div className="detail-grid">
                        <Info label="Marca do rodapé" value={servico.rodape?.marca || 'Não especificada'} />
                        <Info label="Altura" value={servico.rodape?.altura ? `${servico.rodape.altura} cm` : 'Não especificada'} />
                        <Info label="Cor" value={servico.rodape?.cor || 'Não especificada'} />
                    </div>
                </section>

                <section className="section">
                    <h3>Insumos e materiais extras</h3>
                    {!servico.insumos || servico.insumos.length === 0 ? (
                        <p className="subtle">Nenhum insumo ou material extra foi utilizado neste serviço.</p>
                    ) : (
                        <div className="material-list">
                            {servico.insumos.map((item) => (
                                <div key={item.id} className="material-item">
                                    <div>
                                        <strong>{item.insumo?.nome}</strong>
                                        <p className="subtle" style={{ wordBreak: 'break-word', display: 'block', maxWidth: 1000 }}>{item.insumo?.descricao || 'Sem descrição'}</p>
                                    </div>
                                    <span className="badge">Qtd: {item.quantidade}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="section">
                    <h3>Descrição geral / observações</h3>
                    <div className="note" style={{ wordBreak: 'break-word', display: 'block'}}>
                        {servico.descricao || 'Nenhuma observação ou descrição extra registrada para este serviço.'}
                    </div>
                </section>
            </article>
        </main>
    );
}

function Info({ label, value, className = '' }) {
    return (
        <div className="info-item">
            <span className="info-label">{label}</span>
            <span className={`info-value ${className}`}>{value}</span>
        </div>
    );
}

export default DetalheServico;
