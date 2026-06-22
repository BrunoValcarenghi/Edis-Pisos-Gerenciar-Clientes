package org.example.edispisos.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "servico")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Servico{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "nome_cliente", length = 150)
    private String nomeCliente;

    @Column(columnDefinition = "TEXT")
    private String endereco;

    @Column(length = 20)
    private String telefone;

    @Column(precision = 10, scale = 2)
    private BigDecimal valor;

    @Column(name = "valor_m2", precision = 10, scale = 2)
    private BigDecimal valorM2;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(precision = 10, scale = 2)
    private BigDecimal area;

    @Column(precision = 10, scale = 2)
    private BigDecimal metros_rodape;

    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "piso_id")
    private Piso piso;

    @ManyToOne
    @JoinColumn(name = "rodape_id")
    private Rodape rodape;

    @OneToMany(mappedBy = "servico", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServicoInsumo> insumos;

    @ManyToOne
    @JoinColumn(name = "cor_id")
    private Cor cor;

}
