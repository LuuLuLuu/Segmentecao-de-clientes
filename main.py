def beneficios_classe(classe: str) -> dict:
    """
    Função para determinar seus benefícios de acordo com sua classe.

    Args:
        classe (str):
            Recebe a classe do cliente.

    Returns:
        dict: Retorna um dicionário com os benefícios e seu valor de benefício.
        None: Retornará None se a classe do cliente for abaixo da classe D.
    """

    if classe == "Classe A":
        beneficios = {
            "prazo de pagamento": "90 dias",
            "negociação": "Premium",
            "frete grátis": "Em qualquer valor",
            "cashback": "10% do valor"
        }
    elif classe == "Classe B":
        beneficios = {
            "prazo de pagamento": "60 dias",
            "frete grátis": "Acima de R$150,00",
            "cashback": "5% do valor"
        }
    elif classe == "Classe C":
        beneficios = {
            "prazo de pagamento": "30 dias",
            "frete grátis": "Acima de R$1.000,00",
        }
    elif classe == "Classe D":
        beneficios = {
            "prazo de pagamento": "10 dias",
            "frete grátis": "Acima de R$1.500,00",
        }
    else:
        beneficios = None

    return beneficios
