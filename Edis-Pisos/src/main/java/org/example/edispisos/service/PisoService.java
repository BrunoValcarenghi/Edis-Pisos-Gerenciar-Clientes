package org.example.edispisos.service;

import org.example.edispisos.model.Piso;
import org.example.edispisos.model.Cor;
import org.example.edispisos.repository.PisoRepository;
import org.example.edispisos.repository.CorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PisoService {

    @Autowired
    private PisoRepository repository;

    @Autowired
    private CorRepository corRepository;

    public List<Piso> listarTodos() {
        return repository.findAll();
    }

    @Transactional
    public Piso salvar(Piso piso) {
        List<Cor> coresRecebidas = piso.getCores();
        piso.setCores(new ArrayList<>());

        Piso pisoSalvo = repository.save(piso);

        if (coresRecebidas != null && !coresRecebidas.isEmpty()) {
            List<Cor> coresFinais = new ArrayList<>();

            for (Cor cor : coresRecebidas) {
                Cor corSalva = corRepository.save(cor);
                coresFinais.add(corSalva);
            }

            pisoSalvo.setCores(coresFinais);
            pisoSalvo = repository.save(pisoSalvo);
        }

        return pisoSalvo;
    }
}