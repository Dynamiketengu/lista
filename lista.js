function Client(nome) {
  this.nome = nome;
}

function NotaFiscal(client, produtos) {
  this.cliente = client;
  this.produtos = produtos;
  this.total = 0;

  this.calcularTotal = function () {
    this.total = this.produtos.reduce(
      (total, produto) => total + produto.preco * produto.quantidade,
      0
    );
  };

  this.imprimirNota = function () {
    console.log(`Nota Fiscal - ${this.cliente.nome}`);
    console.log(`---------------------------`);
    console.log(`Cliente: ${this.cliente.nome}`); // Display client's name
    console.log(`---------------------------`);
    console.log(`Produtos:`);
    this.produtos.forEach((produto) => {
      console.log(`  ${produto.nome} - R$ ${produto.preco.toFixed(2)} x ${produto.quantidade} = R$ ${(produto.preco * produto.quantidade).toFixed(2)}`);
    });
    console.log(`---------------------------`);
    console.log(`Total: R$ ${this.total.toFixed(2)}`);
  };
}

// Exemplo de uso
const cliente = new Client('João da Silva');
const produtos = [
  { nome: 'Leite', preco: 2.5, quantidade: 2 },
  { nome: 'Pão', preco: 1.5, quantidade: 3 },
  { nome: 'Ovo', preco: 0.5, quantidade: 6 },
];

const notaFiscal = new NotaFiscal(cliente, produtos);
notaFiscal.calcularTotal();
notaFiscal.imprimirNota();