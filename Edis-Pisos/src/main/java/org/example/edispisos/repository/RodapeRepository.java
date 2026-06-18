package org.example.edispisos.repository;

import org.example.edispisos.model.Rodape;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RodapeRepository extends JpaRepository<Rodape, Long> {
}