from main import dicionario_senhas


def cadastro():

    login_usuario_novo = input("Informe seu login: ")
    senha_usuario_novo = input("Informe sua senha")
    dicionario_senhas[login_usuario_novo] = senha_usuario_novo
    if login_usuario_novo in dicionario_senhas:
        print("Esse usuário já está cadastrado.")
        return
    else:
        print("Usuário cadastrado com sucesso!")
