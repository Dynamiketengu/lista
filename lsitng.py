import random
import datetime

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

# Função para cadastrar um novo cliente
def cadastrar_cliente(clientes, nome, senha):
    if nome not in clientes:
        clientes[nome] = {"senha": senha, "produtos": {}}
        return clientes
    else:
        print("Nome de usuário já existe. Escolha outro nome.")
        return clientes

# Função para adicionar um produto ao carrinho do cliente
def add_produto_cliente(clientes, nome_cliente, produto, quantidade, produtos_disponiveis):
    if produto in produtos_disponiveis:
        preco = produtos_disponiveis[produto]["preco"]
    else:
        preco = round(random.uniform(0.50, 7.69), 2)
    
    if quantidade <= produtos_disponiveis[produto]["estoque"]:
        if produto in clientes[nome_cliente]["produtos"]:
            clientes[nome_cliente]["produtos"][produto]["quantidade"] += quantidade
        else:
            clientes[nome_cliente]["produtos"][produto] = {"quantidade": quantidade, "preco": preco}
        
        produtos_disponiveis[produto]["estoque"] -= quantidade
        return True
    else:
        print(f"Quantidade solicitada de {produto} não disponível.")
        return False

# Função para calcular o total da compra do cliente
def calcular_total_cliente(clientes, nome_cliente):
    total = 0
    for produto, dados in clientes[nome_cliente]["produtos"].items():
        total += dados["quantidade"] * dados["preco"]
    return total

# Função para mostrar os produtos disponíveis
def mostrar_produtos_disponiveis(produtos_disponiveis):
    print("\nProdutos Disponíveis:")
    for chave, dados in produtos_disponiveis.items():
        print(f"{dados['nome']} - Estoque: {dados['estoque']} unidades - Preço: R${dados['preco']:.2f}")

# Função para mostrar os produtos no carrinho do cliente
def mostrar_produtos_cliente(clientes, nome_cliente):
    print("\nProdutos no Carrinho:")
    for produto, dados in clientes[nome_cliente]["produtos"].items():
        print(f"{produto}: {dados['quantidade']} unidades x R${dados['preco']:.2f} = R${dados['quantidade'] * dados['preco']:.2f}")

# Função para realizar o login do cliente
def login_cliente(clientes, nome, senha):
    if nome in clientes and clientes[nome]["senha"] == senha:
        return True
    else:
        return False

# Função para salvar a compra em um arquivo de nota fiscal
def salvar_compra(clientes, nome_cliente):
    data_hora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    nome_arquivo = f"nota_fiscal_{nome_cliente}_{data_hora}.txt"
    
    with open(nome_arquivo, "w") as file:
        file.write(f"Nota Fiscal - Cliente: {nome_cliente}\n")
        file.write(f"Data e Hora da Compra: {data_hora}\n\n")
        
        file.write("Produtos Comprados:\n")
        for produto, dados in clientes[nome_cliente]["produtos"].items():
            file.write(f"{produto}: {dados['quantidade']} unidades x R${dados['preco']:.2f} = R${dados['quantidade'] * dados['preco']:.2f}\n")
        
        total = calcular_total_cliente(clientes, nome_cliente)
        file.write(f"\nTotal da Compra: R${total:.2f}")

# Arquivo para armazenar os dados dos clientes
clientes_file = "clientes.txt"

# Dicionário com os produtos disponíveis
produtos_disponiveis = {
    'arroz': {'nome': 'arroz', 'estoque': 10, 'preco': 30.0},
    'feijão': {'nome': 'feijão', 'estoque': 15, 'preco': 16.0},
    'macarrão': {'nome': 'macarrão', 'estoque': 20, 'preco': 7.99},
    'leite': {'nome': 'leite', 'estoque': 12, 'preco': 3.50},
    'café': {'nome': 'café', 'estoque': 8, 'preco': 14.10},
    'cartela de ovo ': {'nome': 'cartela de ovo com 30', 'estoque': 100, 'preco': 17.98},
    'batata': {'nome': 'batata kg', 'estoque': 10, 'preco': 10.9},
    'carvão': {'nome': 'carvão', 'estoque': 5, 'preco': 18.90},
    'barra de chocolate nestlé': {'nome': 'barra de chocolate nestlé', 'estoque': 60, 'preco': 3.90},
    'camarão': {'nome': 'camarão', 'estoque': 80, 'preco': 7.90},
    'banana': {'nome': 'banana', 'estoque': 90, 'preco': 2.90},
    'maçã': {'nome': 'maçã', 'estoque': 5, 'preco': 10.90},
    'carne moida': {'nome': 'carne moida', 'estoque': 5, 'preco': 10.90},
    'pão': {'nome': 'pão', 'estoque': 5, 'preco': 10.90},
    'geleia': {'nome': 'geleia', 'estoque': 5, 'preco': 10.90},
}

# Carregar dados dos clientes do arquivo
clientes = ler_dados(clientes_file)

# Loop principal do programa
while True:
    print("\nOpções:")
    print("1. Cadastrar cliente")
    print("2. Fazer login")
    print("3. Sair do programa")
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
                print("\nOpções:")
                print("1. Adicionar produto ao carrinho")
                print("2. Ver produtos no carrinho e total")
                print("3. Finalizar compra")
                print("4. Deslogar")
                opcao_cliente = input("Escolha uma opção: ")

                if opcao_cliente == "1":
                    mostrar_produtos_disponiveis(produtos_disponiveis)
                    produto = input("Digite o nome do produto desejado: ")
                    if produto in produtos_disponiveis:
                        quantidade = int(input("Digite a quantidade desejada: "))
                        if add_produto_cliente(clientes, nome, produto, quantidade, produtos_disponiveis):
                            gravar_dados(clientes_file, clientes)
                            print(f"Produto {produtos_disponiveis[produto]['nome']} adicionado ao carrinho com sucesso!")
                    else:
                        print("Produto não disponível.")
                
                elif opcao_cliente == "2":
                    mostrar_produtos_cliente(clientes, nome)
                    total = calcular_total_cliente(clientes, nome)
                    print(f"Total: R${total:.2f}")

                elif opcao_cliente == "3":
                    salvar_compra(clientes, nome)
                    print("Compra finalizada. Nota fiscal gerada.")

                    clientes[nome]["produtos"] = {}
                    gravar_dados(clientes_file, clientes)
                    break

                elif opcao_cliente == "4":
                    break

                else:
                    print("Opção inválida. Tente novamente!")

        else:
            print("Nome de usuário ou senha incorretos. Tente novamente!")

    elif opcao == "3":
        break

    else:
        print("Opção inválida. Tente novamente!")
