let cliente = [""]
function cliente(nome, idade, lista){
    const cliente = {
        nome: nome,
        idade: idade,
        lista: lista,
    };
    cliente.push(novoCliente);
    console.log(`cliente adicionado: ${nome}`)
};

function listarClientes(){
    console.log("lista de Clientes:");
    listarClientes.forEach((cliente, index){
        console.log(`#${index + 1} - ${cliente.nome} - ${cliente.idade} - ${cliente.lista}`)
    });
}