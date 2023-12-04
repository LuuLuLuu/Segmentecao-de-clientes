CREATE TABLE classe (
	id INT PRIMARY KEY,
	prazo_pagamento NUMERIC NOT NULL,
	frete_minimo NUMERIC NOT NULL,
	cashback NUMERIC,
	negociacao_premium VARCHAR(256),
	valor_maximo NUMERIC NOT NULL,
	valor_minimo NUMERIC NOT NULL
);

CREATE TABLE funcionario (
	id INT PRIMARY KEY,
	nome VARCHAR(256) NOT NULL,
	senha VARCHAR(8) NOT NULL,
	cargo VARCHAR(256) NOT NULL,
	email VARCHAR(256) NOT NULL,
	telefone VARCHAR(20) NOT NULL
);

CREATE TABLE cliente (
	id INT PRIMARY KEY,
	cpnj VARCHAR(18) UNIQUE,
	razao_social VARCHAR(256) NOT NULL,
	faturamento NUMERIC NOT NULL,
	filtro_cnpj VARCHAR(18),
	filtro_razao_social VARCHAR(18),
	filtro_classe VARCHAR(18),
	adicionar_faturamento NUMERIC,
	id_classe INT,
	id_funcionario INT,
	FOREIGN KEY (id_classe) REFERENCES classe(id),
	FOREIGN KEY (id_funcionario) REFERENCES funcionario(id)
);
