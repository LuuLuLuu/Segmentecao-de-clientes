# Feito por Alexandre, Luis, Mateus, Vitória

import random
from scripts.menu import exibir_menu
from scripts.cadastro import cadastro
from scripts.definir_classe import definir_classe
from scripts.definir_beneficios_classe import beneficios_classe
from scripts.exibir_lista_beneficios import exibir_listabeneficios

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

    # Recebe o input do usuário para definir sua escolha no menu
    opcao = int(input("Digite sua escolha: "))

    match opcao:
        case 1: """Realizar Cadastro"""

        case 2: """Consulta Cliente"""

        case 3:
            print("""
Cliente A:
    prazo de pagamento - 90D
    negociação premium
    frete grátis em qualquer valor
    cashback 10% do valor total de todos os pedidos

Cliente B:
    prazo de pagamento - 60D
    frete grátis acima de R$150,00
    cashback 5% do valor total de todos os pedidos

Cliente C:
    prazo de pagamento - 30D
    frete grátis acima de R$1000,00
    
Cliente D:
    prazo de pagamento - 10D
    frete grátis acima de R$1500,00
""")

        case 4:
            print("""
Critérios para cada classe:
Cliente A - Faturamento mensal maior que R$10.000,00
Cliente B - Faturamento mensal maior que R$8.000,00
Cliente C - Faturamento mensal maior que R$5.000,00
Cliente D - Faturamento mensal maior que R$3.000,00
""")
        case 5: """alterar senha"""

        case 6: break  # Sair

        case _: print("Digite um número de 1 a 6.")
