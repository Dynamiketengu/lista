// mercado.txt (arquivo de exemplo)
// Cliente;Produto;Preço
// João;Leite;2.50
// Maria;Pão;1.20
// João;Ovo;1.80
//...

class Mercado {
    constructor(arquivo) {
      this.arquivo = arquivo;
      this.clientes = {};
      this.produtos = {};
      this.carregarArquivo();
    }
  
    carregarArquivo() {
      const arquivoTxt = fs.readFileSync(this.arquivo, 'utf8');
      const linhas = arquivoTxt.split('\n');
      linhas.forEach((linha) => {
        const [cliente, produto, preco] = linha.split(';');
        preco = parseFloat(preco);
        if (!this.clientes[cliente]) {
          this.clientes[cliente] = [];
        }
        this.clientes[cliente].push({ produto, preco });
        if (!this.produtos[produto]) {
          this.produtos[produto] = [];
        }
        this.produtos[produto].push({ cliente, preco });
      });
    }
  
    adicionarCliente(cliente, produto, preco) {
      if (!this.clientes[cliente]) {
        this.clientes[cliente] = [];
      }
      this.clientes[cliente].push({ produto, preco });
      if (!this.produtos[produto]) {
        this.produtos[produto] = [];
      }
      this.produtos[produto].push({ cliente, preco });
      this.salvarArquivo();
    }
  
    adicionarProduto(produto, preco) {
      if (!this.produtos[produto]) {
        this.produtos[produto] = [];
      }
      this.produtos[produto].push({ cliente: '', preco });
      this.salvarArquivo();
    }
  
    pesquisarCliente(cliente) {
      return this.clientes[cliente] || [];
    }
  
    pesquisarProduto(produto) {
      return this.produtos[produto] || [];
    }
  
    salvarArquivo() {
      const arquivoTxt = '';
      for (const cliente in this.clientes) {
        for (const produto of this.clientes[cliente]) {
          arquivoTxt += `${cliente};${produto.produto};${produto.preco.toFixed(2)}\n`;
        }
      }
      fs.writeFileSync(this.arquivo, arquivoTxt);
    }
  
    toString() {
      let texto = '';
      for (const cliente in this.clientes) {
        texto += `${cliente}: `;
        for (const produto of this.clientes[cliente]) {
          texto += `${produto.produto} - ${produto.preco.toFixed(2)}, `;
        }
        texto += '\n';
      }
      return texto;
    }
  }
  
  // Criar um objeto Mercado
  const mercado = new Mercado('mercado.txt');
  
  // Adicionar clientes e produtos
  mercado.adicionarCliente('João', 'Leite', 2.50);
  mercado.adicionarCliente('Maria', 'Pão', 1.20);
  mercado.adicionarCliente('João', 'Ovo', 1.80);
  mercado.adicionarProduto('Café', 3.00);
  
  // Pesquisar clientes e produtos
  console.log(mercado.pesquisarCliente('João')); // [{ produto: 'Leite', preco: 2.5 }, { produto: 'Ovo', preco: 1.8 }]
  console.log(mercado.pesquisarProduto('Pão')); // [{ cliente: 'Maria', preco: 1.2 }]
  
  // Imprimir lista de mercado
  console.log(mercado.toString());