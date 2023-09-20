# Feito por Alexandre, Luis, Mateus, Vitória

from scripts.menu import exibir_menu
from scripts.cadastro import cadastrar_usuario
from scripts.definir_classe import definir_classe
from scripts.definir_beneficios_classe import beneficios_classe
from scripts.exibir_lista_beneficios import exibir_listabeneficios
from scripts.alterar_senha import alterar_senha

# Variáveis
usuarios = {}   # Guardatodo usuário
                # login, senha, nome, razao_social, cnpj, codigo_cliente
dicionario_faturamento ={}

# Início do código com o login
# Login:
# Login -> Menu | Login != Cadastro -> Login -> Menu
while True:
    opcao = int(input("Gostaria de logar ou criar conta? Digite 1 para logar ou 2 para criar uma conta: "))
    if opcao == 2:
        novo_login = input("Informe seu novo login: ")
        usuarios[novo_login] = cadastrar_usuario(novo_login)
    elif opcao == 1:
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
        case 1:
            login2 = input("Informe o login a ser registrado: ")
            cadastrar_usuario(login2)
        case 2:
            print(usuarios[login])
        case 3:
            exibir_listabeneficios()
        case 4:
            ...
        case 5:
            alterar_senha(login)
        case 6:
            break
        case _:
            print("Opção incorreta, tente novamente.")
