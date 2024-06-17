function NotaFiscal(cliente, produtos) {
    this.cliente = cliente;
    this.produtos = produtos;
    this.total = 0;
  
    this.calcularTotal = function() {
      this.total = this.produtos.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
    };
  
    this.imprimirNota = function() {
      console.log(`Nota Fiscal - ${this.cliente.nome}`);
      console.log(`---------------------------`);
      console.log(`Produtos:`);
      this.produtos.forEach((produto) => {
        console.log(`  ${produto.nome} - R$ ${produto.preco.toFixed(2)} x ${produto.quantidade} = R$ ${(produto.preco * produto.quantidade).toFixed(2)}`);
      });
      console.log(`---------------------------`);
      console.log(`Total: R$ ${this.total.toFixed(2)}`);
    };
  }

  const cliente = { nome: 'nicolas gardinal' };
  const produtos = [
    { nome: 'coca', preco: 14.98, quantidade: 1 },
    { nome: 'chocolate', preco: 6.89, quantidade: 1 },
    { nome: 'fini', preco: 4.50, quantidade: 2 },
  ];

  const notaFiscal = new NotaFiscal(cliente, produtos);
  notaFiscal.calcularTotal();
  notaFiscal.imprimirNota();