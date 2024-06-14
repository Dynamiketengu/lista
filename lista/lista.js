class Cliente {
    constructor(nome) {
      this.nome = nome;
      this.listaDeCompras = [];
    }
  

    adicionarProduto(produto) {
      this.listaDeCompras.push(produto);
    }
  
    calcularTotal() {
      let total = 0;
      for (let i = 0; i < this.listaDeCompras.length; i++) {
        total += this.listaDeCompras[i].preco;
      }
      return total;
    }
  }
  
  class Produto {
    constructor(nome, preco) {
      this.nome = nome;
      this.preco = preco;
    }
  }

  const cliente = new Cliente('');
  const produto1 = new Produto('Leite', 2.50);
  const produto2 = new Produto('Pão', 1.50);
  
  cliente.adicionarProduto(produto1);
  cliente.adicionarProduto(produto2);
  
  console.log(`Total: R$ ${cliente.calcularTotal().toFixed(2)}`);