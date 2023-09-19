from main import dicionario_senhas
from main import login
def alterar_senha():
    senha_nova = input("Informe a nova senha: ")
    dicionario_senhas[login] = senha_nova
    return