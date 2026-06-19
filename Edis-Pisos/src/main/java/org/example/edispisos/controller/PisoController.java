package org.example.edispisos.controller;

import org.example.edispisos.model.Cor;
import org.example.edispisos.model.Piso;
import org.example.edispisos.repository.PisoRepository;
import org.example.edispisos.service.PisoService; // Importa o service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pisos")
@CrossOrigin(origins = "*")
public class PisoController {

    @Autowired
    private PisoRepository pisoRepository;

    @Autowired
    private PisoService pisoService; // Injeta o service que criamos

    @GetMapping
    public List<Piso> listarTodos() {
        return pisoRepository.findAll();
    }

    @GetMapping("/{id}/cores")
    public ResponseEntity<List<Cor>> listarCoresDoPiso(@PathVariable Long id) {
        return pisoRepository.findById(id)
                .map(piso -> ResponseEntity.ok(piso.getCores()))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Piso salvar(@RequestBody Piso piso) {
        return pisoService.salvar(piso); // Usa a regra do service que trata as cores
    }
}