INSERT INTO classe (id, nome_classe, prazo_pagamento, frete_minimo, cashback, negociacao_premium, valor_maximo, valor_minimo)
VALUES
(0, 'Sem Classe', 0, 0, NULL, NULL, 2999.99, 1),
(1, 'Classe A', 90, 0, 10, true, 100000000000, 10000),
(2, 'Classe B', 60, 150, 5, false, 9999.99, 8000),
(3, 'Classe C', 30, 1000, 0, false, 7999.99, 5000),
(4, 'Classe D', 10, 1500, 0, false, 4999.99, 3000);

-- Selecionar todos os clientes e seus benefícios;
SELECT 
    cli.razao_social AS "Razão Social",
    cla.nome_classe AS "Classe",
	cla.prazo_pagamento AS "Prazo de Pagamento",
	cla.frete_minimo AS "Frete Mínimo",
	cla.cashback AS "Cashback",
	cla.negociacao_premium AS "Negociação Premium"
FROM cliente AS cli
INNER JOIN classe AS cla ON cli.id_classe = cla.id;
	
-- Selecionar todas os clientes que possuem benefícios;
SELECT
	cli.razao_social AS "Razão Social",
	cli.cpnj AS "CNPJ",
	cli.faturamento::money AS "Faturamento",
	cla.nome_classe AS "Classe"
FROM cliente AS cli
INNER JOIN classe AS cla ON cli.id_classe = cla.id
WHERE cla.nome_classe <> 'Sem Classe';

-- Selecionar todos os clientes que não possuem benefícios;
SELECT
	cli.razao_social AS "Razão Social",
	cli.cpnj AS "CNPJ",
	cli.faturamento::money AS "Faturamento",
	cla.nome_classe AS "Classe"
FROM cliente AS cli
INNER JOIN classe AS cla ON cli.id_classe = cla.id
WHERE cla.nome_classe = 'Sem Classe';

-- Selecionar todos os clientes por classe;
SELECT
	cli.razao_social AS "Razão Social",
	cli.cpnj AS "CNPJ",
	cli.faturamento::money AS "Faturamento",
	cla.nome_classe AS "Classe"
FROM cliente AS cli
INNER JOIN classe AS cla ON cli.id_classe = cla.id
ORDER BY cla.nome_classe;

--Selecionar a classe, faturamento do cliente e seus benefícios;
SELECT
	cli.razao_social AS "Razão Social",
	cli.faturamento::money AS "Faturamento",
	cla.nome_classe AS "Classe",
	cla.prazo_pagamento AS "Prazo de Pagamento",
	cla.frete_minimo AS "Frete Mínimo",
	cla.cashback AS "Cashback",
	cla.negociacao_premium AS "Negociação Premium"
FROM cliente AS cli
INNER JOIN classe AS cla ON cli.id_classe = cla.id;

-- Selecionar o faturamento dos clientes que não possuem classes ordenados de forma decrescente;
SELECT
	cli.razao_social AS "Razão Social",
	cli.faturamento::money AS "Faturamento",
	cla.nome_classe AS "Classe"
FROM cliente AS cli
INNER JOIN classe AS cla ON cli.id_classe = cla.id
WHERE cla.nome_classe = 'Sem Classe'
ORDER BY cli.faturamento DESC;

--Selecionar a difereça entre o critério de valor mínimo da sua classe atual e o faturamento da empresa, incluindo clientes sem classe até a Classe B;
SELECT
    subselect.razao_social AS "Razão Social",
    subselect.faturamento::money AS "Faturamento",
    subselect.nome_classe AS "Classe",
    subselect.diferenca_valor::money AS "Valor para próxima classe"
FROM (
    SELECT
        cli.razao_social,
        cli.faturamento,
        cla.nome_classe,
        (cla.valor_maximo - cli.faturamento) AS diferenca_valor
    FROM cliente AS cli
    INNER JOIN classe AS cla ON cli.id_classe = cla.id
) AS subselect
WHERE subselect.nome_classe <> 'Classe A';

--Selecionar clientes que possuem diferenças menores de R$500,00 para passar de classe.
SELECT
    subselect.razao_social AS "Razão Social",
    subselect.faturamento::money AS "Faturamento",
    subselect.nome_classe AS "Classe",
    subselect.diferenca_valor::money AS "Valor para próxima classe"
FROM (
    SELECT
        cli.razao_social,
        cli.faturamento,
        cla.nome_classe,
        (cla.valor_maximo - cli.faturamento) AS diferenca_valor
    FROM cliente AS cli
    INNER JOIN classe AS cla ON cli.id_classe = cla.id
) AS subselect
WHERE subselect.nome_classe <> 'Classe A' and subselect.diferenca_valor < 500;
