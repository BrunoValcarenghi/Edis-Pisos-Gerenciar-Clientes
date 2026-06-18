package org.example.edispisos.repository;

import org.example.edispisos.model.Piso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PisoRepository extends JpaRepository<Piso, Long> {
}