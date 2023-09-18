def definir_classe(faturamento: float) -> str:
    """
    Função para definir a classe em que o cliente se encontra.

    Args:
        faturamento (float):
            Recebe o valor do faturamento do cliente.

    Returns:
        str: Retorna a classe correspondente do cliente em uma string.
        É possível armazenar a classe do cliente em uma variável.
            Ex.: classe = definir_classe()
    """

    # Constantes das classes e seus critérios
    CLIENTE_CLASSE_A = 10000
    CLIENTE_CLASSE_B = 8000
    CLIENTE_CLASSE_C = 5000
    CLIENTE_CLASSE_D = 3000

    if faturamento > CLIENTE_CLASSE_A:
        categoria_cliente = "Classe A"
    elif faturamento > CLIENTE_CLASSE_B:
        categoria_cliente = "Classe B"
    elif faturamento > CLIENTE_CLASSE_C:
        categoria_cliente = "Classe C"
    elif faturamento > CLIENTE_CLASSE_D:
        categoria_cliente = "Classe D"
    else:
        categoria_cliente = "Não aplicável"

    return categoria_cliente
