package org.example.edispisos.service;

import org.example.edispisos.model.Rodape;
import org.example.edispisos.repository.RodapeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RodapeService {

    @Autowired
    private RodapeRepository repository;

    public List<Rodape> listarTodos() {
        return repository.findAll();
    }

    public Rodape salvar(Rodape rodape) {
        return repository.save(rodape);
    }
}