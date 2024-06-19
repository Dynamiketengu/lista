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
def add_produto_cliente(clientes, nome_cliente, produto, quantidade, preco):
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
                    preco = float(input("Digite o preço do produto: "))
                    clientes = add_produto_cliente(clientes, nome, produto, quantidade, preco)
                    gravar_dados(clientes_file, clientes)
                    print("Produto adicionado com sucesso!")

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
        print("Opção inválida. Tente novamente!")