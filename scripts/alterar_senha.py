from main import usuarios, senha
from main import login


def alterar_senha(login):
    senha_nova = input("Informe a nova senha: ")
    usuarios[login][senha] = senha_nova
    return
