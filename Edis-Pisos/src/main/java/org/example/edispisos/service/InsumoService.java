package org.example.edispisos.service;

import org.example.edispisos.model.Insumo;
import org.example.edispisos.repository.InsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InsumoService {

    @Autowired
    private InsumoRepository repository;

    public List<Insumo> listarTodos() {
        return repository.findAll();
    }

    public Insumo salvar(Insumo insumo) {
        return repository.save(insumo);
    }
}