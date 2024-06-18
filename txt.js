const fs = require('fs')

const nome_arquivo = '/arquivo1.txt'

const path = __dirname + '${nome_arquivo}'


function meuleitorDearquivo(caminho){
    fs.readFile(caminho, 'utf-8', function(error,data){

    })
}