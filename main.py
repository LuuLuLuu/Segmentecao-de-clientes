# Feito por Alexandre, Luis, Mateus, Vitória

from scripts.menu import exibir_menu
from scripts.cadastro import *
from scripts.definir_classe import definir_classe
from scripts.definir_beneficios_classe import beneficios_classe
from scripts.exibir_lista_beneficios import exibir_listabeneficios
from scripts.atualizar_cadastro import cadastro_atualizar

# Variáveis
usuarios = {}   # Guarda todo usuário

# Início do código com o login
# Login:
# Login -> Menu | Login != Cadastro -> Login -> Menu
while True:
    opcao = int(input("Gostaria de logar ou criar conta? Digite 1 para logar ou 2 para criar uma conta: "))
    if opcao == 2:  # Cadastro
        login = input("Informe seu novo login: ")

        if login in usuarios:
            print("Este login já existe!")
            continue

        usuarios[login] = cadastrar_usuario(login)

    elif opcao == 1:  # Login
        login = input("Informe o login: ")
        senha = input("Informe a senha: ")

        if login in usuarios:
            if usuarios[login]["senha"] == senha:
                break
        print("Senha incorreta ou usuário não existe. Tente Novamente.")
        continue

    else:
        print("Opção incorreta, tente novamente.")
        continue

# Definir a classe do cliente através do faturamento do mesmo.
classe = definir_classe(usuarios[login]["faturamento"])
usuarios[login].update({"classe": classe})

# Definir os benefícios do cliente
usuarios[login].update({"beneficios": beneficios_classe(usuarios[login]["classe"])})

while True:
    # Menu:
    exibir_menu()

    opcao = int(input("Informe a opção desejada: "))
    match opcao:
        case 1:  # Atualização do cadastro do cliente
            usuarios[login] = cadastro_atualizar(login)
        case 2:  # Consultar dados do cliente
            for chave, valor in usuarios[login].items():
                print(f"{chave}: {valor}")
        case 3:  # Consultar benefícios de cada classe
            exibir_listabeneficios()
        case 4:  # Exibir critérios de cada classe
            print("""
--- Lista de Critérios ---

Cliente A -> Faturamento mensal maior que R$10.000,00
Cliente B -> Faturamento mensal maior que R$8.000,00
Cliente C -> Faturamento mensal maior que R$5.000,00
Cliente D -> Faturamento mensal maior que R$3.000,00
""")
        case 5:  # Alterar a senha
            usuarios[login]["senha"] = pede_senha()
        case 6:
            exit()
        case _:
            print("Opção incorreta, tente novamente.")
