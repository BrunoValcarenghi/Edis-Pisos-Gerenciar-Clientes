package org.example.edispisos.controller;

import org.example.edispisos.model.Rodape;
import org.example.edispisos.service.RodapeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rodapes")
@CrossOrigin(origins = "*")
public class RodapeController {

    @Autowired
    private RodapeService service;

    @GetMapping
    public List<Rodape> listarTodos() {
        return service.listarTodos();
    }

    @PostMapping
    public Rodape salvar(@RequestBody Rodape rodape) {
        return service.salvar(rodape);
    }
}