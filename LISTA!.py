import random
import datetime



def gravar_dados(file, dados):
    with open(file, "w") as f:
        f.write(str(dados))

def ler_dados(file):
    try:
        with open(file, "r") as f:
            return eval(f.read())
    except FileNotFoundError:
        return {}

def cadastrar_cliente(clientes, nome, senha):
    clientes[nome] = {"senha": senha, "produtos": {}}
    return clientes

def add_produto_cliente(clientes, nome_cliente, produto, quantidade, produtos_disponiveis):
    if produto in produtos_disponiveis:
        preco = produtos_disponiveis[produto]
    else:
        preco = round(random.uniform(0.50, 7.69), 2)
    
    if quantidade <= produtos_disponiveis[produto]:
        if produto in clientes[nome_cliente]["produtos"]:
            clientes[nome_cliente]["produtos"][produto]["quantidade"] += quantidade
        else:
            clientes[nome_cliente]["produtos"][produto] = {"quantidade": quantidade, "preco": preco}
        

        produtos_disponiveis[produto] -= quantidade
        return True
    else:
        print(f"Quantidade solicitada de {produto} não disponível.")
        return False

def calcular_total_cliente(clientes, nome_cliente):
    total = 0
    for produto, dados in clientes[nome_cliente]["produtos"].items():
        total += dados["quantidade"] * dados["preco"]
    return total

def mostrar_produtos_disponiveis(produtos_disponiveis):
    print("\nProdutos Disponíveis:")
    for produto, estoque in produtos_disponiveis.items():
        print(f"{produto}: {estoque} unidades")

def mostrar_produtos_cliente(clientes, nome_cliente):
    print("\nProdutos comprados:")
    for produto, dados in clientes[nome_cliente]["produtos"].items():
        print(f"{produto}: {dados['quantidade']} unidades x R${dados['preco']:.2f} = R${dados['quantidade'] * dados['preco']:.2f}")

def login_cliente(clientes, nome, senha):
    if nome in clientes and clientes[nome]["senha"] == senha:
        return True
    else:
        return False


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


clientes_file = "clientes.txt"

produtos_disponiveis = {
    "oleo": 100,
    "fini": 100,
    "cerveja": 100,
    "leite": 100,
    "pão de alho": 100,
    "costela": 100,
    "macarrão": 100,
    "feijão": 100,
    "cafe": 100,
    "açucar": 100,
    "vinagre": 100,
    "sabonete": 100,
    "sal": 100,
    "alface": 100,
    "maionese": 100,
    "carne": 100,
    "presunto": 100,
    "bolo": 100,
    "oleo de soja": 100,
    "linguiça": 100,
    "salsicha": 100,
    "agua mineral": 100,
    "farinha de trigo": 100,
    
}

clientes = ler_dados(clientes_file)

while True:
    print("\nOpções:")
    print("1. Cadastrar cliente")
    print("2. Fazer login")
    print("3. deslogar")
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
                print("1. adicionar ao carrinho")
                print("2. Ver produtos do carrinho e total")
                print("3. Finalizar compra")
                print("4. deslogar")
                opcao_cliente = input("Escolha uma opção: ")

                if opcao_cliente == "1":
                    mostrar_produtos_disponiveis(produtos_disponiveis)
                    produto = input("Digite o nome do produto: ")
                    if produto in produtos_disponiveis:
                        quantidade = int(input("Digite a quantidade do produto: "))
                        if add_produto_cliente(clientes, nome, produto, quantidade, produtos_disponiveis):
                            gravar_dados(clientes_file, clientes)
                            print(f"Produto {produto} adicionado ao carrinho com sucesso!")
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
            print("Senha ou nome de usuário incorretos. Tente novamente!")

    elif opcao == "3":
        break

    else:
        print("Opção inválida. Tente novamente!")
