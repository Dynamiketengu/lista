const readline = require('readline');
const fs = require('fs');

let usuarios = [];
let usuarioLogado = null;
let listaDeLocacao = [];
const catalogo = [
  { id: 1, nome: "O Senhor dos Anéis", preco: 5.00, quantidadeDisponivel: 10 },
  { id: 2, nome: "A Origem", preco: 4.50, quantidadeDisponivel: 8 },
  { id: 3, nome: "O Poderoso Chefão", preco: 6.00, quantidadeDisponivel: 5 },
  { id: 4, nome: "Titanic", preco: 3.50, quantidadeDisponivel: 7 },
  { id: 5, nome: "Matrix", preco: 5.50, quantidadeDisponivel: 6 },
  { id: 6, nome: "Jurassic Park", preco: 4.00, quantidadeDisponivel: 9 }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ADMIN_USER = "admin"; // Nome de usuário do admin
const ADMIN_PASS = "admin123"; // Senha do admin

function iniciarSistema() {
  console.log("\nBem-vindo ao sistema de locação de filmes!");
  rl.question('Escolha uma opção:\n1 - Cadastrar usuário\n2 - Logar\n3 - Sair\nOpção: ', function(opcao) {
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
      if (nome === ADMIN_USER && senha === ADMIN_PASS) {
        console.log(`Logado como administrador.`);
        menuAdm();
      } else {
        let usuarioEncontrado = usuarios.find(u => u.nome === nome && u.senha === senha);
        if (usuarioEncontrado) {
          usuarioLogado = usuarioEncontrado;
          console.log(`Logado com sucesso! Bem-vindo, ${usuarioLogado.nome}!`);
          mostrarCatalogo();
        } else {
          console.log(`Erro: Nome ou senha incorretos.`);
          iniciarSistema();
        }
      }
    });
  });
}

function mostrarCatalogo() {
  console.log("\nCatálogo de Filmes:");
  catalogo.forEach(filme => {
    console.log(`${filme.id}. ${filme.nome} - R$ ${filme.preco.toFixed(2)} - Disponível: ${filme.quantidadeDisponivel}`);
  });
  rl.question('Escolha uma opção:\n1 - Alugar filme\n2 - Ver locação\n3 - Finalizar locação\n4 - Sair\nOpção: ', function(opcao) {
    switch (opcao) {
      case '1':
        rl.question('Digite o número do filme que deseja alugar: ', function(resposta) {
          let opcaoFilme = parseInt(resposta);
          if (opcaoFilme >= 1 && opcaoFilme <= catalogo.length) {
            adicionarFilmeALocacao(opcaoFilme);
          } else {
            console.log("Opção inválida.");
            mostrarCatalogo();
          }
        });
        break;
      case '2':
        verLocacao();
        break;
      case '3':
        finalizarLocacao();
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

function adicionarFilmeALocacao(opcao) {
  let filme = catalogo.find(f => f.id === opcao);
  if (!filme) {
    console.log("Filme não encontrado.");
    mostrarCatalogo();
    return;
  }
  if (filme.quantidadeDisponivel === 0) {
    console.log(`Filme "${filme.nome}" não está disponível para locação.`);
    mostrarCatalogo();
    return;
  }
  listaDeLocacao.push(filme);
  filme.quantidadeDisponivel--;
  console.log(`Filme "${filme.nome}" adicionado à locação.`);
  mostrarCatalogo();
}

function verLocacao() {
  if (listaDeLocacao.length === 0) {
    console.log("Sua locação está vazia.");
    mostrarCatalogo();
    return;
  }
  console.log("\nLocação de Filmes:");
  listaDeLocacao.forEach((filme, index) => {
    console.log(` ${index + 1}. ${filme.nome} - Preço: R$ ${filme.preco.toFixed(2)}`);
  });
  let total = calcularTotal();
  console.log(`Total: R$ ${total.toFixed(2)}`);
  rl.question('\nEscolha uma opção:\n1 - Voltar ao catálogo\n2 - Finalizar locação\n3 - Sair\nOpção: ', function(opcao) {
    switch (opcao) {
      case '1':
        mostrarCatalogo();
        break;
      case '2':
        finalizarLocacao();
        break;
      case '3':
        rl.close();
        break;
      default:
        console.log("Opção inválida.");
        verLocacao();
        break;
    }
  });
}

function calcularTotal() {
  return listaDeLocacao.reduce((acc, filme) => acc + filme.preco, 0);
}

function finalizarLocacao() {
  if (listaDeLocacao.length === 0) {
    console.log("Erro: A locação está vazia.");
    iniciarSistema();
    return;
  }
  let total = calcularTotal();
  console.log("\nVocê alugou os seguintes filmes:");
  listaDeLocacao.forEach((filme, index) => {
    console.log(` ${index + 1}. ${filme.nome} - Preço: R$ ${filme.preco.toFixed(2)}`);
  });
  console.log(`Total: R$ ${total.toFixed(2)}`);

  let notaFiscal = `Nota de Locação\n`;
  notaFiscal += `Data: ${new Date().toLocaleDateString()}\n`;
  notaFiscal += `Hora: ${new Date().toLocaleTimeString()}\n`;
  notaFiscal += `Cliente: ${usuarioLogado ? usuarioLogado.nome : 'Admin'}\n`;
  notaFiscal += `Filmes:\n`;
  listaDeLocacao.forEach((filme, index) => {
    notaFiscal += ` ${index + 1}. ${filme.nome} - Preço: R$ ${filme.preco.toFixed(2)}\n`;
  });
  notaFiscal += `Total: R$ ${total.toFixed(2)}\n`;

  fs.writeFileSync('nota_locacao.txt', notaFiscal);
  console.log("Nota de locação gerada e salva em nota_locacao.txt");

  listaDeLocacao = [];
  iniciarSistema();
}

function menuAdm() {
  rl.question('\nEscolha uma opção:\n1 - Adicionar filme\n2 - Remover filme\n3 - Atualizar filme\n4 - Listar usuários\n5 - Sair\nOpção: ', function(opcao) {
    switch (opcao) {
      case '1':
        adicionarFilme();
        break;
      case '2':
        removerFilme();
        break;
      case '3':
        atualizarFilme();
        break;
      case '4':
        listarUsuarios();
        break;
      case '5':
        iniciarSistema();
        break;
      default:
        console.log("Opção inválida.");
        menuAdm();
        break;
    }
  });
}

function adicionarFilme() {
  rl.question('Digite o nome do filme: ', function(nome) {
    rl.question('Digite o preço do aluguel: ', function(preco) {
      rl.question('Digite a quantidade disponível: ', function(qtd) {
        let novoFilme = {
          id: catalogo.length + 1,
          nome,
          preco: parseFloat(preco),
          quantidadeDisponivel: parseInt(qtd)
        };
        catalogo.push(novoFilme);
        console.log(`Filme "${nome}" adicionado ao catálogo.`);
        menuAdm();
      });
    });
  });
}

function removerFilme() {
  rl.question('Digite o ID do filme que deseja remover: ', function(id) {
    const index = catalogo.findIndex(f => f.id === parseInt(id));
    if (index !== -1) {
      const filmeRemovido = catalogo.splice(index, 1);
      console.log(`Filme "${filmeRemovido[0].nome}" removido do catálogo.`);
    } else {
      console.log("Filme não encontrado.");
    }
    menuAdm();
  });
}

function atualizarFilme() {
  rl.question('Digite o ID do filme que deseja atualizar: ', function(id) {
    const filme = catalogo.find(f => f.id === parseInt(id));
    if (!filme) {
      console.log("Filme não encontrado.");
      menuAdm();
      return;
    }
    rl.question('Digite o novo nome do filme: ', function(novoNome) {
      rl.question('Digite o novo preço do aluguel: ', function(novoPreco) {
        rl.question('Digite a nova quantidade disponível: ', function(novaQtd) {
          filme.nome = novoNome || filme.nome;
          filme.preco = parseFloat(novoPreco) || filme.preco;
          filme.quantidadeDisponivel = parseInt(novaQtd) || filme.quantidadeDisponivel;
          console.log(`Filme "${filme.nome}" atualizado com sucesso.`);
          menuAdm();
        });
      });
    });
  });
}

function listarUsuarios() {
  if (usuarios.length === 0) {
    console.log("Nenhum usuário cadastrado.");
  } else {
    console.log("\nUsuários Cadastrados:");
    usuarios.forEach((usuario, index) => {
      console.log(`${index + 1}. ${usuario.nome}`);
    });

  
    let conteudoUsuarios = "Usuários Cadastrados:\n";
    usuarios.forEach(usuario => {
      conteudoUsuarios += `${usuario.nome}\n`;
    });
    
    fs.writeFileSync('usuarios.txt', conteudoUsuarios);
    console.log("Lista de usuários salva em usuarios.txt");
  }
  menuAdm();
}

// Inicia o sistema
iniciarSistema();
