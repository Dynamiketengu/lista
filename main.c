#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_FILMES 100
#define MAX_CLIENTES 50
#define MAX_NOME 50

typedef struct {
    char nome[MAX_NOME];
    int ano;
    int disponibilidade; // 1 se disponível, 0 se alugado
} Filme;

typedef struct {
    char nome[MAX_NOME];
    char senha[MAX_NOME];
    Filme filmes_alugados[MAX_FILMES];
    int num_filmes_alugados;
} Cliente;

typedef struct {
    Filme filmes[MAX_FILMES];
    int num_filmes;
    Cliente clientes[MAX_CLIENTES];
    int num_clientes;
} Locadora;

void adicionar_filme(Locadora *locadora) {
    if (locadora->num_filmes < MAX_FILMES) {
        printf("Digite o nome do filme: ");
        scanf(" %[^\n]", locadora->filmes[locadora->num_filmes].nome);
        printf("Digite o ano do filme: ");
        scanf("%d", &locadora->filmes[locadora->num_filmes].ano);
        locadora->filmes[locadora->num_filmes].disponibilidade = 1; // Marca como disponível
        locadora->num_filmes++;
        printf("Filme adicionado com sucesso!\n");
    } else {
        printf("Limite de filmes alcançado.\n");
    }
}

void listar_filmes(Locadora *locadora) {
    printf("\nFilmes disponíveis para aluguel:\n");
    for (int i = 0; i < locadora->num_filmes; i++) {
        if (locadora->filmes[i].disponibilidade) {
            printf("Nome: %s | Ano: %d\n", locadora->filmes[i].nome, locadora->filmes[i].ano);
        }
    }
}

void alugar_filme(Locadora *locadora, Cliente *cliente) {
    char nome_filme[MAX_NOME];
    printf("Digite o nome do filme que deseja alugar: ");
    scanf(" %[^\n]", nome_filme);

    for (int i = 0; i < locadora->num_filmes; i++) {
        if (strcmp(locadora->filmes[i].nome, nome_filme) == 0 && locadora->filmes[i].disponibilidade) {
            locadora->filmes[i].disponibilidade = 0; // Marca como alugado
            cliente->filmes_alugados[cliente->num_filmes_alugados++] = locadora->filmes[i];
            printf("Filme alugado com sucesso!\n");
            return;
        }
    }
    printf("Filme não encontrado ou não disponível.\n");
}

void listar_filmes_alugados(Cliente *cliente) {
    printf("\nFilmes alugados:\n");
    for (int i = 0; i < cliente->num_filmes_alugados; i++) {
        printf("Nome: %s | Ano: %d\n", cliente->filmes_alugados[i].nome, cliente->filmes_alugados[i].ano);
    }
}

void adicionar_cliente(Locadora *locadora) {
    if (locadora->num_clientes < MAX_CLIENTES) {
        printf("Digite o nome do cliente: ");
        scanf(" %[^\n]", locadora->clientes[locadora->num_clientes].nome);
        printf("Digite a senha do cliente: ");
        scanf("%s", locadora->clientes[locadora->num_clientes].senha);
        locadora->clientes[locadora->num_clientes].num_filmes_alugados = 0;
        locadora->num_clientes++;
        printf("Cliente adicionado com sucesso!\n");
    } else {
        printf("Limite de clientes alcançado.\n");
    }
}

void listar_clientes(Locadora *locadora) {
    printf("\nClientes cadastrados:\n");
    for (int i = 0; i < locadora->num_clientes; i++) {
        printf("Cliente: %s\n", locadora->clientes[i].nome);
    }
}

int main() {
    Locadora locadora = { .num_filmes = 0, .num_clientes = 0 };
    
    int opcao;
    do {
        printf("\n1. Cliente Menu\n2. Admin Menu\n3. Sair\n");
        printf("Escolha uma opção: ");
        scanf("%d", &opcao);

        if (opcao == 1) {
            Cliente cliente;
            printf("Digite seu nome: ");
            scanf(" %[^\n]", cliente.nome);
            printf("Digite sua senha: ");
            scanf("%s", cliente.senha);
            cliente.num_filmes_alugados = 0;

            int opcao_cliente;
            do {
                printf("\n1. Listar filmes\n2. Alugar filme\n3. Listar filmes alugados\n4. Voltar\n");
                printf("Escolha uma opção: ");
                scanf("%d", &opcao_cliente);

                switch (opcao_cliente) {
                    case 1:
                        listar_filmes(&locadora);
                        break;
                    case 2:
                        alugar_filme(&locadora, &cliente);
                        break;
                    case 3:
                        listar_filmes_alugados(&cliente);
                        break;
                    case 4:
                        printf("Voltando...\n");
                        break;
                    default:
                        printf("Opção inválida. Tente novamente.\n");
                }
            } while (opcao_cliente != 4);
        } else if (opcao == 2) {
            int opcao_admin;
            do {
                printf("\n1. Adicionar filme\n2. Listar clientes\n3. Voltar\n");
                printf("Escolha uma opção: ");
                scanf("%d", &opcao_admin);

                switch (opcao_admin) {
                    case 1:
                        adicionar_filme(&locadora);
                        break;
                    case 2:
                        listar_clientes(&locadora);
                        break;
                    case 3:
                        printf("Voltando...\n");
                        break;
                    default:
                        printf("Opção inválida. Tente novamente.\n");
                }
            } while (opcao_admin != 3);
        } else if (opcao != 3) {
            printf("Opção inválida. Tente novamente.\n");
        }
    } while (opcao != 3);

    return 0;
}