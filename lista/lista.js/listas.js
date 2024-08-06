const readline = require('readline');
const fs = require('fs');

// Interface para leitura de entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Dados simulados de usuários e produtos (poderiam ser salvos em um banco de dados)
let users = [
  { username: 'admin', password: 'admin' }
];

let products = [
  { id: 1, name: 'Produto A', price: 10, stock: 5 },
  { id: 2, name: 'Produto B', price: 20, stock: 3 },
  { id: 3, name: 'Produto C', price: 15, stock: 7 }
];

// Função para validar o login do usuário
function login(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

// Função para listar os produtos disponíveis
function listProducts() {
  console.log('Lista de Produtos:');
  products.forEach(product => {
    console.log(`${product.id} - ${product.name} | Preço: R$ ${product.price.toFixed(2)} | Estoque: ${product.stock}`);
  });
}

// Função para comprar um produto
function buyProduct(userId, productId, quantity) {
  const product = products.find(prod => prod.id === productId);
  if (!product) {
    console.log('Produto não encontrado.');
    return;
  }
  if (product.stock < quantity) {
    console.log('Estoque insuficiente.');
    return;
  }
  const totalPrice = product.price * quantity;
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const timestamp = `${date} ${time}`;
  const receipt = `===== Nota Fiscal =====\nData: ${timestamp}\nUsuário: ${userId}\nProduto: ${product.name}\nQuantidade: ${quantity}\nTotal: R$ ${totalPrice.toFixed(2)}\n=======================`;

  fs.writeFile('nota_fiscal.txt', receipt, (err) => {
    if (err) throw err;
    console.log(`Compra realizada com sucesso. Nota fiscal gerada em nota_fiscal.txt`);
    // Atualizar o estoque
    product.stock -= quantity;
  });
}

// Função principal para executar o programa
function main() {
  console.log('Bem-vindo ao sistema de compras.');

  rl.question('Digite seu usuário: ', (username) => {
    rl.question('Digite sua senha: ', (password) => {
      const currentUser = login(username, password);
      if (currentUser) {
        console.log(`Login bem-sucedido. Olá, ${username}!`);
        listProducts();
        rl.question('Digite o ID do produto que deseja comprar: ', (productId) => {
          rl.question('Digite a quantidade desejada: ', (quantity) => {
            buyProduct(username, parseInt(productId), parseInt(quantity));
            rl.close();
          });
        });
      } else {
        console.log('Usuário ou senha incorretos. Encerrando.');
        rl.close();
      }
    });
  });
}

// Iniciar o programa
main();
