from main import dicionario_faturamento
from main import login


def faturamento():
    fat = int(input("Informe o faturamento, em R$: "))
    dicionario_faturamento[login] = fat
