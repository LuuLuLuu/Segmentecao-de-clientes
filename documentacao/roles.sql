-- Criação de um usuário administrador
CREATE ROLE admin LOGIN PASSWORD '1234ABC';
ALTER ROLE admin SUPERUSER CREATEDB CREATEROLE;

-- Criação de um usuário de desenvolvedor
CREATE ROLE dev;

GRANT CONNECT ON DATABASE postgres TO dev;
GRANT CREATE ON SCHEMA public TO dev;
ALTER ROLE dev CONNECTION LIMIT 10;

-- Criação de um usuário que seria o funcionário da empresa cadastrando clientes
CREATE ROLE user;

GRANT CONNECT ON DATABASE postgres TO user;
GRANT SELECT, INSERT, UPDATE, DELETE ON cliente TO user;
ALTER ROLE user CONNECTION LIMIT 10;

-- Criação de um usuário de analista de dados
CREATE ROLE data_analyst;

GRANT CONNECT ON DATABASE postgres TO data_analyst;
GRANT SELECT ON cliente, classe, funcionario TO data_analyst;
ALTER ROLE data_analyst CONNECTION LIMIT 10;