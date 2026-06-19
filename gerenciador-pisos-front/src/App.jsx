import { useState } from 'react';
import ListaServicos from './pages/ListaServicos';
import DetalheServico from './pages/DetalheServico';
import CadastroServico from './pages/CadastroServico';

function App() {
    const [idServicoSelecionado, setIdServicoSelecionado] = useState(null);
    const [exibirCadastro, setExibirCadastro] = useState(false);

    if (idServicoSelecionado) {
        return (
            <DetalheServico
                idServico={idServicoSelecionado}
                onVoltar={() => setIdServicoSelecionado(null)}
            />
        );
    }

    if (exibirCadastro) {
        return (
            <CadastroServico
                onVoltar={() => setExibirCadastro(false)}
            />
        );
    }

    return (
        <ListaServicos
            onVerDetalhes={(id) => setIdServicoSelecionado(id)}
            onIrParaCadastro={() => setExibirCadastro(true)}
        />
    );
}

export default App;