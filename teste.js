let numero = 123456;
let stringNumero = numero.toString(); // converte o número em uma string
let posicaoVirgula = stringNumero.indexOf("."); // encontra a posição da vírgula
let casasAntesDaVirgula = posicaoVirgula == -1 ? stringNumero.length : posicaoVirgula; // se não houver vírgula, considera todas as casas como antes da vírgula
console.log(casasAntesDaVirgula); // Saída: 4
