# Constantes das classes e seus critérios
CLIENTE_CLASSE_A = 10000  # 10 mil reais ou mais
CLIENTE_CLASSE_B = 8000  # 8 mil reais ou mais
CLIENTE_CLASSE_C = 5000  # 5 mil reais ou mais
CLIENTE_CLASSE_D = 3000  # 3 mil reais ou mais


def definir_classe(faturamento: float) -> dict:
    """
    Função para definir a classe em que o cliente se encontra.

    Args:
        faturamento (float):
            Recebe o valor do faturamento do cliente.

    Returns:
        tuple: Retorna a classe do cliente.
    """

    categoria_cliente = {}

    if faturamento > CLIENTE_CLASSE_A:
        categoria_cliente["classe"] = "Classe A"
    elif faturamento > CLIENTE_CLASSE_B:
        categoria_cliente["classe"] = "Classe B"
    elif faturamento > CLIENTE_CLASSE_C:
        categoria_cliente["classe"] = "Classe C"
    elif faturamento > CLIENTE_CLASSE_D:
        categoria_cliente["classe"] = "Classe D"
    else:
        categoria_cliente["classe"] = "Não aplicável"

    return categoria_cliente
