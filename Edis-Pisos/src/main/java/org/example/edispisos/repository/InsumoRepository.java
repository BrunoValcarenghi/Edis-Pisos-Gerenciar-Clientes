package org.example.edispisos.repository;

import org.example.edispisos.model.Insumo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsumoRepository extends JpaRepository<Insumo, Long> {
    // O Spring já cria todos os métodos básicos (save, findAll, findById, delete) automaticamente!
}