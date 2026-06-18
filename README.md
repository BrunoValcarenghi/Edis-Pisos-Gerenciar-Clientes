# Edis-Pisos-Gerenciar-Clientes

-banco de dados: postgresql  
-back: spring  
-front: angular  
-

```sql
CREATE TABLE piso (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    marca VARCHAR(100),
    cor VARCHAR(50)
);

CREATE TABLE rodape (
    id SERIAL PRIMARY KEY,
    altura DECIMAL(5,2),
    marca VARCHAR(100),
    cor VARCHAR(50)
);

CREATE TABLE insumo01 (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE insumo02 (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE insumo03 (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE servico (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nome_cliente VARCHAR(150),
    endereco TEXT,
    telefone VARCHAR(20),
    valor DECIMAL(10,2),
    valor_m2 DECIMAL(10,2),
    descricao TEXT,
    area DECIMAL(10,2),
    data DATE,
    piso_id INT REFERENCES piso(id) ON DELETE SET NULL,
    rodape_id INT REFERENCES rodape(id) ON DELETE SET NULL,
    insumo01_id INT REFERENCES insumo01(id) ON DELETE SET NULL,
    insumo02_id INT REFERENCES insumo02(id) ON DELETE SET NULL,
    insumo03_id INT REFERENCES insumo03(id) ON DELETE SET NULL
);
```

```mermaid
    erDiagram
        SERVICO {
            int id PK
            string nome
            string nomeCliente
            string endereco
            string telefone
            float valor
            float valor_m2
            string descricao
            float area
            date data
            int piso_id FK
            int rodape_id FK
            int insumo01_id FK
            int insumo02_id FK
            int insumo03_id FK
        }

        PISO {
            int id PK
            string nome
            string marca
            string cor
        }

        RODAPE {
            int id PK
            float altura
            string marca
            string cor
        }

        INSUMO01 {
            int id PK
            string nome
            string descricao
        }

        INSUMO02 {
            int id PK
            string nome
            string descricao
        }

        INSUMO03 {
            int id PK
            string nome
            string descricao
        }

        %% Relacionamentos atualizados (Um serviço tem zero ou um de cada)
        PISO ||--o{ SERVICO : "vinculado"
        RODAPE |o--o{ SERVICO : "vinculado"
        INSUMO01 |o--o{ SERVICO : "vinculado"
        INSUMO02 |o--o{ SERVICO : "vinculado"
        INSUMO03 |o--o{ SERVICO : "vinculado"
```