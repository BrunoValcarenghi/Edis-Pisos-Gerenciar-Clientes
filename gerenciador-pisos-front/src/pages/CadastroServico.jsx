import { useState, useEffect } from 'react';
import ModalRodape from './ModalRodape';
import ModalInsumo from './ModalInsumo';
import ModalPiso from './ModalPiso';
import api from '../service/api';

export default function CadastroServico({ onVoltar }) {
    const [nome, setNome] = useState('');
    const [nomeCliente, setNomeCliente] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [valor, setValor] = useState('');
    const [valorM2, setValorM2] = useState('');
    const [descricao, setDescricao] = useState('');
    const [area, setArea] = useState('');
    const [data, setData] = useState('');

    const [pisos, setPisos] = useState([]);
    const [cores, setCores] = useState([]);
    const [rodapes, setRodapes] = useState([]);
    const [todosInsumos, setTodosInsumos] = useState([]);

    const [pisoSelecionado, setPisoSelecionado] = useState('');
    const [corSelecionada, setCorSelecionada] = useState('');
    const [rodapeSelecionado, setRodapeSelecionado] = useState('');

    const [insumoAtualId, setInsumoAtualId] = useState('');
    const [quantidadeInsumoAtual, setQuantidadeInsumoAtual] = useState('');
    const [insumosAdicionados, setInsumosAdicionados] = useState([]);

    const [isModalRodapeOpen, setIsModalRodapeOpen] = useState(false);
    const [isModalInsumoOpen, setIsModalInsumoOpen] = useState(false);
    const [isModalPisoOpen, setIsModalPisoOpen] = useState(false);

    useEffect(() => {
        api.get('/pisos').then(res => setPisos(res.data));
        api.get('/rodapes').then(res => setRodapes(res.data));
        api.get('/insumos').then(res => setTodosInsumos(res.data));
    }, []);

    useEffect(() => {
        if (pisoSelecionado) {
            api.get(`/pisos/${pisoSelecionado}/cores`)
                .then(res => setCores(res.data))
                .catch(err => console.error(err));
        }
    }, [pisoSelecionado]);

    const handleAdicionarInsumo = () => {
        if (!insumoAtualId || !quantidadeInsumoAtual) {
            alert('Selecione um insumo e digite a quantidade!');
            return;
        }

        const insumoObjeto = todosInsumos.find(i => i.id === parseInt(insumoAtualId));

        if (insumosAdicionados.some(item => item.insumo.id === insumoObjeto.id)) {
            alert('Este insumo ja foi adicionado! Remova ou altere a quantidade.');
            return;
        }

        const novoItem = {
            insumo: insumoObjeto,
            quantidade: parseFloat(quantidadeInsumoAtual)
        };

        setInsumosAdicionados([...insumosAdicionados, novoItem]);
        setInsumoAtualId('');
        setQuantidadeInsumoAtual('');
    };

    const handleRemoverInsumo = (id) => {
        setInsumosAdicionados(insumosAdicionados.filter(item => item.insumo.id !== id));
    };

    const handlePisoSalvo = (novoPiso) => {
        setPisos([...pisos, novoPiso]);
        setPisoSelecionado(novoPiso.id);
        setCores(novoPiso.cores || []);
        setCorSelecionada('');
    };

    const handleInsumoSalvo = (novoInsumo) => {
        setTodosInsumos([...todosInsumos, novoInsumo]);
        setInsumoAtualId(novoInsumo.id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novoServico = {
            nome,
            nomeCliente,
            endereco,
            telefone,
            valor: parseFloat(valor),
            valorM2: parseFloat(valorM2),
            descricao,
            area: parseFloat(area),
            data: data,
            piso: pisoSelecionado ? { id: parseInt(pisoSelecionado) } : null,
            cor: corSelecionada ? { id: parseInt(corSelecionada) } : null,
            rodape: rodapeSelecionado ? { id: parseInt(rodapeSelecionado) } : null,
            insumos: insumosAdicionados.map(item => ({
                insumo: { id: item.insumo.id },
                quantidade: item.quantidade
            }))
        };

        try {
            const response = await api.post('/servicos', novoServico);
            if (response.status === 200 || response.status === 201) {
                alert('Orcamento cadastrado com sucesso!');
                onVoltar();
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar o servico.');
        }
    };

    return (
        <main className="app-shell">
            <header className="page-header">
                <div>
                    <p className="eyebrow">Novo registro</p>
                    <h1>Adicionando novo</h1>
                    <p className="subtle">Preencha os dados do cliente, piso, acabamento e insumos.</p>
                </div>

                <button className="button button-ghost" onClick={onVoltar}>
                    Voltar para lista
                </button>
            </header>

            <form className="panel" onSubmit={handleSubmit}>
                <section className="section">
                    <div className="section-title">
                        <h3>Dados principais</h3>
                    </div>

                    <div className="form-grid">
                        <div className="field">
                            <label htmlFor="nome">Nome do serviço</label>
                            <input id="nome" type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                        </div>

                        <div className="field">
                            <label htmlFor="nomeCliente">Nome do cliente</label>
                            <input id="nomeCliente" type="text" value={nomeCliente} onChange={e => setNomeCliente(e.target.value)} />
                        </div>

                        <div className="field">
                            <label htmlFor="endereco">Endereço</label>
                            <input id="endereco" type="text" value={endereco} onChange={e => setEndereco(e.target.value)} />
                        </div>

                        <div className="field">
                            <label htmlFor="telefone">Telefone</label>
                            <input id="telefone" type="text" value={telefone} onChange={e => setTelefone(e.target.value)} />
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="section-title">
                        <h3>Valores e medidas</h3>
                    </div>

                    <div className="form-grid-3">
                        <div className="field">
                            <label htmlFor="area">Área (m²)</label>
                            <input id="area" type="number" value={area} onChange={e => setArea(e.target.value)} />
                        </div>

                        <div className="field">
                            <label htmlFor="valorM2">Valor por m²</label>
                            <input id="valorM2" type="number" value={valorM2} onChange={e => setValorM2(e.target.value)} />
                        </div>

                        <div className="field">
                            <label htmlFor="valor">Valor total</label>
                            <input id="valor" type="number" value={valor} onChange={e => setValor(e.target.value)} />
                        </div>

                        <div className="field">
                            <label htmlFor="data">Data do serviço</label>
                            <input id="data" type="date" value={data} onChange={e => setData(e.target.value)} />
                        </div>

                        <div className="field field-full">
                            <label htmlFor="descricao">Descrição e observações</label>
                            <textarea id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} />
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="section-title">
                        <h3>Piso e acabamento</h3>
                    </div>

                    <div className="form-grid">
                        <div className="field">
                            <label htmlFor="piso">Piso</label>
                            <div className="inline-fields">
                                <select
                                    id="piso"
                                    value={pisoSelecionado}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setPisoSelecionado(val);
                                        setCorSelecionada('');
                                        if (!val) setCores([]);
                                    }}
                                >
                                    <option value="">Selecione um piso</option>
                                    {pisos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                </select>
                                <button className="icon-button" type="button" onClick={() => setIsModalPisoOpen(true)} aria-label="Adicionar piso">
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="cor">Cor</label>
                            <select id="cor" value={corSelecionada} onChange={e => setCorSelecionada(e.target.value)} disabled={!pisoSelecionado}>
                                <option value="">{pisoSelecionado ? 'Selecione uma cor' : 'Escolha o piso primeiro'}</option>
                                {cores.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                            </select>
                        </div>

                        <div className="field field-full">
                            <label htmlFor="rodape">Rodapé</label>
                            <div className="inline-fields">
                                <select id="rodape" value={rodapeSelecionado} onChange={e => setRodapeSelecionado(e.target.value)}>
                                    <option value="">Selecione um rodapé</option>
                                    {rodapes.map(r => <option key={r.id} value={r.id}>{r.marca} - {r.altura} cm - {r.cor}</option>)}
                                </select>
                                <button className="icon-button" type="button" onClick={() => setIsModalRodapeOpen(true)} aria-label="Adicionar rodapé">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="section-title">
                        <h3>Insumos</h3>
                    </div>

                    <div className="insumo-row">
                        <div className="field">
                            <label htmlFor="insumo">Insumo</label>
                            <select id="insumo" value={insumoAtualId} onChange={e => setInsumoAtualId(e.target.value)}>
                                <option value="">Selecione o insumo</option>
                                {todosInsumos.map(i => <option key={i.id} value={i.id}>{i.nome} ({i.descricao})</option>)}
                            </select>
                        </div>

                        <button className="icon-button" type="button" onClick={() => setIsModalInsumoOpen(true)} aria-label="Adicionar insumo">
                            +
                        </button>

                        <div className="field">
                            <label htmlFor="quantidadeInsumo">Quantidade</label>
                            <input
                                id="quantidadeInsumo"
                                type="number"
                                value={quantidadeInsumoAtual}
                                onChange={e => setQuantidadeInsumoAtual(e.target.value)}
                            />
                        </div>

                        <button className="button button-soft" type="button" onClick={handleAdicionarInsumo}>
                            Adicionar
                        </button>
                    </div>

                    {insumosAdicionados.length > 0 && (
                        <div className="table-wrap">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Insumo</th>
                                        <th>Quantidade</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {insumosAdicionados.map(item => (
                                        <tr key={item.insumo.id}>
                                            <td>{item.insumo.nome}</td>
                                            <td>{item.quantidade}</td>
                                            <td>
                                                <button className="button button-ghost" type="button" onClick={() => handleRemoverInsumo(item.insumo.id)}>
                                                    Remover
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <section className="section">
                    <button className="button button-danger" type="submit">
                        Salvar
                    </button>
                </section>
            </form>

            <ModalRodape
                isOpen={isModalRodapeOpen}
                onClose={() => setIsModalRodapeOpen(false)}
                onSaveSuccess={(novo) => { setRodapes([...rodapes, novo]); setRodapeSelecionado(novo.id); }}
            />

            <ModalPiso
                isOpen={isModalPisoOpen}
                onClose={() => setIsModalPisoOpen(false)}
                onSaveSuccess={handlePisoSalvo}
            />

            <ModalInsumo
                isOpen={isModalInsumoOpen}
                onClose={() => setIsModalInsumoOpen(false)}
                onSaveSuccess={handleInsumoSalvo}
            />
        </main>
    );
}
