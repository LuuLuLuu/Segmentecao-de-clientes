]CREATE TABLE classe (
	id INT PRIMARY KEY,
	nome_classe VARCHAR(100) NOT NULL,
	prazo_pagamento INT NOT NULL,
	frete_minimo NUMERIC NOT NULL,
	cashback NUMERIC,
	negociacao_premium BOOLEAN,
	valor_maximo NUMERIC NOT NULL CHECK (valor_maximo > valor_minimo),
	valor_minimo NUMERIC NOT NULL CHECK (valor_minimo > 0)
);

CREATE TABLE funcionario (
	id INT PRIMARY KEY,
	nome VARCHAR(256) NOT NULL,
	senha VARCHAR(20) NOT NULL,
	cargo VARCHAR(256) NOT NULL,
	email VARCHAR(256) NOT NULL,
	telefone VARCHAR(20) NOT NULL
);

CREATE TABLE cliente (
	id INT PRIMARY KEY,
	cnpj VARCHAR(18) UNIQUE,
	razao_social VARCHAR(256) NOT NULL,
	faturamento NUMERIC NOT NULL,
	id_classe INT NOT NULL,
	id_funcionario INT NOT NULL,
	FOREIGN KEY (id_classe) REFERENCES classe(id),
	FOREIGN KEY (id_funcionario) REFERENCES funcionario(id)
);
