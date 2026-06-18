package org.example.edispisos.repository;

import org.example.edispisos.model.Insumo01;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Insumo01Repository extends JpaRepository<Insumo01, Long> {
}