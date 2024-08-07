const readline = require('readline');
const fs = require('fs');

let usuarios = [];
let usuarioLogado = null;
let listaDeCompras = [];
const catalogo = [
  { id: 1, nome: "Leite", preco: 3.50, quantidadeDisponivel: 10 },
  { id: 2, nome: "Pão", preco: 2.00, quantidadeDisponivel: 20 },
  { id: 3, nome: "Ovos", preco: 1.50, quantidadeDisponivel: 30 },
  { id: 4, nome: "Carne", preco: 15.00, quantidadeDisponivel: 5 },
  { id: 5, nome: "Frutas", preco: 5.00, quantidadeDisponivel: 15 },
  { id: 6, nome: "Verduras", preco: 3.00, quantidadeDisponivel: 25 }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function cadastrarUsuario() {
  rl.question('Digite seu nome: ', function(nome) {
    rl.question('Digite sua senha: ', function(senha) {
      let usuario = { nome, senha };
      usuarios.push(usuario);
      console.log(`Usuário cadastrado com sucesso!`);
      iniciarSistema();
    });
  });
}

function logarUsuario() {
  rl.question('Digite seu nome: ', function(nome) {
    rl.question('Digite sua senha: ', function(senha) {
      let usuarioEncontrado = usuarios.find(u => u.nome === nome && u.senha === senha);
      if (usuarioEncontrado) {
        usuarioLogado = usuarioEncontrado;
        console.log(`Logado com sucesso! Bem-vindo, ${usuarioLogado.nome}!`);
        mostrarCatalogo();
      } else {
        console.log(`Erro: Nome ou senha incorretos.`);
        iniciarSistema();
      }
    });
  });
}

function mostrarCatalogo() {
  console.log("\nCatálogo de Produtos:");
  catalogo.forEach(produto => {
    console.log(`${produto.id}. ${produto.nome} - R$ ${produto.preco.toFixed(2)} - Disponível: ${produto.quantidadeDisponivel}`);
  });
  rl.question('Escolha uma opção:\n1 - Adicionar produto ao carrinho\n2 - Ver carrinho de compras\n3 - Finalizar compra\n4 - Sair\nOpção: ', function(opcao) {
    switch (opcao) {
      case '1':
        rl.question('Digite o número do produto que deseja adicionar à lista de compras: ', function(resposta) {
          let opcaoProduto = parseInt(resposta);
          if (opcaoProduto >= 1 && opcaoProduto <= catalogo.length) {
            rl.question('Digite a quantidade desejada: ', function(quantidade) {
              let qnt = parseInt(quantidade);
              if (qnt > 0) {
                adicionarProdutoAoCarrinho(opcaoProduto, qnt);
              } else {
                console.log("Quantidade inválida.");
                mostrarCatalogo();
              }
            });
          } else {
            console.log("Opção inválida.");
            mostrarCatalogo();
          }
        });
        break;
      case '2':
        verCarrinho();
        break;
      case '3':
        comprar();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log("Opção inválida.");
        mostrarCatalogo();
        break;
    }
  });
}

function adicionarProdutoAoCarrinho(opcao, quantidade) {
  let produto = catalogo.find(p => p.id === opcao);
  if (!produto) {
    console.log("Produto não encontrado.");
    mostrarCatalogo();
    return;
  }
  if (quantidade > produto.quantidadeDisponivel) {
    console.log(`Quantidade desejada (${quantidade}) excede a disponibilidade (${produto.quantidadeDisponivel}).`);
    mostrarCatalogo();
    return;
  }
  let itemNoCarrinho = listaDeCompras.find(p => p.nome === produto.nome);
  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade += quantidade;
  } else {
    listaDeCompras.push({ nome: produto.nome, quantidade, preco: produto.preco });
  }
  produto.quantidadeDisponivel -= quantidade;
  console.log(`Produto "${produto.nome}" (Quantidade: ${quantidade}) adicionado à lista de compras.`);
  mostrarCatalogo();
}

function verCarrinho() {
  if (listaDeCompras.length === 0) {
    console.log("Seu carrinho está vazio.");
    mostrarCatalogo();
    return;
  }
  console.log("\nCarrinho de Compras:");
  listaDeCompras.forEach((produto, index) => {
    console.log(` ${index + 1}. ${produto.nome} - Quantidade: ${produto.quantidade} - Preço: R$ ${produto.preco.toFixed(2)}`);
  });
  let total = calcularTotal();
  console.log(`Total: R$ ${total.toFixed(2)}`);
  rl.question('\nEscolha uma opção:\n1 - Voltar ao catálogo\n2 - Finalizar compra\n3 - Sair\nOpção: ', function(opcao) {
    switch (opcao) {
      case '1':
        mostrarCatalogo();
        break;
      case '2':
        comprar();
        break;
      case '3':
        rl.close();
        break;
      default:
        console.log("Opção inválida.");
        verCarrinho();
        break;
    }
  });
}

function calcularTotal() {
  return listaDeCompras.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0);
}

function comprar() {
  if (listaDeCompras.length === 0) {
    console.log("Erro: A lista de compras está vazia.");
    iniciarSistema();
    return;
  }
  let total = calcularTotal();
  console.log("\nVocê comprou os seguintes itens:");
  listaDeCompras.forEach((produto, index) => {
    console.log(` ${index + 1}. ${produto.nome} - Quantidade: ${produto.quantidade} - Preço: R$ ${produto.preco.toFixed(2)}`);
  });
  console.log(`Total: R$ ${total.toFixed(2)}`);

  let notaFiscal = `Nota Fiscal\n`;
  notaFiscal += `Data: ${new Date().toLocaleDateString()}\n`;
  notaFiscal += `Hora: ${new Date().toLocaleTimeString()}\n`;
  notaFiscal += `Cliente: ${usuarioLogado.nome}\n`;
  notaFiscal += `Itens:\n`;
  listaDeCompras.forEach((produto, index) => {
    notaFiscal += ` ${index + 1}. ${produto.nome} - Quantidade: ${produto.quantidade} - Preço: R$ ${produto.preco.toFixed(2)}\n`;
  });
  notaFiscal += `Total: R$ ${total.toFixed(2)}\n`;

  fs.writeFileSync('nota_fiscal.txt', notaFiscal);
  console.log("Nota fiscal gerada e salva em nota_fiscal.txt");

  salvarLogin();
  listaDeCompras = [];
  iniciarSistema();
}

function salvarLogin() {
  if (usuarioLogado) {
    let dadosLogin = `Usuário logado:\n`;
    dadosLogin += `Nome: ${usuarioLogado.nome}\n`;
    fs.writeFileSync('login.txt', dadosLogin);
    console.log("Dados de login salvos em login.txt");
  }
}

function iniciarSistema() {
  rl.question('\nEscolha uma opção:\n1 - Cadastrar usuário\n2 - Fazer login\n3 - Sair\nOpção: ', function(opcao) {
    switch (opcao) {
      case '1':
        cadastrarUsuario();
        break;
      case '2':
        logarUsuario();
        break;
      case '3':
        rl.close();
        break;
      default:
        console.log("Opção inválida.");
        iniciarSistema();
        break;
    }
  });
}

iniciarSistema();
