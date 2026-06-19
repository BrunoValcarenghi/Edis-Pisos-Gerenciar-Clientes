package org.example.edispisos.repository;

import org.example.edispisos.model.ServicoInsumo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoInsumoRepository extends JpaRepository<ServicoInsumo, Long> {
}