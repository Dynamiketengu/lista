let usuarios = [];

let listaDeCompras = [];

function cadastrarUsuario(nome, email, senha) {
  let usuario = {
    nome: nome,
    email: email,
    senha: senha
  };
  usuarios.push(usuario);
  console.log(`Usuário cadastrado com sucesso!`);
}

function logarUsuario(email, senha) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email && usuarios[i].senha === senha) {
      console.log(`Logado com sucesso! Bem-vindo, ${usuarios[i].nome}!`);
      return true;
    }
  }
  console.log(`Erro: Email ou senha incorretos.`);
  return false;
}

function calcularTotal() {
  let total = 0;
  for (let i = 0; i < listaDeCompras.length; i++) {
    total += listaDeCompras[i].quantidade * listaDeCompras[i].preco;
  }
  return total;
}

function adicionarItem(nome, quantidade, preco) {
  listaDeCompras.push({
    nome: nome,
    quantidade: quantidade,
    preco: preco
  });
}

function removerItem(nome) {
  for (let i = 0; i < listaDeCompras.length; i++) {
    if (listaDeCompras[i].nome === nome) {
      listaDeCompras.splice(i, 1);
      break;
    }
  }
}

function comprar() {
  if (listaDeCompras.length === 0) {
    console.log("Erro: A lista de compras está vazia.");
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
  notaFiscal += `Itens:\n`;
  for (let i = 0; i < listaDeCompras.length; i++) {
    notaFiscal += ` ${i + 1}. ${listaDeCompras[i].nome} - Quantidade: ${listaDeCompras[i].quantidade} - Preço: R$ ${listaDeCompras[i].preco.toFixed(2)}\n`;
  }
  notaFiscal += `Total: R$ ${total.toFixed(2)}\n`;

  const fs = require('fs');
  fs.writeFileSync('nota_fiscal.txt', notaFiscal);
  console.log("Nota fiscal gerada e salva em nota_fiscal.txt");

  listaDeCompras = []; 
}

cadastrarUsuario("João", "joao@example.com", "123456");

if (logarUsuario("joao@example.com", "123456")) {

  listaDeCompras = [
    {
      nome: "Leite",
      quantidade: 2,
      preco: 3.50
    },
    {
      nome: "Pão",
      quantidade: 1,
      preco: 2.00
    },
    {
      nome: "Ovos",
      quantidade: 6,
      preco: 1.50
    },
    {
      nome: "Carne",
      quantidade: 1,
      preco: 15.00
    },
    {
      nome: "Frutas",
      quantidade: 3,
      preco: 5.00
    },
    {
      nome: "Verduras",
      quantidade: 2,
      preco: 3.00
    }
  ];

  console.log("Lista de compras:");
  for (let i = 0; i < listaDeCompras.length; i++) {
    console.log(` ${i + 1}. ${listaDeCompras[i].nome} - Quantidade: ${listaDeCompras[i].quantidade} - Preço: R$ ${listaDeCompras[i].preco.toFixed(2)}`);
  }

  comprar();
}
