package org.example.edispisos.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity
@Table(name = "piso")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Piso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 100)
    private String marca;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "piso_cor",
            joinColumns = @JoinColumn(name = "piso_id"),
            inverseJoinColumns = @JoinColumn(name = "cor_id")
    )
    private List<Cor> cores;
}
