# Dicionário para armazenar os clientes e seus dados
clientes = {}

def adicionar_cliente():
    nome = input("Digite o nome do cliente: ")
    clientes[nome] = {"produtos": []}
    print(f"Cliente {nome} adicionado com sucesso!")

def adicionar_produto():
    nome_cliente = input("Digite o nome do cliente: ")
    if nome_cliente in clientes:
        nome_produto = input("Digite o nome do produto: ")
        quantidade = int(input("Digite a quantidade do produto: "))
        preco = float(input("Digite o preço do produto: "))
        clientes[nome_cliente]["produtos"].append({"nome": nome_produto, "quantidade": quantidade, "preco": preco})
        print(f"Produto {nome_produto} adicionado ao cliente {nome_cliente} com sucesso!")
    else:
        print("Cliente não encontrado!")

def imprimir_nota_fiscal():
    nome_cliente = input("Digite o nome do cliente: ")
    if nome_cliente in clientes:
        produtos = clientes[nome_cliente]["produtos"]
        total = 0
        print(f"Nota Fiscal - {nome_cliente}")
        print("---------------------------")
        print("Produtos:")
        for produto in produtos:
            print(f"  {produto['nome']} - R$ {produto['preco']:.2f} x {produto['quantidade']} = R$ {(produto['preco'] * produto['quantidade']):.2f}")
            total += produto['preco'] * produto['quantidade']
        print("---------------------------")
        print(f"Total: R$ {total:.2f}")
    else:
        print("Cliente não encontrado!")

def gravar_dados():
    with open("clientes.txt", "w") as f:
        for cliente, dados in clientes.items():
            f.write(f"{cliente}:{dados['produtos']}\n")

def carregar_dados():
    global clientes
    try:
        with open("clientes.txt", "r") as f:
            for linha in f.readlines():
                cliente, produtos = linha.strip().split(":")
                clientes[cliente] = {"produtos": eval(produtos)}
    except FileNotFoundError:
        pass

carregar_dados()

while True:
    print("Opções:")
    print("1. Adicionar cliente")
    print("2. Adicionar produto")
    print("3. Imprimir nota fiscal")
    print("4. Gravar dados")
    print("5. Sair")
    opcao = input("Digite a opção: ")
    if opcao == "1":
        adicionar_cliente()
    elif opcao == "2":
        adicionar_produto()
    elif opcao == "3":
        imprimir_nota_fiscal()
    elif opcao == "4":
        gravar_dados()
    elif opcao == "5":
        break
    else:
        print("Opção inválida!")