# Feito por Alexandre, Luis, Mateus, Vitória

from scripts.menu import exibir_menu
from scripts.cadastro import cadastrar_usuario, pede_senha
# from scripts.definir_classe import definir_classe
# from scripts.definir_beneficios_classe import beneficios_classe
from scripts.exibir_lista_beneficios import exibir_listabeneficios
from scripts.atualizar_cadastro import cadastro_atualizar

# Variáveis
usuarios = ""  # Guardatodo usuário
               # login, senha, nome, razao_social, cnpj, codigo_cliente
dicionario_faturamento = {}
login = ""

# Início do código com o login
# Login:
# Login -> Menu | Login != Cadastro -> Login -> Menu
while True:
    opcao = input("Gostaria de logar ou criar conta? Digite 1 para logar ou 2 para criar uma conta: ")
    x = 1  # Iterável para o cadastro
    if opcao == "2":
        novo_login = input("Informe seu novo login: ")
        if novo_login in usuarios:
            if x >= 2:
                print("Este login ja existe!")
                continue
        usuarios[novo_login] = cadastrar_usuario(novo_login)
        x += 1
        print(x)
        print(usuarios)
    elif opcao == "1":
        login = input("Informe o login: ")
        senha = input("Informe a senha: ")
        if usuarios[login] != login:
            print("Login não registrado, tente novamente.")
            continue
        elif usuarios[login][senha] == senha:
            break
        else:
            print("Senha incorreta ou usuário não existe. Tente Novamente.")
            continue

    else:
        print("Opção incorreta, tente novamente.")
        continue

while True:
    # Menu:
    exibir_menu()
    opcao = input("informe a opção desejada: ")
    match opcao:
        case 1:  # Atualizar cadastro
            usuarios[login] = cadastro_atualizar(login)
        case 2:  #
            print(usuarios)
        case 3:
            exibir_listabeneficios()
        case 4:
            ...
        case 5:  # Alterar a senha
            pede_senha()
        case 6:
            exit()
        case _:
            print("Opção incorreta, tente novamente.")
