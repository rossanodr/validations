export function useCpfOrCnpjValidation(cpfCnpj: string): boolean {
  if (cpfCnpj.length <= 11) {
    // Verifica se a string é composta apenas por dígitos
    if (/^\d+$/.test(cpfCnpj) === false) return false;

    // Verifica se a string tem pelo menos 11 dígitos
    if (cpfCnpj.length < 11) return false;

    let Soma: number;
    let Resto: number;
    Soma = 0;
    // Verifica se a string é igual a "00000000000".
    if (cpfCnpj === "00000000000") return false;

    // Inicializa a variável Soma com o valor 0.
    // Itera pelos dígitos do primeiro pedaço (da primeira posição até a nona). Para cada dígito, a função:
    // Converte o dígito para um número inteiro.
    // Multiplica o dígito pelo resultado da expressão (11 - i).
    // Adiciona o resultado da multiplicação à variável Soma.
    // Calcula o resto da divisão de Soma por 11 usando a operação % e armazena o resultado na variável Resto.
    // Verifica se Resto é igual a 10 ou 11. Se for, armazena 0 em Resto.
    // Verifica se Resto é igual ao décimo dígito do primeiro pedaço. Se não for, a função retorna false.
    // A segunda regra de validação é aplicada ao segundo pedaço de 2 dígitos.
    // Para validar esse pedaço, a função realiza os mesmos passos descritos acima, mas iterando pelos 10 dígitos do primeiro pedaço mais o primeiro dígito do segundo pedaço.

    for (let i = 1; i <= 9; i++) {
      Soma += parseInt(cpfCnpj.substring(i - 1, i)) * (11 - i);
    }
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(cpfCnpj.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) {
      Soma += parseInt(cpfCnpj.substring(i - 1, i)) * (12 - i);
    }
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(cpfCnpj.substring(10, 11))) return false;
    return true;
  } else if (cpfCnpj.length === 14) {
    cpfCnpj = cpfCnpj.replace(/[^\d]+/g, "");

    if (cpfCnpj === "") {
      return false;
    }

    if (cpfCnpj.length !== 14) {
      return false;
    }

    // Elimina CNPJs inválidos conhecidos
    if (
      cpfCnpj === "00000000000000" ||
      cpfCnpj === "11111111111111" ||
      cpfCnpj === "22222222222222" ||
      cpfCnpj === "33333333333333" ||
      cpfCnpj === "44444444444444" ||
      cpfCnpj === "55555555555555" ||
      cpfCnpj === "66666666666666" ||
      cpfCnpj === "77777777777777" ||
      cpfCnpj === "88888888888888" ||
      cpfCnpj === "99999999999999"
    ) {
      return false;
    }

    // Valida DVs
    let tamanho = cpfCnpj.length - 2;
    let numeros = cpfCnpj.substring(0, tamanho);
    let digitos = cpfCnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cpfCnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;

      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) {
      return false;
    }

    return true;
  } else {
    return false;
  }
}
function formatCnpj(cnpj: string): string {
  function getNumbers() {
    return cnpj.replace(/\D/g, "");
  }
  const formatted = getNumbers();
  return formatted.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
}

function formatCpf(cpf: string): string {
  function getNumbers() {
    return cpf.replace(/\D/g, "");
  }
  const formatted = getNumbers();
  return formatted.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}