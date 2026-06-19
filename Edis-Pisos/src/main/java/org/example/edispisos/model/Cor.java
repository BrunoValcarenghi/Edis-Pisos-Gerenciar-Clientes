package org.example.edispisos.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Table(name = "cor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String nome;

    @ManyToMany(mappedBy = "cores")
    @JsonIgnoreProperties("cores") // Evita loop infinito no JSON ao listar
    private List<Piso> pisos;
}