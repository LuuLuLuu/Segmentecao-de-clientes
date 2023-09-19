dicionario_senhas = {}
while True:
    opcao = int(input("Gostaria de logar ou criar conta? Digite 1 para logar ou 2 para criar uma conta: "))
    if opcao == 2:
        login_usuario_novo = input("Informe seu login: ")
        senha_usuario_novo = input("Informe sua senha")
        dicionario_senhas[login_usuario_novo] = senha_usuario_novo
        print("Usuário cadastrado com sucesso!")

    elif opcao == 1:
        login = input("Informe o login: ")
        senha = input("Informe a senha")
        if dicionario_senhas[login] == senha:
            """Restante do código"""
        else:
            print("Senha incorreta ou usuário não existe. Tente Novamente.")
            continue

    else:
        print("Opção incorreta, tente novamente.")
        continue

