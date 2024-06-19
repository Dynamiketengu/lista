const fs = require('fs')

const nome_arquivo = '/lista.js.txt'
const path = __dirname + `${nome_arquivo}`

//const textoPuro = 'Uma aposta de Blumenau (SC) deu sorte e acertou os seis números, ganhando o prêmio máximo da Mega-Sena de hoje (29). O concurso 2449 foi realizado em São Paulo e teve sorteados os números 14-20-21-31-49-52. A Caixa informou que o bilhete ganhador vai receber R$ 36.777.767,10.... - Veja mais em https://noticias.uol.com.br/ultimas-noticias/2022/01/29/mega-sena-tem-premio-de-r-367-milhoes-veja-os-numeros-sorteados.htm?cmpid=copiaecola'

function meuleitorDeArquivo(caminho){
    fs.readFile(caminho, 'utf-8', function(error,data){
        if(error){
            console.log('erro de leitura: '+error.message)
        } else {
            console.log(data)
        }

    })
}

function meuEscritorDeArquivo(caminho,texto){
    fs.writeFile(caminho, texto, function(error){
        if (error){
            console.error('erro de escrita'+ error.message)
        } else {
            console.log('escreve com sucesso em '+ caminho)
        }
    })
}

//meuEscritorDeArquivo(path, textoPuro )

meuleitorDeArquivo(path)