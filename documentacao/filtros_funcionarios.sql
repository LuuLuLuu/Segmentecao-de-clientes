-- Selecionar todos os funcionários
SELECT * FROM funcionario;

-- Selecionar os clientes que determinado funcionário cadastrou
SELECT 
	f.nome,
	c.razao_social,
	c.cnpj
FROM cliente c
INNER JOIN funcionario f
ON c.id_funcionario = f.id
WHERE f.nome = 'João Silva';

-- Selecionar funcionários por determinado cargo
SELECT id, nome, telefone, email
FROM funcionario 
WHERE cargo ILIKE 'Analista de Desenvolvimento de Negócios';

-- Selecionar funcionários pelo primeiro nome
SELECT id, nome, telefone, email
FROM funcionario 
WHERE nome ILIKE 'Fernanda%';

-- Selecionar funcionários pelo sobrenome
SELECT id, nome, telefone, email
FROM funcionario 
WHERE nome ILIKE '%Lima';

-- Selecionar funcionários pelo id
SELECT id, nome, telefone, email
FROM funcionario 
WHERE id = 55;
