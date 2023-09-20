import random


def pede_senha() -> str:
    while True:
        senha1 = input("Informe sua nova senha: ")
        senha2 = input("Confirme sua nova senha: ")
        if senha1 != senha2:
            print("As senhas não batem, tente novamente.")
            continue
        elif senha1 == senha2:
            return senha2


def cadastrar_usuario(login) -> dict:
    cadastro = {}
    login_usuario_novo = login
    senha_usuario_novo = pede_senha()
    nome_usuario_novo = input("Informe seu nome: ")
    razao_social_usuario_novo = input("Informe sua razão social: ")
    cnpj_usuario_novo = input("Informe seu CNPJ: ")
    codigo_de_cliente = random.randrange(0, 1000)
    faturamento = int(input("Informe o faturamento da empresa, em R$: "))

    cadastro[nome_usuario_novo] = dict(login=login_usuario_novo, senha=senha_usuario_novo, nome=nome_usuario_novo, razao_social=razao_social_usuario_novo, cnpj=cnpj_usuario_novo, codigo_cliente=codigo_de_cliente, faturamento=faturamento)
    print("Usuário cadastrado com sucesso!")
    return dict(login=login_usuario_novo, senha=senha_usuario_novo, nome=nome_usuario_novo, razao_social=razao_social_usuario_novo, cnpj=cnpj_usuario_novo, codigo_cliente=codigo_de_cliente, faturamento=faturamento)

