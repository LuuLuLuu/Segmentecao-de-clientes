# Luis
def pede_senha() -> str:
    while True:
        senha1 = input("Informe sua nova senha: ")
        senha2 = input("Confirme sua nova senha: ")
        if senha1 != senha2:
            print("As senhas não batem, tente novamente.")
            continue
        elif senha1 == senha2:
            return senha2


def menu():
    x = input("""
    O que tu deseja alterar de seu cadastro:
    1 - Login
    2 - Senha
    3 - Nome
    4 - Razão social
    5 - CNPJ
    6 - Faturamento
    x - Para sair 
    """)

    return x


def pede_valor(y=""):
    x = menu()
    match x == y:
        case 1:
            return input("Digite seu novo login: ")
        case 2:
            return pede_senha()
        case 3:
            return input("Digite seu novo login: ")
        case 4:
            return input("Digite seu novo login: ")
        case 5:
            return input("Digite seu novo login: ")
        case 6:
            return input("Digite seu novo Faturamento: ")
        case _:
            print("")
            pede_valor()


def cadastro_atualizar(login) -> dict:
    # Crio as variáveis
    login_usuario_novo = ""
    senha_usuario_novo = ""
    nome_usuario_novo = ""
    razao_social_usuario_novo = ""
    cnpj_usuario_novo = ""
    novo_faturamento = ""

    for i in range(6):  # Adiciono o valor origial
        ...

    while True:  # Reescrevo as variáveis com o que o usuário pedir
        x = menu()
        match x:
            case 1:
                login_usuario_novo = input("Digite seu novo login: ")
            case 2:
                senha_usuario_novo = pede_senha()
            case 3:
                nome_usuario_novo = input("Digite seu novo login: ")
            case 4:
                razao_social_usuario_novo = input("Digite seu novo login: ")
            case 5:
                cnpj_usuario_novo = input("Digite seu novo login: ")
            case 6:
                novo_faturamento = input("Digite seu novo Faturamento: ")
            case _:
                print("Você saiu da interação de atualizar cadastro.\n")
                break

    print("Usuário cadastrado com sucesso!")
    return dict(login=login_usuario_novo, senha=senha_usuario_novo, nome=nome_usuario_novo,
                razao_social=razao_social_usuario_novo, cnpj=cnpj_usuario_novo, faturamento=novo_faturamento)
