package org.example.edispisos.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "rodape")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rodape {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(precision = 5, scale = 2)
    private BigDecimal altura;

    @Column(length = 100)
    private String marca;

    @Column(length = 50)
    private String cor;
}