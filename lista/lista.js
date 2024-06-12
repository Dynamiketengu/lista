let cliente = [2]
function cliente(nome, idade, lista){
    const cliente = {
        nome: nome,
        idade: idade,
        lista: lista,
    };
};
function addProduto(produto, preço, quantidade){
    addProduto("laranja", 4, 1)
    addProduto("uva", 1, 1)
    addProduto("pera", 5, 1)
    addProduto("morango", 3, 1)
    addProduto("abacaxi", 8, 1)
    addProduto("maça", 6, 1)
}

function listarClientes(){
    console.log("lista de Clientes:");
    listarClientes.forEach((cliente, index) =>{
        console.log(`#${index + 1} - ${cliente.nome} - ${cliente.idade} - ${cliente.lista}`)
    });
}
function adicionarCliente(nome, idade, lista) {
    const novoCliente = {nome, idae, lista };
    cliente.push(novoCliente);
    console.log(`cliente adicionado: ${nome}`)
}
function buscarCliente(nome)
  clientes = clientes.find(cliente => cliente.nome === nome);

  var arr = ["0, 1, 2"];
  console.log(arr[0]);
  console.log(arr[1]);
  console.log(arr[2]);
  console.log(arr[arr.length - 1])

adicionarCliente("edwin", 34, "laranja, maça, morango");
adicionarCliente("nicolas", 17, "banana, pera, abacaxi");
adicionarCliente("luan", 18, "maça, uva, morango")

const clienteEncontrado = buscarCliente("luan");
console.log(clienteEcontrado);

listarClientes();