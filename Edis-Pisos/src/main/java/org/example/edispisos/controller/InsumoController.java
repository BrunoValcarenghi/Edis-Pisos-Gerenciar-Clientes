package org.example.edispisos.controller;

import org.example.edispisos.model.Insumo;
import org.example.edispisos.service.InsumoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/insumos")
@CrossOrigin(origins = "*")
public class InsumoController {

    @Autowired
    private InsumoService service;

    @GetMapping
    public List<Insumo> listarTodos() {
        return service.listarTodos();
    }

    @PostMapping
    public Insumo salvar(@RequestBody Insumo insumo) {
        return service.salvar(insumo);
    }
}