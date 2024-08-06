const readline = require('readline');
const fs = require('fs');

let usuarios = [];
let usuarioLogado = null;
let listaDeCompras = [];

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
      rl.close();
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
        rl.close();
        mostrarCatalogo();
      } else {
        console.log(`Erro: Nome ou senha incorretos.`);
        iniciarSistema();
      }
    });
  });
}

function mostrarCatalogo() {
  console.log("Catálogo de Produtos:");
  console.log("1. Leite - R$ 3.50");
  console.log("2. Pão - R$ 2.00");
  console.log("3. Ovos - R$ 1.50");
  console.log("4. Carne - R$ 15.00");
  console.log("5. Frutas - R$ 5.00");
  console.log("6. Verduras - R$ 3.00");
  rl.question('Digite o número do produto que deseja adicionar à lista de compras (ou "0" para finalizar): ', function(resposta) {
    let opcao = parseInt(resposta);
    if (opcao >= 1 && opcao <= 6) {
      adicionarProdutoAoCarrinho(opcao);
    } else if (opcao === 0) {
      comprar();
    } else {
      console.log("Opção inválida.");
      mostrarCatalogo();
    }
  });
}

function adicionarProdutoAoCarrinho(opcao) {
  let produto;
  switch (opcao) {
    case 1:
      produto = { nome: "Leite", quantidade: 1, preco: 3.50 };
      break;
    case 2:
      produto = { nome: "Pão", quantidade: 1, preco: 2.00 };
      break;
    case 3:
      produto = { nome: "Ovos", quantidade: 1, preco: 1.50 };
      break;
    case 4:
      produto = { nome: "Carne", quantidade: 1, preco: 15.00 };
      break;
    case 5:
      produto = { nome: "Frutas", quantidade: 1, preco: 5.00 };
      break;
    case 6:
      produto = { nome: "Verduras", quantidade: 1, preco: 3.00 };
      break;
    default:
      console.log("Opção inválida.");
      mostrarCatalogo();
      return;
  }
  listaDeCompras.push(produto);
  console.log(`Produto "${produto.nome}" adicionado à lista de compras.`);
  mostrarCatalogo();
}

function comprar() {
  if (listaDeCompras.length === 0) {
    console.log("Erro: A lista de compras está vazia.");
    iniciarSistema();
    return;
  }
  let total = calcularTotal();
  console.log(`Você comprou os seguintes itens:`);
  for (let i = 0; i < listaDeCompras.length; i++) {
    console.log(` ${i + 1}. ${listaDeCompras[i].nome} - Quantidade: ${listaDeCompras[i].quantidade} - Preço: R$ ${listaDeCompras[i].preco.toFixed(2)}`);
  }
  console.log(`Total: R$ ${total.toFixed(2)}`);

  let notaFiscal = `Nota Fiscal\n`;
  notaFiscal += `Data: ${new Date().toLocaleDateString()}\n`;
  notaFiscal += `Hora: ${new Date().toLocaleTimeString()}\n`;
  notaFiscal += `Cliente: ${usuarioLogado.nome}\n`;
  notaFiscal += `Itens:\n`;
  for (let i = 0; i < listaDeCompras.length; i++) {
    notaFiscal += ` ${i + 1}. ${listaDeCompras[i].nome} - Quantidade: ${listaDeCompras[i].quantidade} - Preço: R$ ${listaDeCompras[i].preco.toFixed(2)}\n`;
  }
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
  rl.question('Escolha uma opção:\n1 - Cadastrar usuário\n2 - Fazer login\n3 - Sair\nOpção: ', function(opcao) {
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
