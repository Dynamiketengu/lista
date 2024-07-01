import random

# Função para gravar dados em um arquivo
def gravar_dados(file, dados):
    with open(file, "w") as f:
        f.write(str(dados))

# Função para ler dados de um arquivo
def ler_dados(file):
    try:
        with open(file, "r") as f:
            return eval(f.read())
    except FileNotFoundError:
        return {}

# Função para cadastrar cliente
def cadastrar_cliente(clientes, nome, senha):
    clientes[nome] = {"senha": senha, "produtos": {}}
    return clientes

# Função para adicionar produto ao cliente
def add_produto_cliente(clientes, nome_cliente, produto, quantidade):
    produtos_disponiveis = {
        "oleo": 9.90,
        "fini": 6.94,
        "cerveja": 3.00,
        "leite": 4.69,
        "pão de alho": 8.99,
        "costela": 17.98,
        "macarrão": 8.69,
        "feijão": 10.00,
        "cafe": 14.80,
        "açucar":19.90,
        "vinagre": 8.90,
        "sabonete": 2.10,
        "sal": 8.40,
        "alface": 1.80,
        "maionese": 13.90,
        "carne": 16.90,
        "presunto": 7.90,
        "bolo": 68.90,
        "oleo de soja": 9.90,
        "linguiça": 13.80,
        "salsicha": 8.00,
        "agua mineral": 3.90,
        "farinha de trigo": 14.70,
        "tomate": 1.00,
        "cenoura": 1.38,
        "rabanete": 0.89,
        "salgadinho": 11.90,
        "chocolate": 2.99,
        "milho": 4.90,
        "sanduiche": 8.90,
        "banana": 2.99,
        "laranja": 1.50,
        "pimentao": 3.00,
        "cebola": 0.99,
        "desodorante": 9.90,
        "lampada": 20.90,
        "gelatina": 2.90,
        "creme de leie": 5.00,
        "leite condensado": 8.00,
        "queijo": 12.90,
        "queijo mussarela": 18.90,
        "mortadela": 4.90,
        "farinha de rosca": 7.90,
        "azeite": 12.00,
        "ketchup": 8.90,
        "batata": 2.00,
        "uva": 3.00,
        "cereja": 4.00,
        "kiwi": 3.20,
        "maça": 2.00,
        "azeitona": 8.00,
    }
    if produto in produtos_disponiveis:
        preco = produtos_disponiveis[produto]
    else:
        preco = round(random.uniform(0.50, 7.69), 2)
    if produto in clientes[nome_cliente]["produtos"]:
        clientes[nome_cliente]["produtos"][produto]["quantidade"] += quantidade
    else:
        clientes[nome_cliente]["produtos"][produto] = {"quantidade": quantidade, "preco": preco}
    return clientes

# Função para calcular o total do cliente
def calcular_total_cliente(clientes, nome_cliente):
    total = 0
    for produto, dados in clientes[nome_cliente]["produtos"].items():
        total += dados["quantidade"] * dados["preco"]
    return total

# Função para mostrar a lista de produtos do cliente
def mostrar_produtos_cliente(clientes, nome_cliente):
    print("Produtos:")
    for produto, dados in clientes[nome_cliente]["produtos"].items():
        print(f"  {produto}: {dados['quantidade']} x R${dados['preco']:.2f} = R${dados['quantidade'] * dados['preco']:.2f}")

# Função para fazer login do cliente
def login_cliente(clientes, nome, senha):
    if nome in clientes and clientes[nome]["senha"] == senha:
        return True
    else:
        return False

# Inicializar o arquivo de dados
clientes_file = "clientes.txt"
clientes = ler_dados(clientes_file)

while True:
    print("Opções:")
    print("1. Cadastrar cliente")
    print("2. Fazer login")
    print("3. Sair")
    opcao = input("Escolha uma opção: ")
    if opcao == "1":
        nome = input("Digite o nome do cliente: ")
        senha = input("Digite a senha do cliente: ")
        clientes = cadastrar_cliente(clientes, nome, senha)
        gravar_dados(clientes_file, clientes)
        print("Cliente cadastrado com sucesso!")
    elif opcao == "2":
        nome = input("Digite o nome do cliente: ")
        senha = input("Digite a senha do cliente: ")
        if login_cliente(clientes, nome, senha):
            print("Login realizado com sucesso!")
            while True:
                print("Opções:")
                print("1. Adicionar produto")
                print("2. Ver produtos e total")
                print("3. Sair")
                opcao_cliente = input("Escolha uma opção: ")
                if opcao_cliente == "1":
                    produto = input("Digite o nome do produto: ")
                    quantidade = int(input("Digite a quantidade do produto: "))
                    clientes = add_produto_cliente(clientes, nome, produto, quantidade)
                    gravar_dados(clientes_file, clientes)
                    print(f"Produto {produto} adicionado com sucesso!")
                elif opcao_cliente == "2":
                    mostrar_produtos_cliente(clientes, nome)
                    total = calcular_total_cliente(clientes, nome)
                    print(f"Total: R${total:.2f}")
                elif opcao_cliente == "3":
                    break
                else:
                    print("Opção inválida. Tente novamente!")
        else:
            print("Senha ou nome de usuário incorretos. Tente novamente!")
    elif opcao == "3":
        break
    else:
        print("Opção invalida")