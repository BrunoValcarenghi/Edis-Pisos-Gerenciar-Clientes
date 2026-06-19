package org.example.edispisos.service;

import org.example.edispisos.model.Servico;
import org.example.edispisos.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    public List<Servico> listarTodos() {
        return servicoRepository.findAllByOrderByDataDesc();
    }

    public Optional<Servico> buscarPorId(Long id) {
        return servicoRepository.findById(id);
    }

    public Servico salvar(Servico servico) {
        if (servico.getInsumos() != null) {
            servico.getInsumos().forEach(insumoItem -> insumoItem.setServico(servico));
        }
        return servicoRepository.save(servico);
    }

    public void deletar(Long id) {
        if (servicoRepository.existsById(id)) {
            servicoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Serviço com ID " + id + " não encontrado.");
        }
    }
}