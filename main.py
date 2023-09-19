# Feito por Alexandre, Luis, Mateus, Vitória

import random
from scripts.menu import exibir_menu
from scripts.cadastro import cadastro
from scripts.definir_classe import definir_classe
from scripts.definir_beneficios_classe import beneficios_classe
from scripts.exibir_lista_beneficios import exibir_listabeneficios
from scripts.alterar_senha import alterar_senha

# variáveis para o funcionamento do código

# nome = ""
# login = ""
# senha = ""
# CNPJ
# Razão social
# codigo_de_cliente = random.randrange(0, 1000)

dicionario_senhas = {}

# Início do código com o login
# Login:
# Login -> Menu | Login != Cadastro -> Login -> Menu
while True:
    opcao = int(input("Gostaria de logar ou criar conta? Digite 1 para logar ou 2 para criar uma conta: "))
    if opcao == 2:
        cadastro()

    elif opcao == 1:
        login = input("Informe o login: ")
        senha = input("Informe a senha: ")
        if login in dicionario_senhas:
            if dicionario_senhas[login] == senha:
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
        case 1:
            cadastro()
        case 2:
            ...
        case 3:
            exibir_listabeneficios()
        case 4:
            ...
        case 5:
            alterar_senha()
        case 6:
            break
        case _:
            print("Opção incorreta, tente novamente.")
